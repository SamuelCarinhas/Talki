import { AuthContext } from '../../context/AuthContext.tsx';
import { useEffect, useState } from "react";
import { IUser } from "../../utils/types.ts";
import IAuthProvider from "./IAuthProvider.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { useRest } from "../../hooks/useRest.ts";

const AuthProvider = (props: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>(null);

    const { login, logout } = useAuth()
    const { refresh } = useRest()

    function refreshToken() {
        if(user && user.email !== 'invalid') {
            refresh('/refresh-token', user.refreshToken)
                .then(async res => {
                    return {
                        json: await res.json(),
                        status: res.status
                    }
                })
                .then(({ json, status }) => {
                    if(status == 200) {
                        const newUser: IUser = {
                            username: user.username,
                            email: user.email,
                            role: user.role,
                            accessToken: json.accessToken,
                            refreshToken: json.refreshToken
                        }

                        setUser(newUser)
                        login(newUser)
                    } else {
                        setUser(null)
                        logout()
                    }
                })
        }
    }

    useEffect(() => {
        refreshToken()
        const refreshId = setInterval(() => {
            refreshToken()
        }, 5 * 60 * 1000)

        return () => clearInterval(refreshId)
    }, [])

    return (
        <AuthContext.Provider value={{ user: user, setUser }}>
            { props.children }
        </AuthContext.Provider>
    );
};

export default AuthProvider