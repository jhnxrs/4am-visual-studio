"use client";

import { useApplicationState } from "@/providers/application-state";
import { useRef } from "react";

type Props = {
    src: string;
}

export const HoverVideo = (props: Props) => {
    const { setFullscreenUrl } = useApplicationState();
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = 0;
        video.play().catch(() => {
            // Safari may block play if something is off
        });
    };

    const handleMouseLeave = () => {
        const video = videoRef.current;
        if (!video) return;

        video.pause();
        video.currentTime = 0;
    };

    return (
        <video
            ref={videoRef}
            src={props.src}
            className="w-full cursor-pointer"
            muted
            playsInline
            preload="metadata"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setFullscreenUrl(props.src)}
            loop
            data-media={true}
        />
    );
}