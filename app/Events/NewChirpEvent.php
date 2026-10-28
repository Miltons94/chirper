<?php

namespace App\Events;

use App\Models\Chirp;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewChirpEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Chirp $chirp) {}

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('chirper'),
        ];
    }

    public function broadcastAs(): string
    {
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

        return [
            'chirp' => [
                'id' => $this->chirp->id,
                'message' => $this->chirp->message,
                'user_id' => $this->chirp->user_id,
                'created_at' => $this->chirp->created_at->diffForHumans(),
                'updated_at' => null,
                'user' => $this->chirp->user,
                'can' => [
                    'update' => true,
                    'delete' => true
                ],
            ],
        ];
    }
}
