"use client";

import { clamp } from "@/lib/utilities";
import { useAppState } from "@/stores/app-state";
import { useTranslations } from "next-intl";
import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";

export const Intro = () => {
    const t = useTranslations("intro");
    const text = t("sectionText");

    const screenY = useAppState((state) => state.screenY);

    const shouldStartRendering = useMemo(() => {
        return screenY > 0.6;
    }, [screenY]);

    const [showUpperText, setShowUpperText] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const wordsRef = useRef<HTMLDivElement>(null);

    const words = useMemo(() => text.split(" "), [text]);

    useEffect(() => {
        const id = window.requestAnimationFrame(() => {
            setShowUpperText(true);
        });

        return () => window.cancelAnimationFrame(id);
    }, []);

    useEffect(() => {
        setShowUpperText(!shouldStartRendering);
    }, [shouldStartRendering]);

    useLayoutEffect(() => {
        const root = wordsRef.current;
        if (!root) return;

        const label = root.querySelector<HTMLElement>("[data-label]");
        if (!label) return;

        const apply = () => {
            const w = label.getBoundingClientRect().width;
            root.style.setProperty("--label-w", `${Math.ceil(w)}px`);
        };

        apply();

        const ro = new ResizeObserver(apply);
        ro.observe(label);

        return () => ro.disconnect();
    }, [text]);

    useEffect(() => {
        const root = wordsRef.current;
        if (!root) return;

        const wordEls = Array.from(
            root.querySelectorAll<HTMLElement>("[data-word]")
        );
        if (!wordEls.length) return;

        const animationStart = 0.55;
        const animationEnd = 0.8;
        const hiddenY = 18;
        const wordDuration = 0.2;

        const hideAll = () => {
            for (const el of wordEls) {
                el.style.transform = `translate3d(0, ${hiddenY}px, 0)`;
                el.style.opacity = "0";
            }
        };

        const showAll = () => {
            for (const el of wordEls) {
                el.style.transform = "translate3d(0, 0, 0)";
                el.style.opacity = "1";
            }
        };

        if (screenY <= animationStart) {
            hideAll();
            return;
        }

        if (screenY >= animationEnd) {
            showAll();
            return;
        }

        const baseProgress = clamp(
            (screenY - animationStart) / (animationEnd - animationStart),
            0,
            1
        );

        const maxStart = Math.max(1 - wordDuration, 0);
        const step = wordEls.length > 1 ? maxStart / (wordEls.length - 1) : 0;

        for (let i = 0; i < wordEls.length; i++) {
            const el = wordEls[i];
            const wordStart = i * step;

            const wordProgress = clamp(
                (baseProgress - wordStart) / wordDuration,
                0,
                1
            );

            const eased = 1 - Math.pow(1 - wordProgress, 3);

            el.style.transform = `translate3d(0, ${hiddenY * (1 - eased)}px, 0)`;
            el.style.opacity = `${eased}`;
        }
    }, [screenY, text]);

    return (
        <section
            ref={sectionRef}
            id="intro"
            className="w-screen py-48 px-12 relative bg-[#eee] z-20"
        >
            <div
                id="intro-upper-text"
                className={[
                    "-top-40 md:-top-30 absolute px-6 z-20 flex flex-col gap-2 md:gap-1 w-full left-1/2 transform -translate-x-1/2 transition-opacity duration-700 will-change-[opacity]",
                    showUpperText ? "opacity-100" : "opacity-0",
                ].join(" ")}
            >
                <h2 className="text-3xl md:text-4xl font-light text-white">
                    {t("heroTitle")}
                </h2>
                <p className="text-sm md:text-base text-white/60 max-w-xl">
                    {t("heroText")}
                </p>
            </div>

            <div
                ref={wordsRef}
                className="relative flex flex-row items-center flex-wrap gap-2"
            >
                <p
                    data-label
                    className="absolute top-4 left-0 text-black/80 tracking-wide text-xs"
                >
                    01<span className="text-black/40">{"//"}</span>
                    {t("sectionTitle")}
                </p>

                {words.map((word, index) => {
                    const isFirstWord = index === 0;

                    return (
                        <span
                            key={`${word}-${index}`}
                            data-word
                            data-first={isFirstWord}
                            className="text-nowrap data-[first=true]:ml-[calc(var(--label-w)+1.5rem)] text-2xl md:text-4xl tracking-wide text-black"
                            style={
                                shouldStartRendering
                                    ? {
                                        opacity: 0,
                                        transform: "translate3d(0, 24px, 0)",
                                        willChange: "transform, opacity",
                                    }
                                    : {
                                        opacity: 0,
                                        transform: "translate3d(0, 24px, 0)",
                                    }
                            }
                        >
                            {word}
                        </span>
                    );
                })}
            </div>
        </section>
    );
};