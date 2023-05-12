import React, {createContext, useEffect, useState, ReactNode} from "react";

type User = {
    id: number;
    name: string;
    profilePic: string;
};

type AuthContextValue = {
    currentUser: User;
    login: () => void;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextValue>({currentUser: {id: 1, name: "Dora Park", profilePic: " https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1200"}, login: () =>{}});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

    const [currentUser, setCurrentUser] = useState<User>(
        JSON.parse(localStorage.getItem("user") || "null")
    );

    const login = () => {
        setCurrentUser({
            id: 1,
            name: "Dora Park",
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



