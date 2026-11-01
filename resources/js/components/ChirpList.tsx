import { useEffect, useState } from "react";
import { Chirp } from "../types/chirp";
import ChirpItem from "./ChirpItem";
import { useEchoPublic } from "@laravel/echo-react";
import { Comment } from "@/types/comment";

type ChirpListProps = {
  chirps: Chirp[]
};

export default function ChirpList({ chirps}: ChirpListProps)
{
  const [chirpItems, setChirpItems] = useState<Chirp[]>(chirps);
  const [commentUpdates, setCommentUpdates] = useState<Comment[]>([]);

  useEffect(() => {
    setChirpItems(chirps);
  }, [chirps]);
  
  useEchoPublic('chirper', '.new-chirp', (e: {chirp: Chirp}) => {
      setChirpItems((prev) => [e.chirp, ...prev.filter((c)=> c.id != e.chirp.id)]);
  });

  useEchoPublic('chirper', '.new-comment', (e: { comment: Comment }) => {
      setCommentUpdates((previous) => [...previous, e.comment].slice(-50));
      setChirpItems((previous) => previous.map((chirp) => chirp.id === e.comment.chirp_id
        ? { ...chirp, comment_count: chirp.comment_count + 1 }
        : chirp));
  });

  useEchoPublic('chirper', '.chirp-updated', (e: { chirp: Pick<Chirp, 'id' | 'message' | 'updated_at'> }) => {
      setChirpItems((previous) => previous.map((chirp) => chirp.id === e.chirp.id
        ? { ...chirp, message: e.chirp.message, updated_at: e.chirp.updated_at }
        : chirp));
  });

  useEchoPublic('chirper', '.chirp-deleted', (e: { chirp_id: number }) => {
      setChirpItems((previous) => previous.filter((chirp) => chirp.id !== e.chirp_id));
  });

  return (
    <div className='flex flex-col space-y-2'>
      {chirpItems.length > 0 ? chirpItems.map((chirp) => (
        <ChirpItem key={chirp.id} chirp={chirp} commentUpdates={commentUpdates}/>
      )) : (
        <p className="py-12 text-center text-base-content/60">No chirps yet. Be the first to chirp!</p>
      )}
    </div>
  );
} 
