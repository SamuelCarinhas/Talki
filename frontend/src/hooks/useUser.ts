import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import { useLocalStorage } from "./useLocalStorage.ts";
import { IUser } from "../utils/types.ts";

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setItem } = useLocalStorage();

    const addUser = (user: IUser) => {
        setUser(user);
        setItem("user", JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        setItem("user", "");
    };

    return { user, addUser, removeUser };
};