"use client";

import { ReactLenis } from "lenis/react";

type Props = {
    children: React.ReactNode;
}

export const SmoothScrollProvider = (props: Props) => {
    return (
        <ReactLenis
            root
            options={{ lerp: 0.1 }}
        >
            {props.children}
        </ReactLenis>
    );
}
