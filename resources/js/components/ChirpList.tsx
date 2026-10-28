
import { Chirp } from "../types/chirp";
import ChirpItem from "./ChirpItem";

type ChirpListProps = {
  chirps: Chirp[]
};

export default function ChirpList({ chirps}: ChirpListProps)
{
  return (
    <div className='flex flex-col space-y-2'>
      {chirps.map((chirp) => (
        <ChirpItem
          key={chirp.id}
          chirp={chirp}/>
      ))}
    </div>
  );
}