<?php

namespace App\Events;

use App\Models\Chirp;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewChirpEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Chirp $chirp) {}

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
     */
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
                'updated_at' => $this->chirp->updated_at?->gt($this->chirp->created_at->addSeconds(5)),
                'user' => $this->chirp->user,
            ],
        ];
    }
}
