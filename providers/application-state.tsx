"use client"

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { isAndroidDevice } from "@/lib/is-android";

type ApplicationStateContext = {
    dark: boolean;
    fullscreenUrl?: string;
    setDark: (dark: boolean) => void;
    setFullscreenUrl: (url?: string) => void;
    isMobile: boolean;
    isAndroid: boolean;
};

const ApplicationStateContext = createContext<ApplicationStateContext | undefined>(
    undefined
);

const MOBILE_BREAKPOINT = 768;

export const ApplicationStateProvider = ({ children }: { children: ReactNode }) => {
    const [dark, setDark] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return window.innerWidth < MOBILE_BREAKPOINT;
    });
    const [isAndroid, setIsAndroid] = useState<boolean>(() => isAndroidDevice());
    const [fullscreenUrl, setFullscreenUrl] = useState<string | undefined>(undefined);

    const _setFullscreenUrl = (url?: string) => {
        setFullscreenUrl(url);
    }

    const _setDark = (dark: boolean) => {
        setDark(dark);
    }

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
            setIsAndroid(isAndroidDevice())
        }
        mql.addEventListener("change", onChange)
        onChange()
        return () => mql.removeEventListener("change", onChange)
    }, [])

    return (
        <ApplicationStateContext.Provider value={{ dark, isMobile, isAndroid, fullscreenUrl, setFullscreenUrl: _setFullscreenUrl, setDark: _setDark }}>
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
