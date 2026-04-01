"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

type Props = {
    children: React.ReactNode;
}

export const SmoothScrollProvider = (props: Props) => {
    const [shouldUseNativeScroll, setShouldUseNativeScroll] = useState(true);

    useEffect(() => {
        const coarsePointer = window.matchMedia("(pointer: coarse)");
        const noHover = window.matchMedia("(hover: none)");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        const update = () => {
            setShouldUseNativeScroll(
                coarsePointer.matches || noHover.matches || reducedMotion.matches
            );
        };

        update();

        coarsePointer.addEventListener("change", update);
        noHover.addEventListener("change", update);
        reducedMotion.addEventListener("change", update);

        return () => {
            coarsePointer.removeEventListener("change", update);
            noHover.removeEventListener("change", update);
            reducedMotion.removeEventListener("change", update);
        };
    }, []);

    if (shouldUseNativeScroll) {
        return props.children;
    }

    return (
        <ReactLenis
            root
            options={{ lerp: 0.1, syncTouch: true }}
        >
            {props.children}
        </ReactLenis>
    );
}
