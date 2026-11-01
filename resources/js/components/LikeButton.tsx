import { Chirp } from "@/types/chirp";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { Heart } from "lucide-react";
import { useState } from "react";
import { route } from "ziggy-js";

type LikeButtonProps = {
    chirp: Chirp
}

export default function LikeButton({ chirp }: LikeButtonProps) {
    const { auth } = usePage().props;
    
    const [isLiked, setIsLiked] = useState<boolean>(chirp.is_liked);
    const  [likesCount, setLikesCount] = useState<number>(chirp.likes_count);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleLikeToggle = async () => {
        if(isLoading) 
            return;

        setIsLoading(true);

        const previousIsLiked = isLiked;
        const previousCount = likesCount;

        setIsLiked(!isLiked);
        setLikesCount(count => isLiked? count - 1: count + 1);

        await axios.post(route('chirps.like', chirp.id))
                   .then(data => console.log("The server returned this data", data))
                   .catch(error => {
                        console.error("Failed to like comment",error);
                        setIsLiked(previousIsLiked);
                        setLikesCount(previousCount);
                   }).finally(() => setIsLoading(false));
    };

    if (!auth.user) {
        return (
            <div className="flex flex-col items-center">
                <Link href={route('login')} className="cursor-pointer" aria-label="Log in to like this chirp">
                    <Heart className="stroke-1 bg-transparent" />
                </Link>
                <span>{likesCount}</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <button 
                className="cursor-pointer"
                 onClick={handleLikeToggle}
                 disabled={isLoading}
                 aria-label={isLiked ? 'Unlike chirp' : 'Like chirp'}>
                <Heart 
                    className={`ease-in-out duration-200 active:scale-150 
                    ${isLiked? 'fill-red-600 stroke-0': 'stroke-1 bg-transparent'} hover:fill-red-500 hover:stroke-0 hover:scale-125`} />
            </button>
            <span>{likesCount}</span>
        </div>
    );
}
