import React from "react";
import { Chirp } from "@/types/chirp";
import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";

interface ChirpFormProps {
  chirp: Chirp|null,
  buttonText: string,
  onSuccess?: ()=> void
}
export default function ChirpForm({ chirp = null, buttonText, onSuccess }: ChirpFormProps) {
  const {data, setData, post, put, processing, errors, reset } = useForm({
      message: chirp ? chirp.message : ''
    });

    const submit = (e:React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      if(chirp) {
        //update
        put(route('chirps.update', chirp.id), {
          onSuccess: ()=> {
            if(onSuccess) onSuccess();
          }
        });
      } else {
        post(route('chirps.store'), {
          onSuccess: ()=> {
            reset('message');
            if(onSuccess) onSuccess();
          }
        });
      }
    };

    return (
      <>
        <div className="card bg-base-100 shadow mt-8">
          <div className="card-body">
            <form method="POST" onSubmit={submit}>
              <div className="form-control w-full">
                <textarea 
                  id="message" placeholder="What's on your mind?"
                  className={`textarea textarea-bordered w-full resize-none ${errors.message? 'textarea-error':''}`} 
                  maxLength={255} 
                  required={true}
                  value={data.message}
                  onChange={(e) => setData('message', e.target.value)}></textarea>
                {errors.message &&(
                  <div className="label">
                    <span className="label-text-alt text-error"></span>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-end">
                <button type="submit" disabled={processing} className="btn btn-primary btn-sm">
                  {buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}