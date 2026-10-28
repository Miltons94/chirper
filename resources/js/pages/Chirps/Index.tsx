import { Head, useForm } from '@inertiajs/react';
import ChirpList from '../../components/ChirpList';
import AppLayout from '@/components/AppLayout';
import { Chirp } from '../../types/chirp';

type Props = {
  chirps: Chirp[]
};

export default function Index({chirps}: Props)
{

  const {data, setData, post, processing, errors} = useForm({
    message: '',
  });

  const submit  = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/chirps');
  };

  return (
    <AppLayout>
      <Head title='Home Feed'/>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mt-8">Latest Chirps</h1>

        {/*-- Chirp Form --*/}
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
                  {processing? 'Saving' : 'Chirp'}
                </button>
              </div>
            </form>
          </div>
        </div>

      <div className="space-y-4 mt-8">
        {chirps.length > 0 ? (
          <ChirpList chirps={chirps} />
        ):(
          <div className="hero py-12">
            <div className="hero-content text-center">
              <div>
                <svg className="mx-auto h-12 w-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                  </path>
                </svg>
                <p className="mt-4 text-base-content/60">No chirps yet. Be the first to chirp!</p>
              </div>
            </div>
          </div>
        )}	
        </div>
      </div>
    </AppLayout>
  );
}