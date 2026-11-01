<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChirpDeletedEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public int $chirpId) {}

    /**
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [new Channel('chirper')];
    }

    public function broadcastAs(): string
    {
        return 'chirp-deleted';
    }

    /**
     * @return array{chirp_id: int}
     */
    public function broadcastWith(): array
    {
        return [
            'chirp_id' => $this->chirpId,
        ];
    }
}
