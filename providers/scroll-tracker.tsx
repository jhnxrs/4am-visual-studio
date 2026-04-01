"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAppState } from "@/stores/app-state";

type Props = {
    children: ReactNode;
};

export function ScrollTrackerProvider({ children }: Props) {
    const setScreenY = useAppState((state) => state.setScreenY);

    const tickingRef = useRef(false);
    const lastScreenYRef = useRef(0);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const updateScroll = () => {
            tickingRef.current = false;

            const scrollY = window.scrollY || window.pageYOffset || 0;
            const viewportHeight = window.innerHeight || 1;
            const nextScreenY = scrollY / viewportHeight;

            if (nextScreenY !== lastScreenYRef.current) {
                lastScreenYRef.current = nextScreenY;
                setScreenY(nextScreenY);
            }
        };

        const onScrollOrResize = () => {
            if (tickingRef.current) return;

            tickingRef.current = true;
            window.requestAnimationFrame(updateScroll);
        };

        updateScroll();

        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize, { passive: true });
        window.addEventListener("orientationchange", onScrollOrResize, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            window.removeEventListener("orientationchange", onScrollOrResize);
        };
    }, [setScreenY]);

    return children;
}