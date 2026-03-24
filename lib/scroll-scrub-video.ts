"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScrollScrubVideoOptions = {
    section: HTMLElement;
    video: HTMLVideoElement;
    scrub?: number;
    isAndroid?: boolean;
};

export const setupScrollScrubVideo = ({
    section,
    video,
    scrub = 0.35,
    isAndroid = false,
}: ScrollScrubVideoOptions) => {
    video.muted = true;
    video.playsInline = true;
    video.loop = false;
    video.disablePictureInPicture = true;

    const playPromise = video.play();
    playPromise?.then(() => video.pause()).catch(() => { });

    let targetTime = 0;
    let rafId: number | null = null;
    let lastStepAt = 0;

    const maxFps = isAndroid ? 24 : 60;
    const minStepMs = 1000 / maxFps;
    const settleThreshold = isAndroid ? 1 / 24 : 0.01;

    const commitTime = (nextTime: number) => {
        const clampedTime = Math.max(0, Math.min(nextTime, video.duration || 0));

        if (
            isAndroid &&
            typeof video.fastSeek === "function" &&
            Math.abs(clampedTime - video.currentTime) > 0.2
        ) {
            try {
                video.fastSeek(clampedTime);
                return;
            } catch {
                // Fall back to currentTime if fastSeek is not available for this source.
            }
        }

        video.currentTime = clampedTime;
    };

    const update = (now: number) => {
        if (!video.duration || !Number.isFinite(video.duration)) {
            rafId = null;
            return;
        }

        if (now - lastStepAt < minStepMs) {
            rafId = requestAnimationFrame(update);
            return;
        }

        const delta = targetTime - video.currentTime;
        if (Math.abs(delta) < settleThreshold) {
            if (Math.abs(delta) > 0.001) {
                commitTime(targetTime);
            }

            rafId = null;
            lastStepAt = now;
            return;
        }

        const speed = isAndroid
            ? Math.abs(delta) > 0.25
                ? 0.55
                : Math.abs(delta) > 0.08
                    ? 0.4
                    : 0.28
            : Math.abs(delta) > 0.25
                ? 0.35
                : Math.abs(delta) > 0.08
                    ? 0.25
                    : 0.15;

        commitTime(video.currentTime + delta * speed);
        lastStepAt = now;
        rafId = requestAnimationFrame(update);
    };

    const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub,
        fastScrollEnd: true,
        onUpdate: (self) => {
            if (!video.duration || !Number.isFinite(video.duration)) return;

            const rawTargetTime = self.progress * video.duration;
            targetTime = isAndroid
                ? Math.round(rawTargetTime * 24) / 24
                : rawTargetTime;

            if (!rafId) {
                rafId = requestAnimationFrame(update);
            }
        },
    });

    return () => {
        trigger.kill();
        if (rafId) cancelAnimationFrame(rafId);
    };
};
