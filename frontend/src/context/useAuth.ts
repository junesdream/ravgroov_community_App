import {useContext} from "react";
import {AuthContext} from "./authContext";

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }

    const { currentUser, login } = authContext;

    return { currentUser, login };
};
