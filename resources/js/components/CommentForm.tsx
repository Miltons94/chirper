import { Chirp } from "@/types/chirp";
import { useForm } from "@inertiajs/react"
import { ArrowUp } from "lucide-react";
import { route } from "ziggy-js";

type CommentInputProps = {
    chirp: Chirp
}

export default function CommentInput({ chirp }: CommentInputProps) {

    const { data, setData, processing, post, errors, reset} = useForm({
        comment: ''
    });

    const handleCommentSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('comments.store', chirp.id), {
            onSuccess: () => {
                reset('comment');
            }   
        })  
    };

    const hasComment = data.comment.trim().length > 0;
     
    return (
        <form method="POST" onSubmit={handleCommentSubmit}>
            <div className="flex items-center relative">
                <input
                    id="comment"
                    placeholder={`Reply to ${chirp.user.name}`}
                    className={`py-2.5 pl-4 pr-14 ${errors.comment ? 'input-error' : ''} text-sm whitespace-nowrap overflow-x-auto scrollbar-none border border-gray-300  focus:border-gray-400 outline-none rounded-3xl`}
                    value={data.comment}
                    aria-label="Send comment"
                    autoComplete="off"
                    onChange={(e) => setData('comment', e.target.value)}
                />
                <button type="submit" disabled={processing} className={`w-8 h-8 hover:bg-gray-900 cursor-pointer ${hasComment? 'opacity-100 pointer-events-auto scale-100': 'opacity-0 pointer-events-none scale-75'} ease-in-out duration-200 flex items-center justify-center absolute right-2  rounded-full bg-gray-600`}>
                    <ArrowUp className={`text-white`} />
                </button>
            </div>
        </form>
    )
}
