export interface IUser {
    username: string;
    email: string;
    authToken: string;
    refreshToken: string;
}

export interface IAuthContext {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}
