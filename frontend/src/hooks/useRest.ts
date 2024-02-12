import { useUser } from "./useUser.ts";

export const useRest = () => {

    const { user} = useUser()

    const api = import.meta.env.VITE_API
    const host = import.meta.env.VITE_HOST

    const post = (path: string, body: object) =>
        fetch(`${api}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user ? user.accessToken : ''
            },
            body: JSON.stringify(body)
        })

    const validate = (path: string, validateToken: string) =>
        fetch(`${api}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': validateToken
            }
        })

    const refresh = (path: string, refreshToken: string) =>
        fetch(`${api}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': refreshToken
            }
        })

    return { host, post, validate, refresh };
};
