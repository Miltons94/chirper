<?php

namespace App\Events;

use App\Models\Chirp;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChirpUpdatedEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Chirp $chirp) {}

    /**
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [new Channel('chirper')];
    }

    public function broadcastAs(): string
    {
        return 'chirp-updated';
    }

    /**
     * @return array{chirp: array{id: int, message: string, updated_at: bool}}
     */
    public function broadcastWith(): array
    {
        return [
            'chirp' => [
                'id' => $this->chirp->id,
                'message' => $this->chirp->message,
                'updated_at' => true,
            ],
        ];
    }
}
