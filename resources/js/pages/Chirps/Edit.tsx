
import React from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/components/AppLayout';
import { Chirp } from '@/types/chirp';
import ChirpForm from '@/components/ChirpForm';
interface EditChirpProps{
  chirp: Chirp
}
export default function EditChirp({ chirp }: EditChirpProps) {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-xl font-bold mb-4">Edit Your Chirp</h1>

        {/* Pass the chirp object down to the form */}
        <ChirpForm chirp={chirp} buttonText='Update chirp' />
      </div>
    </AppLayout>
  );
}