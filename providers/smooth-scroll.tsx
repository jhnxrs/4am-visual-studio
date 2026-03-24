"use client";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo } from "react";
import { isAndroidDevice } from "@/lib/is-android";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const isAndroid = useMemo(() => isAndroidDevice(), []);

    useEffect(() => {
        ScrollTrigger.refresh();
    }, [isAndroid]);

    if (isAndroid) {
        return <>{children}</>;
    }

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
