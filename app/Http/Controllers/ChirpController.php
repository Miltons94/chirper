<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ChirpController extends Controller
{
    use AuthorizesRequests;

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
                'min:2',
                Rule::unique('chirps')->where(fn ($query) => $query->where('user_id', $request->user()->id))
            ]
        ],
        [
            'message.required' => 'Please write something to chirp!',
            'message.max' => 'Chirp must be 255 characters or less',
            'message.min' => 'Chirp must have at least 2 characters!'
        ]);

        auth()->user()->chirps()->create($validated);
        return redirect('/')->with('success', 'Your chirp was created successfully!');
    }

    public function edit(Chirp $chirp)
    {
        $this->authorize('update', $chirp);
        return view('chirps.edit', compact('chirp'));
    }

    public function update(Request $request, Chirp $chirp)
    {
        $this->authorize('update', $chirp);
        $validated = $request->validate([
            'message' => [
                'required',
                'max:255',
                'min:2',
                Rule::unique('chirps')->where(fn ($query) => $query->where('user_id', $request->user()->id))
            ]
        ]);

        $chirp->update($validated);
        return redirect('/')->with('success', 'Your chirp was updated!');
    }
    public function destroy(Chirp $chirp)
    {
        $this->authorize('delete', $chirp);
        $chirp->delete();
        return redirect('/')->with('success', 'Your chirp was deleted!');
    }
}
    