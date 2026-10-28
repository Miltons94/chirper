
import { useEffect, useState } from "react";
import { Chirp } from "../types/chirp";
import ChirpItem from "./ChirpItem";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

type ChirpListProps = {
  chirps: Chirp[]
};

window.Pusher = Pusher;
Pusher.logToConsole = true;

export default function ChirpList({ chirps}: ChirpListProps)
{
  const [chirpItems, setChirpItems] = useState<Chirp[]>(chirps);

  useEffect(() => {
    // 1. Create the Pusher connection
    const pusher = new Pusher(
      import.meta.env.VITE_PUSHER_APP_KEY,
      {
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      }
    );

    // 2. Log connection state changes
    pusher.connection.bind("state_change", (states: any) => {
      console.log(
        "Pusher state:",
        states.previous,
        "→",
        states.current
      );
    });

    // 3. Log connection errors
    pusher.connection.bind("error", (error: any) => {
      console.error("Pusher connection error:", error);
    });

    // 4. Subscribe to your channel
    const channel = pusher.subscribe("chirper");

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("Successfully subscribed to chirper");
    });

    // 5. Listen for the Laravel event
    channel.bind("new-chirp", (data: any) => {
      console.log("Received new-chirp:", data);
      setChirpItems((previous) => [
        data.chirp,
         ...previous.filter((c) => c.id !== data.chirp.id)
        ])
    });

    // 6. Clean up when the component unmounts
    return () => {
      channel.unbind_all();
      pusher.unsubscribe("chirper");
      pusher.disconnect();
    };
  }, []);

  return (
    <div className='flex flex-col space-y-2'>
      {chirpItems.length > 0 ? chirpItems.map((chirp) => (
        <ChirpItem key={chirp.id} chirp={chirp}/>
      )) : (
        <p className="py-12 text-center text-base-content/60">No chirps yet. Be the first to chirp!</p>
      )}
    </div>
  );
}
