"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Work = () => {
    const t = useTranslations("work");
    const text = t("sectionText");
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const letters = sectionRef.current?.querySelectorAll(
            ".work-title span"
        );

        if (letters) {
            gsap.set(letters, { y: 40, opacity: 0 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "40% 90%",
                    scrub: true,
                },
            }).to(letters, {
                y: 0,
                opacity: 1,
                ease: "power3.out",
                stagger: 0.08,
            });
        }

        const columns = sectionRef.current?.querySelectorAll(
            ".work-column"
        );

        if (!columns) return;

        gsap.set(columns, {
            opacity: 0.2,
            y: 80,
            willChange: "transform, opacity",
        });

        ScrollTrigger.batch(columns, {
            start: "top 85%",
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
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            id="work"
            className="w-screen py-32 px-12 flex flex-col bg-[#eee] relative z-20"
        >
            {/* Title */}
            <div className="relative w-full mb-16 work-title">
                <p className="absolute -top-4 left-0 text-black/80 tracking-wide text-xs">
                    02<span className="text-black/40">//</span>{t("sectionTitle")}
                </p>

                <div className="flex flex-wrap items-center leading-none gap-x-6">
                    {text.split(" ").map((word) => (
                        <div key={word} className="flex">
                            {word.split("").map((letter, index) => (
                                <span
                                    key={index}
                                    className="text-black text-[50px] md:text-[120px] font-black"
                                >
                                    {letter}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div
                id="work-content"
                className="grid grid-cols-3 gap-5 contain-[layout_paint]"
            >
                <div className="work-column flex flex-col gap-5 w-full">
                    <p className="max-w-sm text-black mt-24">
                        {t("caption")}
                    </p>
                    <div className="w-full relative h-125">
                        <Image
                            src="/work01.webp"
                            alt=""
                            fill
                            priority
                            sizes="(min-width: 768px) 25vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full relative h-125">
                        <Image
                            src="/work02.webp"
                            alt=""
                            fill
                            priority
                            sizes="(min-width: 768px) 25vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="work-column flex flex-col gap-5 w-full">
                    <div className="w-full relative h-175">
                        <Image
                            src="/work03.webp"
                            alt=""
                            fill
                            priority
                            sizes="(min-width: 768px) 25vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full relative h-140">
                        <Image
                            src="/work04.webp"
                            alt=""
                            fill
                            priority
                            sizes="(min-width: 768px) 25vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="work-column flex flex-col gap-5 w-full">
                    <div className="w-full relative h-125">
                        <Image
                            src="/work05.webp"
                            alt=""
                            fill
                            priority
                            sizes="(min-width: 768px) 25vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full relative h-50">
                        <Image
                            src="/work06.webp"
                            alt=""
                            fill
                            priority
                            sizes="(min-width: 768px) 25vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full relative h-60">
                        <Image
                            src="/work07.webp"
                            alt=""
                            fill
                            priority
                            sizes="(min-width: 768px) 25vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
