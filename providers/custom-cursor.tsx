"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
        });

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener("mousemove", onMouseMove);

        gsap.ticker.add(() => {
            pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

            gsap.set(cursor, {
                x: pos.current.x,
                y: pos.current.y,
            });
        });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            gsap.ticker.remove(() => { });
        };
    }, []);

    return <div ref={cursorRef} className="custom-cursor" />;
};