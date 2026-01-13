"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

type Props = {
    locale: 'pt' | 'en';
}

export const GetInTouch = (props: Props) => {
    const t = useTranslations('getInTouch');
    const text = t('sectionText');

    const wordsRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const words = wordsRef.current?.querySelectorAll("span");
        if (!words) return;

        gsap.set(words, { y: 40, opacity: 0 });
        gsap.set(contactRef.current, { y: 20, opacity: 0 });

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
                        trigger: "#get-in-touch",
                        start: "top 70%",
                        end: mobile ? "40% 60%" : "bottom bottom",
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
                    contactRef.current,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: contactRef.current,
                            start: "top 85%",
                            end: "top 60%",
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
        <section id="get-in-touch" className="w-screen pt-32 pb-48 bg-[#eee] px-12 relative z-20">
            <div ref={wordsRef} className="relative flex flex-row items-center flex-wrap gap-2">
                <p className="absolute top-4 left-0 text-black/80 tracking-wide text-xs">05<span className="text-black/40">//</span>{t('sectionTitle')}</p>
                {text.split(' ').map((word, index) => {
                    const isFirstWord = index === 0;

                    return (
                        <span key={index} className="text-nowrap data-[first=true]:ml-32 text-2xl md:text-4xl tracking-wide text-black" data-first={isFirstWord}>{word}</span>
                    )
                })}
            </div>
            <div
                ref={contactRef}
                className="flex flex-col md:flex-row md:items-center gap-6 mt-6"
            >
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <p className="text-black/60 font-light">{t('enquiries')}</p>
                    <p className="font-medium">orcamento@4amvisualstudio.com.br</p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <p className="text-black/60 font-light">{t('talk')}</p>
                    <p className="font-medium">+55 51 991691225</p>
                </div>

                <div className="flex flex-row items-center gap-3">
                    <a
                        className="cursor-pointer hover:opacity-80 transition-all duration-200"
                        href={props.locale === 'en' ? `https://wa.me/5551991691225?text=Hey,%20how%20are%20you%20doing?%20I'd%20like%20to%20talk.` : `https://wa.me/5551991691225?text=Ol%C3%A1,%20tudo%20bem?%20Gostaria%20de%20conversar.`}
                        target="_blank"
                    >
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                            />
                        </svg>
                    </a>

                    <a
                        className="cursor-pointer hover:opacity-80 transition-all duration-200"
                        href="https://www.instagram.com/4am.visualstudio"
                        target="_blank"
                    >
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                            />
                        </svg>
                    </a>

                    <a
                        className="cursor-pointer hover:opacity-80 transition-all duration-200"
                        href="https://www.behance.net/4am_visualstudio"
                        target="_blank"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M20.07 6.35H15v1.41h5.09ZM19 16.05a2.23 2.23 0 0 1-1.3.37a2.23 2.23 0 0 1-1.7-.54a2.5 2.5 0 0 1-.62-1.76H22a6.5 6.5 0 0 0-.17-2a5.1 5.1 0 0 0-.8-1.73a4.2 4.2 0 0 0-1.42-1.21a4.4 4.4 0 0 0-2-.45a4.9 4.9 0 0 0-1.9.37a4.5 4.5 0 0 0-1.47 1a4.4 4.4 0 0 0-.95 1.52a5.4 5.4 0 0 0-.33 1.91a5.5 5.5 0 0 0 .32 1.94a4.5 4.5 0 0 0 .88 1.53a4 4 0 0 0 1.46 1a5.2 5.2 0 0 0 1.94.34a4.77 4.77 0 0 0 2.64-.7a4.2 4.2 0 0 0 1.63-2.35h-2.21a1.54 1.54 0 0 1-.62.76m-3.43-4.12a1.87 1.87 0 0 1 1-1.14a2.3 2.3 0 0 1 1-.2a1.73 1.73 0 0 1 1.36.49a2.9 2.9 0 0 1 .63 1.45h-4.15a3 3 0 0 1 .11-.6Zm-5.29-.48a3.06 3.06 0 0 0 1.28-1a2.7 2.7 0 0 0 .43-1.58a3.3 3.3 0 0 0-.29-1.48a2.4 2.4 0 0 0-.82-1a3.2 3.2 0 0 0-1.27-.52a7.5 7.5 0 0 0-1.64-.16H2v12.58h6.1a6.6 6.6 0 0 0 1.65-.21a4.6 4.6 0 0 0 1.43-.65a3.1 3.1 0 0 0 1-1.14a3.4 3.4 0 0 0 .37-1.65a3.47 3.47 0 0 0-.57-2a3 3 0 0 0-1.75-1.19ZM4.77 7.86h2.59a4 4 0 0 1 .71.06a1.6 1.6 0 0 1 .61.22a1.05 1.05 0 0 1 .42.44a1.4 1.4 0 0 1 .16.72a1.36 1.36 0 0 1-.47 1.15a2 2 0 0 1-1.22.35h-2.8Zm4.84 7.44a1.3 1.3 0 0 1-.45.5a2 2 0 0 1-.65.26a3.3 3.3 0 0 1-.78.08h-3v-3.45h3a2.4 2.4 0 0 1 1.45.41a1.65 1.65 0 0 1 .54 1.39a1.8 1.8 0 0 1-.11.81"
                            />
                        </svg>
                    </a>
                </div>
            </div>

        </section>
    )
}