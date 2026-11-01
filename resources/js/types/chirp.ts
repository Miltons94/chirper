import { User } from "./user";

export type Chirp = {
    id: number,
    user_id: number,
    message: string,
    user: User,
    created_at: string,
    updated_at: boolean
    comment_count: number,
    likes_count: number,
    is_liked: boolean,
    [key: string]: unknown
};
