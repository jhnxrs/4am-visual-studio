"use client";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        ScrollTrigger.refresh();
    }, []);

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
            }}
            onScroll={() => {
                ScrollTrigger.update();
            }}
        >
            {children}
        </ReactLenis>
    );
}