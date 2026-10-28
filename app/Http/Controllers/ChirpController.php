<?php

namespace App\Http\Controllers;

use App\Events\NewChirpEvent;
use App\Models\Chirp;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ChirpController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $chirps = Chirp::with('user')
            ->latest()
            ->take(50)
            ->get()
            ->map(fn ($chirp) => [
                'id' => $chirp->id,
                'message' => $chirp->message,
                'user_id' => $chirp->user?->id,
                'created_at' => $chirp->created_at->diffForHumans(),
                'updated_at' => $chirp->updated_at?->gt($chirp->created_at->addSeconds(5)),
                'user'=> $chirp->user ?? null,
                'can' => [
                    'update' => auth()->user()? auth()->user()->can('update', $chirp) : false,
                    'delete' => auth()->user()? auth()->user()->can('delete', $chirp) : false,
                ]
            ]);

        return Inertia::render('Chirps/Index', ['chirps' => $chirps]);
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

        $chirp = auth()->user()->chirps()->create($validated);

        //broadcast the new $chirp to webSockets
        broadcast(new NewChirpEvent($chirp))->toOthers();
        
        return redirect('/')->with('status', 'Your chirp was created successfully!');
    }

    public function edit(Chirp $chirp)
    {
        $this->authorize('update', $chirp) || abort(403);
        return Inertia::render('Chirps/Edit', ['chirp' => $chirp]);
    }

    public function update(Request $request, Chirp $chirp)
    {
        $this->authorize('update', $chirp) || abort(403);
        $validated = $request->validate([
            'message' => 'required|string|max:255|min:2'
        ]);

        $chirp->update($validated);
        return redirect('/')->with('status', 'Your chirp was updated!');
    }

    public function destroy(Chirp $chirp)
    {
        $this->authorize('delete', $chirp) || abort(403);
        $chirp->delete();
        return redirect('/')->with('status', 'Your chirp was deleted!');
    }
}