"use client";

import { HoverVideo } from "@/components/hover-video";
import { useAppState } from "@/stores/app-state";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

const TOTAL_FRAMES = 60;

type MediaBlockProps = {
    type: "image" | "hoverVideo";
    src: string;
    alt?: string;
    aspect: string;
    onClickImage?: () => void;
};

const useReveal = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -8% 0px",
            }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
};

const MediaBlock = (props: MediaBlockProps) => {
    const { ref, isVisible } = useReveal();

    return (
        <div
            ref={ref}
            className={`w-full relative ${props.aspect} overflow-hidden rounded-sm transition-all duration-700 ease-out will-change-transform ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
                }`}
        >
            {props.type === "image" ? (
                <NextImage
                    src={props.src}
                    alt={props.alt ?? ""}
                    fill
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover cursor-pointer"
                    draggable={false}
                    onClick={props.onClickImage}
                    data-media={true}
                />
            ) : (
                <HoverVideo src={props.src} />
            )}
        </div>
    );
};

export const Work = () => {
    const { screenY, mobile, setFullscreenUrl } = useAppState(
        useShallow((state) => ({
            screenY: state.screenY,
            mobile: state.mobile,
            setFullscreenUrl: state.setFullscreenUrl,
        }))
    );
    const t = useTranslations("work");
    const text = t("sectionText");

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const loadedRef = useRef(false);

    const [range, setRange] = useState({ start: 0, end: 1 });

    useEffect(() => {
        if (loadedRef.current) return;
        loadedRef.current = true;

        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `/asset1/frame_${String(i).padStart(4, "0")}.webp`;
            images.push(img);
        }

        imagesRef.current = images;
    }, []);

    useEffect(() => {
        const introEl = document.getElementById("intro");
        const workEl = sectionRef.current;
        if (!introEl || !workEl) return;

        const calculateRange = () => {
            const viewportHeight = window.innerHeight || 1;

            const introUnits = introEl.offsetHeight / viewportHeight;
            const workUnits = Math.max(
                0,
                (workEl.offsetHeight - viewportHeight) / viewportHeight
            );

            const start = 1 + introUnits;
            const end = start + workUnits;

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

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section ref={sectionRef} className="relative" id="work">
            <div className="sticky top-0 h-screen w-screen overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full"
                />

                <div className="absolute inset-0 bg-linear-to-br from-[#09122e] to-black pointer-events-none z-5 opacity-60" />
            </div>

            <div className="max-w-6xl w-full pt-24 pb-48 mx-auto flex flex-col">
                <div className="w-full px-5">
                    <div className="w-full mx-auto relative flex flex-row items-center flex-wrap gap-4">
                        <p className="text-white/80 tracking-wide text-xs">
                            02<span className="text-white/40">{"//"}</span>
                            {t("sectionTitle")}
                        </p>

                        <span className="text-nowrap text-2xl md:text-4xl tracking-wide text-white">
                            {text}
                        </span>
                    </div>

                    <div
                        id="work-content"
                        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 relative z-6"
                    >
                        <div className="work-column flex flex-col gap-5 w-full">
                            <p className="w-full text-white md:mt-24">
                                {t("caption")}
                            </p>

                            <MediaBlock
                                type="image"
                                src="/work01.webp"
                                aspect="aspect-[4/3] md:aspect-[3/4]"
                                onClickImage={() => setFullscreenUrl("/work01.webp")}
                            />

                            <MediaBlock
                                type={!mounted ? "image" : mobile ? "image" : "hoverVideo"}
                                src={!mounted ? "/work02.webp" : mobile ? "/work02.webp" : "/work02-vid.mp4"}
                                aspect="aspect-[4/3] md:aspect-[3/4]"
                                onClickImage={() => setFullscreenUrl("/work02.webp")}
                            />
                        </div>

                        <div className="work-column flex flex-col gap-5 w-full">
                            <MediaBlock
                                type="image"
                                src="/work03.webp"
                                aspect="aspect-[3/4] md:aspect-[2/3]"
                                onClickImage={() => setFullscreenUrl("/work03.webp")}
                            />

                            <MediaBlock
                                type="image"
                                src="/work04.webp"
                                aspect="aspect-[4/3] md:aspect-[3/4]"
                                onClickImage={() => setFullscreenUrl("/work04.webp")}
                            />
                        </div>

                        <div className="work-column flex flex-col gap-5 w-full">
                            <MediaBlock
                                type="image"
                                src="/work05.webp"
                                aspect="aspect-[4/3] md:aspect-[3/4]"
                                onClickImage={() => setFullscreenUrl("/work05.webp")}
                            />

                            <MediaBlock
                                type="image"
                                src="/work06.webp"
                                aspect="aspect-[16/9] md:aspect-[4/3]"
                                onClickImage={() => setFullscreenUrl("/work06.webp")}
                            />

                            <MediaBlock
                                type={!mounted ? "image" : mobile ? "image" : "hoverVideo"}
                                src={!mounted ? "/work07.webp" : mobile ? "/work07.webp" : "/work07-vid.mp4"}
                                aspect=""
                                onClickImage={() => setFullscreenUrl("/work07.webp")}
                            />

                            <a
                                href="/work"
                                className="md:mt-6 px-6 group hover:bg-[#C55BF9] hover:border-[#C55BF9] hover:text-black text-white transition-all duration-200 py-2 rounded-full font-medium border border-white w-fit flex flex-row items-center gap-6"
                            >
                                {t("exploreMore")}
                                <div className="bg-white p-2 group-hover:bg-black group-hover:text-white transition-all duration-200 rounded-full text-black">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M4 12h16m0 0l-6-6m6 6l-6 6"
                                        />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};