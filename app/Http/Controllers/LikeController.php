<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function toggle(Chirp $chirp, Request $request)
    {
        $user = $request->user();

        $like = Like::where('user_id', $user->id)
                    ->where('chirp_id', $chirp->id)
                    ->first();
        
        if($like) {
            $like->delete();
            $liked = false;
        } else {
            Like::create([
                'user_id' => $user->id,
                'chirp_id' => $chirp->id
            ]);
            $liked = true;
        }

        return response()->json([
            'is_liked' => $liked,
            'likes_count' => $chirp->likes()->count()
        ]);
    }
}
