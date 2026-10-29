export type User = {
    id: number,
    name: string,
    email: string,
    can: {
        update: boolean,
        delete: boolean
    },
    [key: string]: unknown
}