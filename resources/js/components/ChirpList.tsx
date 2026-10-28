
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
  const echo  = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true
  });

  const [chirpItems, setChirpItems] = useState<Chirp[]>(chirps);

  useEffect(() => {

    echo.channel('chirper')
        .listen('.new-chirp', (e:any) => {
          console.log("New Chirp Received", e);
          setChirpItems((prevChirps) => [e.chirp, ...prevChirps]);
    });

    return () => {
      echo.leave('chirper');
    };

  },[]);

  return (
    <div className='flex flex-col space-y-2'>
      {chirpItems.map((chirp) => (
        <ChirpItem
          key={chirp.id}
          chirp={chirp}/>
      ))}
    </div>
  );
}