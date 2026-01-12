"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useTranslations } from "next-intl"

export const Approach = () => {
    const t = useTranslations('approach');
    const sectionRef = useRef<HTMLElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const text = t('sectionText');
    const wordsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set(videoRef.current, {
            scale: 1.05,
            filter: "blur(24px)",
        })

        gsap.set(overlayRef.current, {
            opacity: 0.8,
        })

        gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        })
            .to(videoRef.current, {
                filter: "blur(0px)",
                scale: 1,
                ease: "none",
            }, 0.15)
            .to(overlayRef.current, {
                opacity: 0.6,
                ease: "none",
            }, 0.15)
            .to(videoRef.current, {
                filter: "blur(24px)",
                scale: 1.05,
                ease: "none",
            }, 0.85)
            .to(overlayRef.current, {
                opacity: 0.8,
                ease: "none",
            }, 0.85)

    }, [])

    // ─── VIDEO SCRUB PLAYBACK ────────────────────────────
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        let targetTime = 0
        let rafId: number | null = null

        const update = () => {
            if (!video.duration) return

            const delta = targetTime - video.currentTime
            const speed =
                Math.abs(delta) > 0.25 ? 0.35 :
                    Math.abs(delta) > 0.08 ? 0.25 :
                        0.15

            video.currentTime += delta * speed
            rafId = requestAnimationFrame(update)
        }

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                targetTime = self.progress * video.duration
                if (!rafId) update()
            },
        })

        return () => {
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [])

    useGSAP(() => {
        const words = wordsRef.current?.querySelectorAll("span");
        if (!words) return;

        gsap.set(words, { y: 40, opacity: 0 });

        const mm = gsap.matchMedia();

        mm.add(
            {
                mobile: "(max-width: 767px)",
                desktop: "(min-width: 768px)",
            },
            (context) => {
                const { mobile } = context.conditions!;

                gsap.timeline({
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 90%",
                        end: "10% 50%",
                        scrub: true,
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
                    }
                );
            }
        );

        return () => mm.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative h-[350vh]">
            <div className="sticky top-0 h-screen w-screen overflow-hidden">
                <video
                    ref={videoRef}
                    src="/asset2.mp4"
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

            <div
                ref={contentRef}
                className="relative mt-[100vh] z-20 h-screen pointer-events-none"
            >
                <div ref={wordsRef} className="max-w-[70%] mx-auto relative flex flex-row items-center flex-wrap gap-2">
                    <p className="absolute top-4 left-0 text-white/80 tracking-wide text-xs">04<span className="text-white/40">//</span>{t('sectionTitle')}</p>
                    {text.split(' ').map((word, index) => {
                        const isFirstWord = index === 0;

                        return (
                            <span key={index} className="text-nowrap data-[first=true]:ml-32 text-2xl md:text-4xl tracking-wide text-white" data-first={isFirstWord}>{word}</span>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}