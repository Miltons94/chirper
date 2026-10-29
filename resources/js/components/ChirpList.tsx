import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Chirp } from "../types/chirp";
import ChirpItem from "./ChirpItem";
import { useEchoPublic } from "@laravel/echo-react";

type ChirpListProps = {
  chirps: Chirp[]
};

export default function ChirpList({ chirps}: ChirpListProps)
{
  const [chirpItems, setChirpItems] = useState<Chirp[]>(chirps);
  
  useEchoPublic('chirper', '.new-chirp', (e: {chirp: Chirp}) => {
      console.log("Received new chirp", e.chirp);
  });

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
