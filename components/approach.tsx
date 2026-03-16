"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useTranslations } from "next-intl"
import { useApplicationState } from "@/providers/application-state"

export const Approach = () => {
    const t = useTranslations('approach');
    const { isMobile } = useApplicationState();
    const sectionRef = useRef<HTMLElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const text = t('sectionText');
    const wordsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !videoRef.current || !overlayRef.current) return;

        gsap.set(videoRef.current, {
            scale: isMobile ? 1 : 1.05,
            willChange: "transform",
        })

        gsap.set(overlayRef.current, {
            opacity: 0.8,
            willChange: "opacity",
        })

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
            tl.to(videoRef.current, {
                scale: 1.025,
                ease: "none",
                force3D: true,
            }, 0)
                .to(overlayRef.current, {
                    opacity: 0.68,
                    ease: "none",
                }, 0.2)
                .to(videoRef.current, {
                    scale: 1,
                    ease: "none",
                    force3D: true,
                }, 1)
                .to(overlayRef.current, {
                    opacity: 0.8,
                    ease: "none",
                }, 1)
        } else {
            tl.to(videoRef.current, {
                filter: "blur(0px)",
                scale: 1,
                ease: "none",
                force3D: true,
            }, 0.15)
                .to(overlayRef.current, {
                    opacity: 0.6,
                    ease: "none",
                }, 0.15)
                .to(videoRef.current, {
                    filter: "blur(24px)",
                    scale: 1.05,
                    ease: "none",
                    force3D: true,
                }, 0.85)
                .to(overlayRef.current, {
                    opacity: 0.8,
                    ease: "none",
                }, 0.85)
        }

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, { dependencies: [isMobile], revertOnUpdate: true })

    useEffect(() => {
        const video = videoRef.current
        const section = sectionRef.current
        if (!video || !section) return

        video.muted = true
        video.playsInline = true

        if (isMobile) {
            video.loop = true
            const playPromise = video.play()

            return () => {
                playPromise?.catch(() => { })
                video.pause()
            }
        }

        const playPromise = video.play()

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    video.pause()
                })
                .catch(() => {
                })
        }

        let targetTime = 0
        let rafId: number | null = null

        const update = () => {
            if (!video.duration || !Number.isFinite(video.duration)) {
                rafId = null
                return
            }

            const delta = targetTime - video.currentTime
            if (Math.abs(delta) < 0.01) {
                rafId = null
                return
            }

            const speed =
                Math.abs(delta) > 0.25 ? 0.35 :
                    Math.abs(delta) > 0.08 ? 0.25 :
                        0.15

            video.currentTime += delta * speed
            rafId = requestAnimationFrame(update)
        }

        const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.35,
            fastScrollEnd: true,
            onUpdate: (self) => {
                if (!video.duration || !Number.isFinite(video.duration)) return
                targetTime = self.progress * video.duration
                if (!rafId) update()
            },
        })

        return () => {
            st.kill()
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [isMobile])


    useGSAP(() => {
        const words = wordsRef.current?.querySelectorAll("span");
        if (!words) return;

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

                gsap.timeline({
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 82%",
                        end: () => `+=${window.innerHeight * 0.3}`,
                        scrub: 0.6,
                        fastScrollEnd: true,
                        invalidateOnRefresh: true,
                    },
                }).fromTo(
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
            }
        );

        return () => mm.revert();
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
    }, [t, text]);

    return (
        <section ref={sectionRef} className="relative h-[280vh] md:h-[350vh]" id="approach">
            <div className="sticky top-0 h-screen w-screen overflow-hidden">
                <video
                    ref={videoRef}
                    src="/asset2.mp4"
                    muted
                    playsInline
                    webkit-playsinline="true"
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-linear-to-br from-[#09122e] to-black pointer-events-none z-5"
                />
            </div>

            <div
                ref={contentRef}
                className="relative mt-[100vh] z-20 h-screen pointer-events-none"
            >
                <div ref={wordsRef} className="max-w-[70%] mx-auto relative flex flex-row items-center flex-wrap gap-2">
                    <p data-label className="absolute top-4 left-0 text-white/80 tracking-wide text-xs">04<span className="text-white/40">{"//"}</span>{t('sectionTitle')}</p>
                    {text.split(' ').map((word, index) => {
                        const isFirstWord = index === 0;

                        return (
                            <span key={index} className="text-nowrap data-[first=true]:ml-[calc(var(--label-w)+1.5rem)] text-2xl md:text-4xl tracking-wide text-white" data-first={isFirstWord}>{word}</span>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
