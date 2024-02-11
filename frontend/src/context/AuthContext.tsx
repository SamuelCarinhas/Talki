import { createContext } from "react";
import { IAuthContext } from "../utils/types.ts";

export const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => {}
});
