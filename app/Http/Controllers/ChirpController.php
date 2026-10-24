<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use Illuminate\Http\Request;

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
            'message' => 'required|string|max:255|min:5'
        ],
        [
            'message.required' => 'Please write something to chirp!',
            'message.max' => 'Chirp must be 255 characters or less'
        ]);

        Chirp::create([
            'message' => $validated['message'],
            'user_id' => null
        ]);

        return redirect('/')->with('success', 'Chirp created successfully!');
    }
}
