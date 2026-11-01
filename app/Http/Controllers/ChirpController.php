<?php

namespace App\Http\Controllers;

use App\Events\ChirpDeletedEvent;
use App\Events\ChirpUpdatedEvent;
use App\Events\NewChirpEvent;
use App\Models\Chirp;
use Auth;
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
                'comment_count' => $chirp->comments->count(),
                'likes_count' => $chirp->likes->count(),
                'is_liked' => Auth::check() ? $chirp->isLikedBy(auth()->user()) : false,
                'message' => $chirp->message,
                'user_id' => $chirp->user->id,
                'created_at' => $chirp->created_at
                    ->diffForHumans(),
                'updated_at' => $chirp->updated_at?->gt($chirp->created_at->addSeconds(5)),
                'user' => $chirp->user,
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
                Rule::unique('chirps')->where(fn ($query) => $query->where('user_id', $request->user()->id)),
            ],
        ],
            [
                'message.required' => 'Please write something to chirp!',
                'message.max' => 'Chirp must be 255 characters or less',
                'message.min' => 'Chirp must have at least 2 characters!',
                'message.unique' => 'This chirp already exists. Please create a different chirp!',
            ]);

        $chirp = auth()->user()->chirps()->create($validated);

        // broadcast the new $chirp to listening clients
        broadcast(new NewChirpEvent($chirp))->toOthers();

        Inertia::flash('status', 'Your chirp was created successfully!');

        return redirect('/');
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
            'message' => 'required|string|max:255|min:2',
        ]);

        $chirp->update($validated);

        broadcast(new ChirpUpdatedEvent($chirp));

        Inertia::flash('status', 'Your chirp was updated!');

        return redirect('/');
    }

    public function destroy(Chirp $chirp)
    {
        $this->authorize('delete', $chirp) || abort(403);
        $chirpId = $chirp->id;
        $chirp->delete();

        broadcast(new ChirpDeletedEvent($chirpId));

        Inertia::flash('status', 'Your chirp was deleted!');

        return redirect('/');
    }
}
