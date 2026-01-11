"use client"

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

export const Work = () => {
    const t = useTranslations('work');
    const text = t('sectionText');
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const words = sectionRef.current?.querySelectorAll("span");
        const workContent = sectionRef.current?.querySelector("#work-content");

        if (!words || !workContent) return;

        gsap.set(words, { y: 40, opacity: 0 });
        gsap.set(workContent, { y: 60, opacity: 0 });

        const titleTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "40% 90%",
                scrub: true,
            },
        });

        titleTl.fromTo(
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
            workContent,
            {
                opacity: 0,
                y: 60,
            },
            {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: workContent,
                    start: "top 90%",
                    end: "40% 95%",
                    scrub: true,
                },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="w-screen py-32 px-12 flex flex-col relative bg-white z-20">
            <div className="relative w-full">
                <p className="absolute -top-4 left-0 text-black/80 tracking-wide text-xs">02<span className="text-black/40">//</span>{t('sectionTitle')}</p>
                <div className="flex flex-row items-center flex-wrap gap-0 leading-none md:gap-8">
                    {text.split(' ').map((word) => {
                        return (
                            <div key={word} className="flex flex-row items-center">
                                {word.split('').map((letter, index) => {
                                    return (
                                        <span key={index} className="text-black text-[50px] md:text-[120px] font-black">{letter}</span>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full flex flex-col mt-5 md:mt-0" id="work-content">
                <div className="w-full flex flex-col md:flex-row md:items-end gap-5">
                    <p className="max-w-sm text-black">{t('caption')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5">
                        <div className="col-span-1 md:col-span-2 w-full h-80 bg-gray-200">
                            {/* <img src="https://d23ujmhhbsujn2.cloudfront.net/b665c1cb-9916-4384-912c-da8ceb13ede8" className="w-full h-full object-cover" /> */}
                        </div>
                        <div className="w-full h-80 bg-gray-200">
                            {/* <img src="https://d23ujmhhbsujn2.cloudfront.net/8cc41963-16b6-4485-953a-2d18cd39dc62" className="w-full h-full object-cover" /> */}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5 mt-5">
                    <div className="col-span-1 md:col-span-2 w-full h-80 bg-gray-200">
                        {/* <img src="https://d23ujmhhbsujn2.cloudfront.net/965b854f-3631-4c54-8fd4-8a3e77ab173c" className="w-full h-full object-cover" /> */}
                    </div>
                    <div className="w-full h-80 bg-gray-200">
                        {/* <img src="https://d23ujmhhbsujn2.cloudfront.net/133bfac7-3060-4b08-a983-fb77811a0962" className="w-full h-full object-cover" /> */}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5 mt-5">
                    <div className="w-full h-80 bg-gray-200">
                        {/* <img src="https://d23ujmhhbsujn2.cloudfront.net/57e892d1-3a55-427a-849a-491e6f49d5fe" className="w-full h-full object-cover" /> */}
                    </div>
                    <div className="col-span-1 md:col-span-2 w-full h-80 bg-gray-200">
                        {/* <img src="https://d23ujmhhbsujn2.cloudfront.net/0e97834a-773c-4643-8794-baa8e9175c0a" className="w-full h-full object-cover" /> */}
                    </div>
                </div>
            </div>
        </section>
    )
}