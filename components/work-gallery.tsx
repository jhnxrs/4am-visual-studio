"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { workImages } from "@/lib/images";
import Image from "next/image";
import { useApplicationState } from "@/providers/application-state";

export const WorkGallery = () => {
    const { setFullscreenUrl } = useApplicationState();
    const t = useTranslations();
    const text = t("workPageTitle");

    const wordsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const words = wordsRef.current?.querySelectorAll("span");
        if (!words) return;

        gsap.fromTo(
            words,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                ease: "power3.out",
                stagger: 0.08,
                duration: 0.6,
            }
        );
    }, []);

    const columns = 3;

    const imagesByColumn = Array.from({ length: 3 }, (_, colIndex) =>
        workImages.filter((_, imgIndex) => imgIndex % columns === colIndex)
    );

    return (
        <>
            <div
                ref={wordsRef}
                className="relative flex flex-row items-center flex-wrap gap-2 pt-24"
            >
                {text.split(" ").map((word, index) => {
                    const isFirstWord = index === 0;

                    return (
                        <span
                            key={index}
                            data-first={isFirstWord}
                            className="text-nowrap text-2xl md:text-4xl tracking-wide text-black"
                        >
                            {word}
                        </span>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full h-full pt-24">
                {imagesByColumn.map((images, columnIndex) => {
                    return (
                        <div key={columnIndex} className="w-full flex flex-col gap-3">
                            {images.map((image, imageIndex) => {
                                return (
                                    <div key={imageIndex} className="relative w-full">
                                        <Image
                                            src={image}
                                            alt=""
                                            sizes="100vw"
                                            className="w-full h-auto cursor-pointer"
                                            data-media={true}
                                            onClick={() => setFullscreenUrl(image.src)}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </>
    );
}