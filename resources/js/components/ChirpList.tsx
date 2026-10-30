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

  useEffect(() => {
    setChirpItems(chirps);
  }, [chirps]);
  
  useEchoPublic('chirper', '.new-chirp', (e: {chirp: Chirp}) => {
      setChirpItems((prev) => [e.chirp, ...prev.filter((c)=> c.id != e.chirp.id)]);
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
