import { usePage } from "@inertiajs/react";
import { Chirp } from "../types/chirp";

type Props = {
  chirp: Chirp
};

export default function ChirpItem({ chirp}: Props)
{
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="flex space-x-3">
          {chirp?.user?.email?(
          <div className="avatar">
            <div className="size-10 rounded-full">
              <img src={`https://avatars.laravel.cloud/${encodeURIComponent(chirp.user.email)}?vibe=ocean`}
                alt='Avatar' 
                className="rounded-full" />
            </div>
          </div>
          ):(
          <div className="avatar placeholder">
            <div className="size-10 rounded-full">
              <img src="https://avatars.laravel.cloud/f61123d5-0b27-434c-a4ae-c653c7fc9ed6?vibe=stealth"
                alt="Anonymous User" className="rounded-full" />
            </div>
          </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">{ chirp?.user?.name ?? 'Anonymous' }</span>
                <span className="text-base-content/60">·</span>
                <span className="text-sm text-base-content/60">{chirp.created_at}</span>
								{chirp.updated_at && (
									<div>
										<span className="text-base-content/60">·</span>
										<span className="text-sm text-base-content/60 italic">edited</span>
									</div>
								)}
              </div>
							
              <div className={`flex gap-1 ${(chirp.can.delete && chirp.can.update)? 'visible':'hidden'}`}>
                <a href={`/chirps/${chirp.id}/edit`} className="btn btn-ghost btn-xs">
                  Edit
                </a>
                <form method="POST" action={`/chirps/${chirp.id}`}>

                  <button type="submit"
                    className="btn btn-ghost btn-xs text-error">
                    Delete
                  </button>
                </form>
              </div>
            </div> 
						<p className="mt-1">{chirp.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}