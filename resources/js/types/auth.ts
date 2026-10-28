export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    [key: string]: unknown //more properties
}

export type Auth = {
    user: User|null
}