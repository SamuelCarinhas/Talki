import { useUser } from "./useUser.ts";

export const useRest = () => {

    const { user} = useUser()

    const api = 'https://auth.api.samuelcarinhas.com'

    const post = (path: string, body: object) =>
        fetch(`${api}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user ? user.accessToken : ''
            },
            body: JSON.stringify(body)
        })

    return { post };
};
