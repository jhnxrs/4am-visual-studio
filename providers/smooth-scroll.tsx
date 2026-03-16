"use client";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(pointer: coarse)");
        const update = () => {
            setIsTouchDevice(media.matches || ScrollTrigger.isTouch === 1);
        };

        update();
        media.addEventListener("change", update);

        return () => media.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        ScrollTrigger.config({
            ignoreMobileResize: true,
            limitCallbacks: true,
        });

        ScrollTrigger.refresh();
    }, []);

    return (
        <ReactLenis
            root
            options={{
                lerp: isTouchDevice ? 0.18 : 0.1,
                smoothWheel: true,
                syncTouch: isTouchDevice,
                syncTouchLerp: 0.12,
                touchInertiaExponent: 28,
                autoResize: true,
            }}
            onScroll={() => {
                ScrollTrigger.update();
            }}
        >
            {children}
        </ReactLenis>
    );
}
