"use client";

import { useTranslations } from "next-intl";
import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Image from "next/image";
import { useAppState } from "@/stores/app-state";
import { clamp } from "@/lib/utilities";

export const Services = () => {
    const t = useTranslations('services');
    const text = t("sectionText");

    const screenY = useAppState((state) => state.screenY);

    const shouldStartRendering = useMemo(() => {
        return screenY > 0.7;
    }, [screenY]);

    const sectionRef = useRef<HTMLElement>(null);
    const wordsRef = useRef<HTMLDivElement>(null);

    const words = useMemo(() => text.split(" "), [text]);

    const [range, setRange] = useState({ start: 0, end: 1 });

    const cards = [
        {
            title: t("cards.0.title"),
            description: t("cards.0.description"),
            image: "/branding.webp",
        },
        {
            title: t("cards.1.title"),
            description: t("cards.1.description"),
            image: "/design.webp",
        },
        {
            title: t("cards.2.title"),
            description: t("cards.2.description"),
            image: "/arch.webp",
        },
        {
            title: t("cards.3.title"),
            description: t("cards.3.description"),
            image: "/media.webp",
        },
    ];

    const getCardStyle = (index: number) => {
        const cardStart = range.start + index * 0.1;
        const cardDuration = 0.18;

        const progress = clamp(
            (screenY - cardStart) / cardDuration,
            0,
            1
        );

        const eased = 1 - Math.pow(1 - progress, 3);

        return {
            opacity: eased,
            transform: `translate3d(0, ${24 * (1 - eased)}px, 0)`,
            willChange: shouldStartRendering ? "transform, opacity" as const : undefined,
        };
    };

    useEffect(() => {
        const introEl = document.getElementById("intro");
        const workEl = document.getElementById("work");
        const sectionEl = sectionRef.current;

        if (!introEl || !workEl || !sectionEl) return;

        const calculateRange = () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            const viewportHeight = window.innerHeight || 1;
            const sectionRect = sectionEl.getBoundingClientRect();
            const sectionTopPx = window.scrollY + sectionRect.top;
            const sectionHeightPx = sectionEl.offsetHeight;

            const startOffsetPx = viewportHeight * 0.5;

            // animation uses a fraction of the section height
            const animationSpanPx = Math.min(
                Math.max(sectionHeightPx * 0.4, viewportHeight * 0.32),
                viewportHeight * 0.65
            );

            const start = (sectionTopPx - startOffsetPx) / viewportHeight;
            const end = (sectionTopPx - startOffsetPx + animationSpanPx) / viewportHeight;

            setRange({
                start,
                end: Math.max(start + 0.01, end),
            });
        };

        calculateRange();

        const resizeObserver = new ResizeObserver(() => {
            calculateRange();
        });

        resizeObserver.observe(introEl);
        resizeObserver.observe(sectionEl);
        resizeObserver.observe(workEl);

        window.addEventListener("resize", calculateRange);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", calculateRange);
        };
    }, []);

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

        if (screenY <= range.start) {
            hideAll();
            return;
        }

        if (screenY >= range.end) {
            showAll();
            return;
        }

        const baseProgress = clamp(
            (screenY - range.start) / (range.end - range.start),
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
    }, [screenY, text, range]);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="w-screen py-48 px-12 relative bg-[#eee] z-20"
        >
            <div
                ref={wordsRef}
                className="relative flex flex-row items-center flex-wrap gap-2"
            >
                <p
                    data-label
                    className="absolute top-4 left-0 text-black/80 tracking-wide text-xs"
                >
                    03<span className="text-black/40">{"//"}</span>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-12">
                {cards.map((card, index) => (
                    <div
                        key={card.title}
                        className="w-full flex flex-col gap-3"
                        style={getCardStyle(index)}
                    >
                        <h2 className="font-medium text-lg">{card.title}</h2>

                        <div className="w-full h-80 bg-gray-400 relative overflow-hidden">
                            <Image
                                src={card.image}
                                alt=""
                                fill
                                sizes="(min-width: 768px) 25vw, 100vw"
                                className="object-cover"
                            />
                        </div>

                        <p className="text-sm text-black/80">{card.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};