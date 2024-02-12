import { useAuth } from "../../hooks/useAuth.ts";
import { useRest } from "../../hooks/useRest.ts";
import { IUser } from "../../utils/types.ts";
import { useEffect } from "react";
import IGlobalRoutines from "./IGlobalRoutines.ts";
import { useUser } from "../../hooks/useUser.ts";
import { useNavigate } from "react-router-dom";

function GlobalRoutines(props: IGlobalRoutines) {
    const { user, login, logout } = useAuth()
    useUser()
    const { refresh } = useRest()

    const navigate  = useNavigate()

    function refreshToken() {
        console.log('refresh', JSON.stringify(user))
        refresh('/refresh-token', user!.refreshToken)
            .then(async res => {
                return {
                    json: await res.json(),
                    status: res.status
                }
            })
            .then(({ json, status }) => {
                if(status == 200) {
                    const newUser: IUser = {
                        username: user!.username,
                        email: user!.email,
                        role: user!.role,
                        accessToken: json.accessToken,
                        refreshToken: json.refreshToken
                    }
                    login(newUser)
                } else {
                    logout()
                    navigate('/signin')
                }
            })
    }

    useEffect(() => {
        if(!user || user.email === 'invalid') return;

        const refreshId = setInterval(() => {
            refreshToken()
            console.log('Token refreshed')
        }, 5000)

        return () => clearInterval(refreshId)
    }, [user])

    return (
        props.children
    )

}

export default GlobalRoutines