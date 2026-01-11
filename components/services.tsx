"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useApplicationState } from "@/providers/application-state";

export const Services = () => {
    const t = useTranslations('services');
    const text = t('sectionText');

    const wordsRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    const setCardRef = (el: HTMLDivElement | null, index: number) => {
        if (el) cardsRef.current[index] = el;
    };

    const { isMobile } = useApplicationState();

    useGSAP(() => {
        const words = wordsRef.current?.querySelectorAll("span");
        if (!words) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.querySelector('#services'),
                start: "top 60%",
                end: isMobile ? '+=200' : '+=400',
                scrub: true,
            },
        });

        tl.fromTo(
            words,
            {
                y: 40,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                ease: "power3.out",
                stagger: 0.08,
            }
        );
    }, [isMobile]);

    useGSAP(() => {
        const cards = cardsRef.current;
        if (!cards.length) return;

        gsap.fromTo(
            cards,
            {
                y: 60,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                ease: "power3.out",
                stagger: 0.25,
                scrollTrigger: {
                    trigger: cards[0].parentElement,
                    start: isMobile ? "top 40%" : "top 60%",
                    end: "bottom 90%",
                    scrub: true,
                },
            }
        );
    }, [isMobile]);

    return (
        <section id="services" className="w-screen py-32 px-12 relative bg-white z-20 flex flex-col gap-12">
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
                    <div className="w-full h-80 bg-gray-200" />
                    <p className="text-sm text-black/80">{t('cards.0.description')}</p>
                </div>
                <div
                    className="w-full flex flex-col gap-3"
                    ref={(el) => setCardRef(el, 1)}
                >
                    <h2 className="font-medium text-lg">{t('cards.1.title')}</h2>
                    <div className="w-full h-80 bg-gray-200" />
                    <p className="text-sm text-black/80">{t('cards.1.description')}</p>
                </div>
                <div
                    className="w-full flex flex-col gap-3"
                    ref={(el) => setCardRef(el, 2)}
                >
                    <h2 className="font-medium text-lg">{t('cards.2.title')}</h2>
                    <div className="w-full h-80 bg-gray-200" />
                    <p className="text-sm text-black/80">{t('cards.2.description')}</p>
                </div>
                <div
                    className="w-full flex flex-col gap-3"
                    ref={(el) => setCardRef(el, 3)}
                >
                    <h2 className="font-medium text-lg">{t('cards.3.title')}</h2>
                    <div className="w-full h-80 bg-gray-200" />
                    <p className="text-sm text-black/80">{t('cards.3.description')}</p>
                </div>
            </div>
        </section>
    )
}