<?php

namespace App\Events;

use App\Models\Comment;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewCommentEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Comment $comment) {}

    /**
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [new Channel('chirper')];
    }

    public function broadcastAs(): string
    {
        return 'new-comment';
    }

    /**
     * @return array{comment: array{id: int, chirp_id: int, content: string, user: array{id: int, name: string}}}
     */
    public function broadcastWith(): array
    {
        $this->comment->loadMissing('user');

        return [
            'comment' => [
                'id' => $this->comment->id,
                'chirp_id' => $this->comment->chirp_id,
                'content' => $this->comment->content,
                'user' => [
                    'id' => $this->comment->user->id,
                    'name' => $this->comment->user->name,
                ],
            ],
        ];
    }
}
