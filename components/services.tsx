"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Services = () => {
    const t = useTranslations('services');
    const text = t('sectionText');

    const wordsRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    const setCardRef = (el: HTMLDivElement | null, index: number) => {
        if (el) cardsRef.current[index] = el;
    };

    useGSAP(() => {
        const words = wordsRef.current?.querySelectorAll("span");
        const cards = cardsRef.current;

        if (!words || !cards?.length) return;

        gsap.set(words, { y: 40, opacity: 0 });
        gsap.set(cards, { y: 60, opacity: 0 });

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
                        trigger: "#services",
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

                gsap.fromTo(
                    cards,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        ease: "power3.out",
                        stagger: 0.25,
                        scrollTrigger: {
                            trigger: cards[0].parentElement,
                            start: mobile ? "top 40%" : "top 60%",
                            end: "bottom 90%",
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }
        );

        return () => mm.revert();
    }, []);

    return (
        <section id="services" className="w-screen py-32 px-12 relative bg-[#eee] z-20 flex flex-col gap-12">
            <div ref={wordsRef} className="relative flex flex-row items-center flex-wrap gap-2">
                <p className="absolute top-4 left-0 text-black/80 tracking-wide text-xs">03<span className="text-black/40">//</span>{t('sectionTitle')}</p>
                {text.split(' ').map((word, index) => {
                    const isFirstWord = index === 0;

                    return (
                        <span key={index} className="text-nowrap data-[first=true]:ml-32 text-2xl md:text-4xl tracking-wide text-black" data-first={isFirstWord}>{word}</span>
                    )
                })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div
                    className="w-full flex flex-col gap-3"
                    ref={(el) => setCardRef(el, 0)}
                >
                    <h2 className="font-medium text-lg">{t('cards.0.title')}</h2>
                    <div className="w-full h-80 bg-gray-400 relative overflow-hidden">
                        <Image
                            src="/branding.webp"
                            alt=""
                            fill
                            priority
                            sizes="(min-width: 768px) 25vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <p className="text-sm text-black/80">{t('cards.0.description')}</p>
                </div>
                <div
                    className="w-full flex flex-col gap-3"
                    ref={(el) => setCardRef(el, 1)}
                >
                    <h2 className="font-medium text-lg">{t('cards.1.title')}</h2>
                    <div className="w-full h-80 bg-gray-400 relative overflow-hidden">
                        <Image
                            src="/design.webp"
                            alt=""
                            fill
                            priority
                            sizes="(min-width: 768px) 25vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <p className="text-sm text-black/80">{t('cards.1.description')}</p>
                </div>
                <div
                    className="w-full flex flex-col gap-3"
                    ref={(el) => setCardRef(el, 2)}
                >
                    <h2 className="font-medium text-lg">{t('cards.2.title')}</h2>
                    <div className="w-full h-80 bg-gray-400 relative overflow-hidden">
                        <Image
                            src="/arch.webp"
                            alt=""
                            fill
                            priority
                            sizes="(min-width: 768px) 25vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <p className="text-sm text-black/80">{t('cards.2.description')}</p>
                </div>
                <div
                    className="w-full flex flex-col gap-3"
                    ref={(el) => setCardRef(el, 3)}
                >
                    <h2 className="font-medium text-lg">{t('cards.3.title')}</h2>
                    <div className="w-full h-80 bg-gray-400 relative overflow-hidden">
                        <Image
                            src="/media.webp"
                            alt=""
                            fill
                            priority
                            sizes="(min-width: 768px) 25vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <p className="text-sm text-black/80">{t('cards.3.description')}</p>
                </div>
            </div>
        </section>
    )
}