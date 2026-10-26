<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ChirpController extends Controller
{
    public function index()
    {
        $chirps = Chirp::with('user')
        ->latest()
        ->take(50)
        ->get();

        return view('home', ['chirps' => $chirps]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => [
                'required',
                'string',
                'max:255',
                'min:2'
            ]
        ],
        [
            'message.required' => 'Please write something to chirp!',
            'message.max' => 'Chirp must be 255 characters or less',
            'message.min' => 'Chirp must have at least 2 characters!'
        ]);

        Chirp::create([
            'message' => $validated['message'],
            'user_id' => null
        ]);

        return redirect('/')->with('success', 'Your chirp was created successfully!');
    }

    public function edit(Chirp $chirp)
    {
        return view('chirps.edit', compact('chirp'));
    }

    public function update(Request $request, Chirp $chirp)
    {

    $user = \App\Models\User::take(1)->get();
        $validated = $request->validate([
            'message' => [
                'required',
                'max:255',
                'min:2'
            ]
        ]);

        $chirp->update($validated);
        return redirect('/')->with('success', 'Your chirp was updated!');
    }
    public function destroy(Chirp $chirp)
    {
        $chirp->delete();
        return redirect('/')->with('success', 'Your chirp was deleted!');
    }
}
