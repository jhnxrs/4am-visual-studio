"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useApplicationState } from "@/providers/application-state";
import { HoverVideo } from "@/components/hover-video";

gsap.registerPlugin(ScrollTrigger);

type Props = {
    locale: "pt" | "en";
};

export const Work = (props: Props) => {
    const isPortuguese = props.locale === "pt";
    const { setFullscreenUrl, isMobile } = useApplicationState();
    const t = useTranslations("work");

    const sectionRef = useRef<HTMLElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const contentWrapRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const wordsRef = useRef<HTMLDivElement>(null);

    const text = t("sectionText");

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const contentWrap = contentWrapRef.current;
        if (!section || !contentWrap) return;

        const recompute = () => {
            const vh = window.innerHeight;

            const contentH = contentWrap.getBoundingClientRect().height;

            const extraScroll = vh * 2.0;

            section.style.height = `${vh + contentH + extraScroll}px`;
            ScrollTrigger.refresh();
        };

        recompute();

        const ro = new ResizeObserver(recompute);
        ro.observe(contentWrap);

        window.addEventListener("resize", recompute);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", recompute);
        };
    }, [text, isMobile]);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            gsap.set(videoRef.current, {
                scale: 1.05,
                filter: "blur(24px)",
            });

            gsap.set(overlayRef.current, {
                opacity: 0.8,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            tl.to(
                videoRef.current,
                { filter: "blur(0px)", scale: 1, ease: "none" },
                0.15
            )
                .to(overlayRef.current, { opacity: 0.6, ease: "none" }, 0.15)
                .to(
                    videoRef.current,
                    { filter: "blur(24px)", scale: 1.05, ease: "none" },
                    0.85
                )
                .to(overlayRef.current, { opacity: 0.8, ease: "none" }, 0.85);

            return () => {
                tl.scrollTrigger?.kill();
                tl.kill();
            };
        },
        { dependencies: [] }
    );

    useEffect(() => {
        const video = videoRef.current;
        const section = sectionRef.current;
        if (!video || !section) return;

        video.muted = true;
        video.playsInline = true;

        const playPromise = video.play();
        playPromise?.then(() => video.pause()).catch(() => { });

        let targetTime = 0;
        let rafId: number | null = null;

        const update = () => {
            if (!video.duration) return;

            const delta = targetTime - video.currentTime;
            const speed =
                Math.abs(delta) > 0.25 ? 0.35 : Math.abs(delta) > 0.08 ? 0.25 : 0.15;

            video.currentTime += delta * speed;
            rafId = requestAnimationFrame(update);
        };

        const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                if (!video.duration) return;
                targetTime = self.progress * video.duration;
                if (!rafId) update();
            },
        });

        return () => {
            st.kill();
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    useGSAP(
        () => {
            const words = wordsRef.current?.querySelectorAll("span");
            if (!words?.length) return;

            gsap.set(words, { y: 40, opacity: 0 });

            const mm = gsap.matchMedia();

            mm.add(
                {
                    mobile: "(max-width: 767px)",
                    desktop: "(min-width: 768px)",
                },
                () => {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 90%",
                            end: "10% 50%",
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    });

                    tl.fromTo(
                        words,
                        { y: 40, opacity: 0 },
                        { y: 0, opacity: 1, ease: "power3.out", stagger: 0.08 }
                    );

                    return () => {
                        tl.scrollTrigger?.kill();
                        tl.kill();
                    };
                }
            );

            return () => mm.revert();
        },
        { dependencies: [text] }
    );

    useGSAP(
        () => {
            const columns = sectionRef.current?.querySelectorAll(".work-column");
            if (!columns?.length) return;

            gsap.set(columns, {
                opacity: 0.2,
                y: 80,
                willChange: "transform, opacity",
            });

            const mm = gsap.matchMedia();

            mm.add(
                {
                    mobile: "(max-width: 767px)",
                    desktop: "(min-width: 768px)",
                },
                (context) => {
                    const { mobile } = context.conditions!;

                    ScrollTrigger.batch(columns, {
                        start: "top 85%",
                        ...(mobile
                            ? {
                                once: true,
                                onEnter: (batch) =>
                                    gsap.to(batch, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.8,
                                        stagger: 0.15,
                                        ease: "power3.out",
                                    }),
                            }
                            : {
                                end: "bottom 25%",
                                onEnter: (batch) =>
                                    gsap.to(batch, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.8,
                                        stagger: 0.15,
                                        ease: "power3.out",
                                    }),
                                onLeave: (batch) =>
                                    gsap.to(batch, {
                                        opacity: 0,
                                        y: -80,
                                        duration: 0.4,
                                        ease: "power3.in",
                                    }),
                                onEnterBack: (batch) =>
                                    gsap.to(batch, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.8,
                                        stagger: 0.15,
                                        ease: "power3.out",
                                    }),
                                onLeaveBack: (batch) =>
                                    gsap.to(batch, {
                                        opacity: 0,
                                        y: 80,
                                        duration: 0.4,
                                        ease: "power3.in",
                                    }),
                            }),
                    });
                }
            );

            return () => mm.revert();
        },
        { dependencies: [] }
    );

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

    const Media = useMemo(() => {
        return function MediaBlock(props: {
            type: "image" | "hoverVideo";
            src: string;
            alt?: string;
            aspect: string;
            onClickImage?: () => void;
        }) {
            return (
                <div className={`w-full relative ${props.aspect} overflow-hidden`}>
                    {props.type === "image" ? (
                        <Image
                            src={props.src}
                            alt={props.alt ?? ""}
                            fill
                            priority
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
    }, []);

    return (
        <section ref={sectionRef} className="relative" id="approach">
            <div ref={stickyRef} className="sticky top-0 h-screen w-screen overflow-hidden">
                <video
                    ref={videoRef}
                    src="/asset1.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-linear-to-br from-[#09122e] to-black pointer-events-none z-5"
                />
            </div>

            <div ref={contentWrapRef} className="relative z-20">
                <div ref={contentRef} className="pt-[100vh] pb-24 md:pb-32">
                    <div className="max-w-6xl w-full mx-auto px-5 md:px-8">
                        <div
                            ref={wordsRef}
                            className="w-full mx-auto relative flex flex-row items-center flex-wrap gap-2"
                        >
                            <p
                                data-label
                                className="absolute top-4 left-0 text-white/80 tracking-wide text-xs"
                            >
                                02<span className="text-white/40">//</span>
                                {t("sectionTitle")}
                            </p>

                            {text.split(" ").map((word, index) => {
                                const isFirstWord = index === 0;

                                return (
                                    <span
                                        key={index}
                                        className="text-nowrap data-[first=true]:ml-[calc(var(--label-w)+1.5rem)] text-2xl md:text-4xl tracking-wide text-white"
                                        data-first={isFirstWord}
                                    >
                                        {word}
                                    </span>
                                );
                            })}
                        </div>

                        <div
                            id="work-content"
                            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5"
                        >
                            <div className="work-column flex flex-col gap-5 w-full">
                                <p className="w-full text-white md:mt-24">
                                    {t("caption")}
                                </p>

                                <Media
                                    type="image"
                                    src="/work01.webp"
                                    aspect="aspect-[4/3] md:aspect-[3/4]"
                                    onClickImage={() => setFullscreenUrl("/work01.webp")}
                                />

                                <Media
                                    type={isMobile ? "image" : "hoverVideo"}
                                    src={isMobile ? "/work02.webp" : "/work02-vid.mp4"}
                                    aspect="aspect-[4/3] md:aspect-[3/4]"
                                    onClickImage={() => setFullscreenUrl("/work02.webp")}
                                />
                            </div>

                            <div className="work-column flex flex-col gap-5 w-full">
                                <Media
                                    type="image"
                                    src="/work03.webp"
                                    aspect="aspect-[3/4] md:aspect-[2/3]"
                                    onClickImage={() => setFullscreenUrl("/work03.webp")}
                                />

                                <Media
                                    type="image"
                                    src="/work04.webp"
                                    aspect="aspect-[4/3] md:aspect-[3/4]"
                                    onClickImage={() => setFullscreenUrl("/work04.webp")}
                                />
                            </div>

                            <div className="work-column flex flex-col gap-5 w-full">
                                <Media
                                    type="image"
                                    src="/work05.webp"
                                    aspect="aspect-[4/3] md:aspect-[3/4]"
                                    onClickImage={() => setFullscreenUrl("/work05.webp")}
                                />

                                <Media
                                    type="image"
                                    src="/work06.webp"
                                    aspect="aspect-[16/9] md:aspect-[4/3]"
                                    onClickImage={() => setFullscreenUrl("/work06.webp")}
                                />

                                <Media
                                    type={isMobile ? "image" : "hoverVideo"}
                                    src={isMobile ? "/work07.webp" : "/work07-vid.mp4"}
                                    aspect="aspect-[16/9] md:aspect-[4/3]"
                                    onClickImage={() => setFullscreenUrl("/work07.webp")}
                                />

                                <a
                                    href="/work"
                                    className="px-6 group hover:bg-[#C55BF9] hover:border-[#C55BF9] hover:text-black text-white transition-all duration-200 py-2 rounded-full font-medium border border-white w-fit flex flex-row items-center gap-6"
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
            </div>
        </section>
    );
};