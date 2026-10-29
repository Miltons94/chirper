<?php

namespace App\Events;

use App\Models\Chirp;
use Auth;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewChirpEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Chirp $chirp) 
    { }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): Channel
    {
        return new Channel('chirper');
    }

    /**
     * Get event name
     * @return string
     */

    public function broadcastAs(): string{
        return 'new-chirp';
    }
    /**
     * Get the data to broadcast for the event.
     *
     * @return array{chirp: array<string, mixed>}
     */
    public function broadcastWith(): array
    {
        $this->chirp->loadMissing('user');

        $formattedUser = [
            'id' => $this->chirp->user->id,
            'name' => $this->chirp->user->name,
            'email' => $this->chirp->user->email,
            'can' => [
                'update' => Auth::check()? (auth()->user()->can('update', $this->chirp)): false,
                'delete' => Auth::check()? (auth()->user()->can('delete', $this->chirp)) : false
            ]
        ];

        return [
            'chirp' => [
                'id' => $this->chirp->id,
                'message' => $this->chirp->message,
                'user_id' => $this->chirp->user_id,
                'created_at' => $this->chirp->created_at->diffForHumans(),
                'updated_at' => null,
                'user' => $formattedUser,
            ],
        ];
    }
}
