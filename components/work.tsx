"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export const Work = () => {
    const t = useTranslations("work");
    const text = t("sectionText");
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const words = sectionRef.current?.querySelectorAll("span");

        if (words) {
            gsap.set(words, { y: 40, opacity: 0 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "40% 90%",
                    scrub: true,
                },
            }).to(words, {
                y: 0,
                opacity: 1,
                ease: "power3.out",
                stagger: 0.08,
            });
        }

        const rows = gsap.utils.toArray<HTMLElement>(
            "#work-content > div"
        );

        gsap.set(rows, {
            opacity: 0,
            y: 60,
        });

        rows.forEach((row) => {
            gsap.to(row, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: row,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                },
            });
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-screen py-32 px-12 flex flex-col relative bg-[#eee] z-20"
            id="work"
        >
            <div className="relative w-full">
                <p className="absolute -top-4 left-0 text-black/80 tracking-wide text-xs">
                    02
                    <span className="text-black/40">//</span>
                    {t("sectionTitle")}
                </p>

                <div className="flex flex-row items-center flex-wrap gap-0 leading-none md:gap-8">
                    {text.split(" ").map((word) => (
                        <div key={word} className="flex flex-row items-center">
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

            <div
                className="w-full flex flex-col mt-5 md:mt-0"
                id="work-content"
            >
                <div className="w-full flex flex-col md:flex-row md:items-end gap-5">
                    <p className="max-w-sm text-black">
                        {t("caption")}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5">
                        <div className="col-span-1 md:col-span-2 w-full h-80 bg-gray-200">
                            <img src="/work01.png" className="w-full h-full object-cover object-[20%_80%]" />
                        </div>
                        <div className="w-full h-80 bg-gray-200">
                            <img src="/work02.png" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5 mt-5">
                    <div className="col-span-1 md:col-span-2 w-full h-80 bg-gray-200">
                        <img src="/work05.png" className="w-full h-full object-cover object-[20%_80%]" />
                    </div>
                    <div className="w-full h-80 bg-gray-200">
                        <img src="/work03.png" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5 mt-5">
                    <div className="w-full h-80 bg-gray-200">
                        <img src="/work04.png" className="w-full h-full object-cover object-bottom" />
                    </div>
                    <div className="col-span-1 md:col-span-2 w-full h-80 bg-gray-200">
                        <img src="/work06.png" className="w-full h-full object-cover object-[20%_80%]" />
                    </div>
                </div>
            </div>
        </section>
    );
};