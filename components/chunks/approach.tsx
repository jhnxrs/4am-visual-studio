"use client";

import { useAppState } from "@/stores/app-state";
import { useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 60;

const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

export const Approach = () => {
    const t = useTranslations("approach");
    const text = t("sectionText");

    const wordsRef = useRef<HTMLDivElement>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const loadedRef = useRef(false);

    const [range, setRange] = useState({ start: 0, end: 1 });
    const screenY = useAppState((state) => state.screenY);

    useEffect(() => {
        if (loadedRef.current) return;
        loadedRef.current = true;

        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `/asset2/frame_${String(i).padStart(4, "0")}.webp`;
            images.push(img);
        }

        imagesRef.current = images;
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
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const images = imagesRef.current;
        if (!images.length) return;

        const rawProgress = (screenY - range.start) / (range.end - range.start);
        const progress = Math.max(0, Math.min(1, rawProgress));

        const frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));
        const img = images[frameIndex];

        if (!img) return;

        if (
            canvas.width !== canvas.clientWidth ||
            canvas.height !== canvas.clientHeight
        ) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth: number;
        let drawHeight: number;
        let offsetX: number;
        let offsetY: number;

        if (imgRatio > canvasRatio) {
            drawHeight = canvas.height;
            drawWidth = drawHeight * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvas.width;
            drawHeight = drawWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }, [screenY, range]);

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
        <section ref={sectionRef} className="relative" id="work">
            <div className="sticky top-0 h-screen w-screen overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full"
                />

                <div className="absolute inset-0 bg-linear-to-br from-[#09122e] to-black pointer-events-none z-5 opacity-60" />
            </div>

            <div className="max-w-6xl w-full pt-24 pb-72 mx-auto flex flex-col">
                <div className="w-full px-5">
                    <div ref={wordsRef} className="max-w-[70%] mx-auto relative flex flex-row items-center flex-wrap gap-2">
                        <p data-label className="absolute top-4 left-0 text-white/80 tracking-wide text-xs">04<span className="text-white/40">{"//"}</span>{t('sectionTitle')}</p>
                        {text.split(' ').map((word, index) => {
                            const isFirstWord = index === 0;

                            return (
                                <span data-word key={index} className="text-nowrap data-[first=true]:ml-[calc(var(--label-w)+1.5rem)] text-xl md:text-4xl tracking-wide text-white" data-first={isFirstWord}>{word}</span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};