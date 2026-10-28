type User = {
    id: number;
    name: string,
    email: string
};

export type Chirp = {
    id: number,
    user_id: number|null,
    message: string,
    user: User|null,
    created_at: string,
    updated_at: boolean|null,
    can : {
        update: boolean,
        delete: boolean
    }
};
