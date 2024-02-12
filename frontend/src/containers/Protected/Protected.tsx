import { useUser } from "../../hooks/useUser.ts";
import { Navigate } from "react-router-dom";
import IProtected from "./IProtected.ts";
import {useAuth} from "../../hooks/useAuth.ts";

function Protected(props: IProtected) {

    useAuth()
    const { user } = useUser()

    return (
        !user ? undefined : user.email !== 'invalid' ? props.children : <Navigate to={"/signin"}/>
    )
}

export default Protected