import { Head } from '@inertiajs/react';
import ChirpList from '../../components/ChirpList';
import AppLayout from '@/components/AppLayout';
import { Chirp } from '../../types/chirp';
import ChirpForm from '@/components/ChirpForm';

type Props = {
  chirps: Chirp[]
};

export default function Index({chirps}: Props)
{
  return (
    <AppLayout>
      <Head title='Home Feed'/>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mt-8">Latest Chirps</h1>

        {/*-- Chirp Form --*/}
      <ChirpForm chirp = {null} buttonText='Chirp'/>
      <div className="space-y-4 mt-8">
        <ChirpList chirps={chirps} />
        </div>
      </div>
    </AppLayout>
  );
}
