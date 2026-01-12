"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Intro = () => {
    const t = useTranslations('intro');
    const text = t('sectionText');

    const wordsRef = useRef<HTMLDivElement>(null);

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
                        trigger: "#intro",
                        start: "top 60%",
                        end: mobile ? "+=200" : "+=400",
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

    useGSAP(() => {
        const el = document.querySelector('#intro-upper-text');
        if (!el) return;

        const intro = el.closest('#intro');
        if (!intro) return;

        const shouldShow = !ScrollTrigger.isInViewport(intro, 0.3);

        if (!shouldShow) {
            gsap.set(el, { opacity: 0 });
            return;
        }

        gsap.from(el, {
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
        });
    }, []);

    return (
        <section id="intro" className="w-screen py-48 px-12 relative bg-[#eee] z-20">
            <div id="intro-upper-text" className="-top-48 md:-top-30 absolute px-6 z-20 flex flex-col gap-2 md:gap-1 w-full left-1/2 transform -translate-x-1/2">
                <h2 className="text-3xl md:text-4xl font-light text-white">
                    {t("heroTitle")}
                </h2>
                <p className="text-sm md:text-base text-white/60 max-w-xl">
                    {t("heroText")}
                </p>
            </div>

            <div ref={wordsRef} className="relative flex flex-row items-center flex-wrap gap-2">
                <p className="absolute top-4 left-0 text-black/80 tracking-wide text-xs">01<span className="text-black/40">//</span>{t("sectionTitle")}</p>
                {text.split(' ').map((word, index) => {
                    const isFirstWord = index === 0;

                    return (
                        <span key={index} className="text-nowrap data-[first=true]:ml-32 text-2xl md:text-4xl tracking-wide text-black" data-first={isFirstWord}>{word}</span>
                    )
                })}
            </div>
        </section>
    )
}