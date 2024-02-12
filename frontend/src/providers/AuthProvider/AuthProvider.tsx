import { AuthContext } from '../../context/AuthContext.tsx';
import { useState } from "react";
import { IUser } from "../../utils/types.ts";
import IAuthProvider from "./IAuthProvider.ts";

const AuthProvider = (props: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            { props.children }
        </AuthContext.Provider>
    );
};

export default AuthProvider