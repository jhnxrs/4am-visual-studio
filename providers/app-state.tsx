"use client"

import { useAppState } from "@/stores/app-state";
import { useEffect, useLayoutEffect } from "react";
import { useShallow } from "zustand/react/shallow";

type Props = {
    children: React.ReactNode;
    locale: 'en' | 'pt';
}

const MOBILE_BREAKPOINT = 768;

export const AppStateProvider = (props: Props) => {
    const { setMobile, setLocale } = useAppState(
        useShallow((state) => ({
            setMobile: state.setMobile,
            setLocale: state.setLocale,
        }))
    );

    useLayoutEffect(() => {
        setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }, []);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        const onChange = () => {
            setMobile(window.innerWidth < MOBILE_BREAKPOINT);
        }
        mql.addEventListener("change", onChange)
        onChange()
        return () => mql.removeEventListener("change", onChange)
    }, []);

    useEffect(() => {
        setLocale(props.locale);
    }, [props.locale]);

    return props.children;
}