"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useAppState } from "@/stores/app-state";

export const CustomCursor = () => {
    const isMobile = useAppState((state) => state.mobile);
    const t = useTranslations();

    const cursorRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);

    const [isMediaHover, setIsMediaHover] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // center cursor
        cursor.style.transform = "translate(-50%, -50%)";

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            const target = e.target as HTMLElement | null;
            if (!target) return;

            const mediaEl = target.closest('[data-media="true"]');
            setIsMediaHover(!!mediaEl);
        };

        window.addEventListener("mousemove", onMouseMove);

        const tick = () => {
            // lerp
            pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

            if (cursor) {
                cursor.style.transform = `
                    translate(-50%, -50%)
                    translate(${pos.current.x}px, ${pos.current.y}px)
                    scale(${isMediaHover ? 1.8 : 1})
                `;
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isMediaHover]);

    if (isMobile) return null;

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isMediaHover ? "is-media" : ""}`}
        >
            {isMediaHover && <span>{t("view")}</span>}
        </div>
    );
};