<?php

namespace App\Http\Controllers;

use App\Events\NewCommentEvent;
use App\Models\Chirp;
use App\Models\Comment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Chirp $chirp)
    {
        $comments = $chirp->comments()
            ->with('user')
            ->latest()
            ->take(50)
            ->get();

        return response()->json([
            'comments' => $comments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Chirp $chirp): RedirectResponse
    {
        $validated = $request->validate([
            'comment' => 'required|string|max:255',
        ]);

        $comment = $chirp->comments()->make([
            'content' => $validated['comment'],
        ]);
        $comment->user()->associate($request->user());
        $comment->save();

        broadcast(new NewCommentEvent($comment));

        Inertia::flash('status', 'Comment sent!');

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
