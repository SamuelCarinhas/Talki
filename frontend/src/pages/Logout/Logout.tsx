import { useAuth } from "../../hooks/useAuth.ts";
import { useUser } from "../../hooks/useUser.ts";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {

    const { logout } = useAuth()
    const { user } = useUser()

    useEffect(() => {
        logout()
    }, [])

    return (
        user !== null ? undefined : <Navigate to={'/signin'} />
    )
}

export default Logout
