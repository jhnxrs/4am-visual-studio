"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useApplicationState } from "@/providers/application-state";

type Props = {
    children: React.ReactNode;
};

export const FullscreenProvider = ({ children }: Props) => {
    const { fullscreenUrl, setFullscreenUrl } = useApplicationState();
    const isVideo = fullscreenUrl?.includes('mp4');

    useEffect(() => {
        if (fullscreenUrl) {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        };
    }, [fullscreenUrl]);

    return (
        <>
            {children}

            {fullscreenUrl && (
                <div className="fixed inset-0 z-9000 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-md"
                        onClick={() => setFullscreenUrl(undefined)}
                    />

                    <button
                        onClick={() => setFullscreenUrl(undefined)}
                        className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center text-xl hover:bg-black/90 transition"
                        aria-label="Close fullscreen"
                    >
                        ✕
                    </button>

                    <div
                        className="relative z-10 max-w-[95vw] max-h-[95vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isVideo && (
                            <video
                                src={fullscreenUrl}
                                className="
                                    max-w-[95vw]
                                    max-h-[95vh]
                                    w-auto
                                    h-auto
                                    object-contain
                                "
                                muted
                                playsInline
                                preload="metadata"
                                loop
                                autoPlay
                            />
                        )}

                        {!isVideo && (
                            <Image
                                src={fullscreenUrl}
                                alt="Fullscreen media"
                                width={1920}
                                height={1080}
                                priority
                                sizes="95vw"
                                className="
                                max-w-[95vw]
                                max-h-[95vh]
                                w-auto
                                h-auto
                                object-contain
                                select-none
                            "
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};