export type AccessToken = {
    accountId: string;
    role: string;
    user: string;
    email: string;
}

export type ChatMessage = {
    id: string;
    message: string;
    username: string;
    date: Date;
}

export type Command = {
    type: string;
    payload: any
}
