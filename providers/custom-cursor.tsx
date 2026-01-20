"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useApplicationState } from "@/providers/application-state";
import { useTranslations } from "next-intl";

export const CustomCursor = () => {
    const t = useTranslations();
    const cursorRef = useRef<HTMLDivElement>(null);
    const { isMobile } = useApplicationState();

    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });

    const [isMediaHover, setIsMediaHover] = useState(false);

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

            const target = e.target as HTMLElement | null;
            if (!target) return;

            const mediaEl = target.closest('[data-media="true"]');
            setIsMediaHover(!!mediaEl);
        };

        window.addEventListener("mousemove", onMouseMove);

        const tick = () => {
            pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

            gsap.set(cursor, {
                x: pos.current.x,
                y: pos.current.y,
            });
        };

        gsap.ticker.add(tick);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            gsap.ticker.remove(tick);
        };
    }, []);

    useEffect(() => {
        if (!cursorRef.current) return;

        gsap.to(cursorRef.current, {
            scale: isMediaHover ? 1.8 : 1,
            duration: 0.25,
            ease: "power3.out",
        });
    }, [isMediaHover]);

    if (isMobile) return null;

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isMediaHover ? "is-media" : ""}`}
        >
            {isMediaHover && <span>{t('view')}</span>}
        </div>
    );
};
