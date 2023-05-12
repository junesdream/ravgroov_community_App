import React from 'react';
import { createContext, useEffect, useState, ReactNode } from "react";

type DarkModeContextValue = {
    darkMode: boolean;
    toggle: () => void;
};

type DarkModeContextProviderProps = {
    children: ReactNode;
};

export const DarkModeContext = createContext<DarkModeContextValue>({
    darkMode: false,
    toggle: () => {},
});

export const DarkModeContextProvider = ({
                                            children
                                        }: DarkModeContextProviderProps) => {
    const [darkMode, setDarkMode] = useState<boolean>(
        JSON.parse(localStorage.getItem("darkMode") ?? "false")
    );

    const toggle = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        React.createElement(DarkModeContext.Provider, { value: { darkMode, toggle } },
            children
        )
    );
};

