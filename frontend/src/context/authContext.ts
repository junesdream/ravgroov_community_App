import React, {createContext, useEffect, useState, ReactNode, useContext} from "react";

type User = {
    id: number;
    name: string;
    profilePic: string;
};

type AuthContextValue = {
    currentUser: User | null;
    login: () => void;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("user") || "null")
    );

    const login = () => {
        setCurrentUser({
            id: 1,
            name: "John Doe",
            profilePic:
                "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1200",
        });
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (

        React.createElement(AuthContext.Provider, {value: {currentUser, login}},
            children
        )
    );
};



