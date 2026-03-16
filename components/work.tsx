"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
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

type MediaBlockProps = {
    type: "image" | "hoverVideo";
    src: string;
    alt?: string;
    aspect: string;
    onClickImage?: () => void;
};

const MediaBlock = (props: MediaBlockProps) => {
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

export const Work = (props: Props) => {
    void props;
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

            const extraScroll = vh * (isMobile ? 1.25 : 2.0);

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
            if (!sectionRef.current || !videoRef.current || !overlayRef.current) return;

            gsap.set(videoRef.current, {
                scale: isMobile ? 1 : 1.05,
                willChange: "transform",
            });

            gsap.set(overlayRef.current, {
                opacity: 0.8,
                willChange: "opacity",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: isMobile ? 0.4 : 0.8,
                    fastScrollEnd: true,
                },
            });

            if (isMobile) {
                tl.to(
                    videoRef.current,
                    { scale: 1.025, ease: "none", force3D: true },
                    0
                )
                    .to(overlayRef.current, { opacity: 0.68, ease: "none" }, 0.2)
                    .to(videoRef.current, { scale: 1, ease: "none", force3D: true }, 1)
                    .to(overlayRef.current, { opacity: 0.8, ease: "none" }, 1);
            } else {
                tl.to(
                    videoRef.current,
                    { filter: "blur(0px)", scale: 1, ease: "none", force3D: true },
                    0.15
                )
                    .to(overlayRef.current, { opacity: 0.6, ease: "none" }, 0.15)
                    .to(
                        videoRef.current,
                        { filter: "blur(24px)", scale: 1.05, ease: "none", force3D: true },
                        0.85
                    )
                    .to(overlayRef.current, { opacity: 0.8, ease: "none" }, 0.85);
            }

            return () => {
                tl.scrollTrigger?.kill();
                tl.kill();
            };
        },
        { dependencies: [isMobile], revertOnUpdate: true }
    );

    useEffect(() => {
        const video = videoRef.current;
        const section = sectionRef.current;
        if (!video || !section) return;

        video.muted = true;
        video.playsInline = true;

        if (isMobile) {
            video.loop = true;
            const playPromise = video.play();

            return () => {
                playPromise?.catch(() => { });
                video.pause();
            };
        }

        const playPromise = video.play();
        playPromise?.then(() => video.pause()).catch(() => { });

        let targetTime = 0;
        let rafId: number | null = null;

        const update = () => {
            if (!video.duration || !Number.isFinite(video.duration)) {
                rafId = null;
                return;
            }

            const delta = targetTime - video.currentTime;
            if (Math.abs(delta) < 0.01) {
                rafId = null;
                return;
            }

            const speed =
                Math.abs(delta) > 0.25 ? 0.35 : Math.abs(delta) > 0.08 ? 0.25 : 0.15;

            video.currentTime += delta * speed;
            rafId = requestAnimationFrame(update);
        };

        const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.35,
            fastScrollEnd: true,
            onUpdate: (self) => {
                if (!video.duration || !Number.isFinite(video.duration)) return;
                targetTime = self.progress * video.duration;
                if (!rafId) update();
            },
        });

        return () => {
            st.kill();
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isMobile]);

    useGSAP(
        () => {
            const words = wordsRef.current?.querySelectorAll("span");
            if (!words?.length) return;

            gsap.set(words, {
                y: 40,
                opacity: 0,
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

                    if (mobile) {
                        gsap.to(words, {
                            y: 0,
                            opacity: 1,
                            duration: 0.75,
                            ease: "power3.out",
                            stagger: 0.04,
                            force3D: true,
                            scrollTrigger: {
                                trigger: contentRef.current,
                                start: "top 84%",
                                once: true,
                            },
                        });

                        return;
                    }

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 82%",
                            end: () => `+=${window.innerHeight * 0.3}`,
                            scrub: 0.6,
                            fastScrollEnd: true,
                            invalidateOnRefresh: true,
                        },
                    });

                    tl.fromTo(
                        words,
                        { y: 40, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            ease: "power3.out",
                            stagger: 0.08,
                            force3D: true,
                        }
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
                force3D: true,
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
                                        force3D: true,
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
                                        force3D: true,
                                    }),
                                onLeave: (batch) =>
                                    gsap.to(batch, {
                                        opacity: 0,
                                        y: -80,
                                        duration: 0.4,
                                        ease: "power3.in",
                                        force3D: true,
                                    }),
                                onEnterBack: (batch) =>
                                    gsap.to(batch, {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.8,
                                        stagger: 0.15,
                                        ease: "power3.out",
                                        force3D: true,
                                    }),
                                onLeaveBack: (batch) =>
                                    gsap.to(batch, {
                                        opacity: 0,
                                        y: 80,
                                        duration: 0.4,
                                        ease: "power3.in",
                                        force3D: true,
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

    return (
        <section ref={sectionRef} className="relative" id="work">
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
                                02<span className="text-white/40">{"//"}</span>
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

                                <MediaBlock
                                    type="image"
                                    src="/work01.webp"
                                    aspect="aspect-[4/3] md:aspect-[3/4]"
                                    onClickImage={() => setFullscreenUrl("/work01.webp")}
                                />

                                <MediaBlock
                                    type={isMobile ? "image" : "hoverVideo"}
                                    src={isMobile ? "/work02.webp" : "/work02-vid.mp4"}
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
