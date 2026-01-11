"use client"

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

type DarkNavbarContextType = {
    dark: boolean;
    setDark: (dark: boolean) => void;
};

const DarkNavbarContext = createContext<DarkNavbarContextType | undefined>(
    undefined
);

export const DarkNavbarProvider = ({ children }: { children: ReactNode }) => {
    const [dark, setDark] = useState(false);

    const _setDark = (dark: boolean) => {
        setDark(dark);
    }

    return (
        <DarkNavbarContext.Provider value={{ dark, setDark: _setDark }}>
            {children}
        </DarkNavbarContext.Provider>
    );
};

export const useDarkNavbar = () => {
    const context = useContext(DarkNavbarContext);

    if (!context) {
        throw new Error("useDarkNavbar must be used within DarkNavbarProvider");
    }

    return context;
};