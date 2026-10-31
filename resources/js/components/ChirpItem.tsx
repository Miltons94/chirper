import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Chirp } from "../types/chirp";
import { route } from "ziggy-js";
import { useState } from "react";
import { Comment } from "@/types/comment";
import axios from "axios";
import { ChevronDown, ChevronUp, Heart } from "lucide-react";
import CommentInput from "./CommentForm";

type Props = {
	chirp: Chirp
};

export default function ChirpItem({ chirp }: Props)
{
	const { delete: destroy } = useForm();

	const [comments, setComments] = useState<Comment[]>([]);
	const [showComments, setShowComments] = useState<boolean>(false);
	const [isLoadingComments, setIsLoadingComments] = useState(false);

	const handleToggleComments = async () => {
		
		if(showComments) 
		{
			setShowComments(false);
			return;
		}
		
		if(comments.length === 0) {
			setIsLoadingComments(true);

			//fetch the comments for a particular post
			await axios
				.get(route('comments.index', chirp.id))
				.then(response => setComments(response.data.comments))
				.catch(error => console.error("Failed to load comments!", error))
				.finally(() => setIsLoadingComments(false))
		}

		setShowComments(true);
	};

	const { auth } = usePage().props;

	const handleChirpDelete = (e:React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		destroy(route('chirps.destroy', chirp.id), {
			preserveScroll: true,
		});
    };

  return (
    <div className="card bg-base-100 shadow">
		<div className="card-body">
			<div className="flex flex-col">
				<div className="flex flex-row items-center top-0 gap-3">
					{chirp.user.email != null ? (
					<div className="avatar">
						<div className="size-10 rounded-full">
							<img src={`https://avatars.laravel.cloud/${encodeURIComponent(chirp.user.email)}?vibe=ocean`}
								alt='Avatar'
								className="rounded-full" />
						</div>
					</div>
					) : (
					<div className="avatar placeholder">
						<div className="size-10 rounded-full">
							<img src="https://avatars.laravel.cloud/f61123d5-0b27-434c-a4ae-c653c7fc9ed6?vibe=stealth"
								alt="Anonymous User" className="rounded-full" />
						</div>
					</div>
					)}
					
					<div className="flex justify-between w-full items-start">
						<div className="flex items-center gap-1">
							<span className="text-sm font-semibold">{chirp?.user?.name ?? 'Anonymous'}</span>
							<span className="text-base-content/60">·</span>
							<span className="text-sm text-base-content/60">{chirp.created_at}</span>
							{chirp.updated_at && (
								<div>
									<span className="text-base-content/60">·</span>
									<span className="text-sm text-base-content/60 italic">edited</span>
								</div>
							)}
						</div>
						{auth.user != null && (auth.user.id == chirp.user_id) && (
							<div className={`flex gap-1`}>
								<Link href={`/chirps/${chirp.id}/edit`} className="btn btn-ghost btn-xs">
									Edit
								</Link>
								<form method="POST" onSubmit={handleChirpDelete}>
									<button
										type="submit"
										className="btn btn-ghost btn-xs text-error">
										Delete
									</button>
								</form>
							</div>
						)}
					</div> 
				</div>

				<div className="min-w-0 flex-1">
					
					<p className="mt-1">{chirp.message}</p>

					{/* comments section*/}
					<div className="m-0 p-0 mt-3">
						<div className="flex flex-col w-full">
							{isLoadingComments && (
								<p>Loading comments...</p>
							)}
							{showComments && !isLoadingComments && (
								<ul id="comments" className="list-none ml-6">
									{comments.length == 0 ? (
										<p>No comments yet. Be the first to comment!</p>
									): (
										comments.map((comment) => (
											<li key = {comment.id} className="flex space-x-2 items-center">
												<span className="font-black">@{comment.user.name}</span>
												<span className="text-sm text-gray-500">{comment.content}</span>
											</li>
										))
									)}
								</ul>
							)}
							<div className="flex justify-between bottom-0">
								<div className="flex-1 items-center flex flex-row gap-4 ">
									<button className="underline text-blue-700 text-xs hover:text-blue-400"
											onClick={handleToggleComments}>
										{showComments ? (
										<div className="flex items-center">
											<ChevronUp size={20}/>
											<span>hide replies</span>
										</div>
										):(
										<div className="flex items-center gap-1.5">
											<ChevronDown size={20}/>
											<span>{chirp.comment_count} replies</span>
										</div>
										)}
									
									</button>
									{/* Comment input */}
									<CommentInput chirp={chirp} />
								</div>
								{/* like button */}
								<div className="justify-end">
									<div className="flex flex-col items-center">
										<button className="cursor-pointer">
											<Heart className="ease-in-out duration-200 hover:fill-red-500 hover:stroke-0 hover:scale-125"/>
										</button>
										<span>0</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
	    	</div>
		</div>
    </div>
  );
}