"use client"

import { useApplicationState } from "@/providers/application-state";
import { useScreenY } from "@/providers/scroll-provider"
import { useEffect, useMemo } from "react";

export const HeroV2 = () => {
    const { setDark } = useApplicationState();
    const screenY = useScreenY();

    const shouldTransform = useMemo(() => {
        return screenY > 0.7;
    }, [screenY]);

    useEffect(() => {
        setDark(shouldTransform);
    }, [shouldTransform]);

    return (
        <main
            id="hero"
            className="sticky top-0 h-svh w-full overflow-hidden z-0"
        >
            <video
                src="/hero.mp4"
                muted
                playsInline
                autoPlay
                loop
                preload="auto"
                className="w-full h-full object-cover object-[25%_75%] data-[transformed=true]:hidden"
                data-transformed={shouldTransform}
            />

            <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 data-[transformed=true]:opacity-0" data-transformed={shouldTransform} />

            <div className="absolute inset-0 bg-[#eee] transition-opacity duration-500 opacity-0 data-[transformed=true]:opacity-100" data-transformed={shouldTransform} />
        </main>
    )
}