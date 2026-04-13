"use client";

import { useEnteredView } from "@/hooks/use-entered-view";
import { setupScrollScrubVideo } from "@/lib/scroll-scrub-video";
import { useAppState } from "@/stores/app-state";
import NextImage from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

export const Approach = () => {
    const t = useTranslations("approach");
    const text = t("sectionText");

    const videoRef = useRef<HTMLVideoElement>(null);
    const { ref: sectionRef, entered: sectionEntered } = useEnteredView<HTMLElement>();
    const wordsRef = useRef<HTMLDivElement>(null);

    const [range, setRange] = useState({ start: 0, end: 1 });
    const { mobile, screenY } = useAppState(
        useShallow((state) => ({
            mobile: state.mobile,
            screenY: state.screenY,
        }))
    );

    useEffect(() => {
        if (mobile) return;

        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video) return;

        let cleanup: (() => void) | undefined;

        const setup = () => {
            cleanup?.();
            cleanup = setupScrollScrubVideo({
                section,
                video,
            });
        };

        if (video.readyState >= 1) {
            setup();
        } else {
            video.addEventListener("loadedmetadata", setup, { once: true });
        }

        return () => {
            video.removeEventListener("loadedmetadata", setup);
            cleanup?.();
        };
    }, [mobile, sectionRef]);

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
        const introEl = document.getElementById("intro");
        const workEl = document.getElementById("work");
        const servicesEl = document.getElementById("services");
        const sectionEl = sectionRef.current;

        if (!introEl || !workEl || !servicesEl || !sectionEl) return;

        const calculateRange = () => {
            const viewportHeight = window.innerHeight || 1;

            const introUnits = introEl.offsetHeight / viewportHeight;
            const workUnits = workEl.offsetHeight / viewportHeight;
            const servicesUnits = servicesEl.offsetHeight / viewportHeight;

            const sectionUnits = Math.max(
                0,
                (sectionEl.offsetHeight - viewportHeight) / viewportHeight
            );

            const start = (1 + introUnits + workUnits + servicesUnits) + 0.25;
            const end = (start + sectionUnits) - 0.3;

            setRange({ start, end });
        };

        calculateRange();

        const resizeObserver = new ResizeObserver(() => {
            calculateRange();
        });

        resizeObserver.observe(introEl);
        resizeObserver.observe(workEl);

        window.addEventListener("resize", calculateRange);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", calculateRange);
        };
    }, [sectionRef]);

    useEffect(() => {
        if (mobile) return;

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
                el.style.transform = `translateY(${hiddenY}px)`;
                el.style.opacity = "0";
            }
        };

        const showAll = () => {
            for (const el of wordEls) {
                el.style.transform = "translateY(0)";
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

            el.style.transform = `translateY(${hiddenY * (1 - eased)}px)`;
            el.style.opacity = `${eased}`;
        }
    }, [mobile, screenY, text, range]);

    return (
        <section ref={sectionRef} className="relative" id="work">
            <div className="sticky top-0 h-screen w-screen overflow-hidden">
                {mobile ? (
                    <NextImage
                        src="/asset2/frame_0030.webp"
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                ) : (
                    <video
                        ref={videoRef}
                        src="/asset2.mp4"
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}

                <div className="absolute inset-0 bg-linear-to-br from-[#09122e] to-black pointer-events-none z-5 opacity-60" />
            </div>

            <div className="max-w-6xl w-full pt-24 pb-72 mx-auto flex flex-col">
                <div className="w-full px-5">
                    <div ref={wordsRef} className="max-w-[70%] mx-auto relative flex flex-row items-center flex-wrap gap-2">
                        <p data-label className="absolute top-4 left-0 text-white/80 tracking-wide text-xs">04<span className="text-white/40">{"//"}</span>{t('sectionTitle')}</p>
                        {text.split(' ').map((word, index) => {
                            const isFirstWord = index === 0;

                            return (
                                <span
                                    data-word
                                    key={index}
                                    className="text-nowrap data-[first=true]:ml-[calc(var(--label-w)+1.5rem)] text-xl md:text-4xl tracking-wide text-white"
                                    data-first={isFirstWord}
                                    style={
                                        mobile
                                            ? {
                                                opacity: sectionEntered ? 1 : 0,
                                                transform: `translateY(${sectionEntered ? 0 : 18}px)`,
                                                transitionProperty: "opacity, transform",
                                                transitionDuration: "700ms",
                                                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                                                transitionDelay: `${Math.min(index * 45, 320)}ms`,
                                                willChange: sectionEntered ? undefined : "opacity, transform",
                                                backfaceVisibility: "hidden",
                                                WebkitBackfaceVisibility: "hidden",
                                            }
                                            : {
                                                backfaceVisibility: "hidden",
                                                WebkitBackfaceVisibility: "hidden",
                                            }
                                    }
                                >
                                    {word}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
