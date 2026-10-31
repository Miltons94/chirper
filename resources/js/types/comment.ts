import { User } from "./user"

export type Comment = {
    id: number,
    chirp_id: number,
    user_id: number,
    content: string,
    user: User
}