"use client"

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

type ApplicationStateContext = {
    dark: boolean;
    setDark: (dark: boolean) => void;
    isMobile: boolean;
};

const ApplicationStateContext = createContext<ApplicationStateContext | undefined>(
    undefined
);

const MOBILE_BREAKPOINT = 768;

export const ApplicationStateProvider = ({ children }: { children: ReactNode }) => {
    const [dark, setDark] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const _setDark = (dark: boolean) => {
        setDark(dark);
    }

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }
        mql.addEventListener("change", onChange)
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        return () => mql.removeEventListener("change", onChange)
    }, [])

    return (
        <ApplicationStateContext.Provider value={{ dark, isMobile, setDark: _setDark }}>
            {children}
        </ApplicationStateContext.Provider>
    );
};

export const useApplicationState = () => {
    const context = useContext(ApplicationStateContext);

    if (!context) {
        throw new Error("useApplicationState must be used within ApplicationStateProvider");
    }

    return context;
};