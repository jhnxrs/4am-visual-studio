"use client"

import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApplicationState } from '@/providers/application-state';

type Props = {
    children: React.ReactNode;
}

export const AnimationController = (props: Props) => {
    const { setDark } = useApplicationState();

    useGSAP(() => {
        const hero = document.querySelector("#hero");
        const heroOverlay = document.querySelector("#hero-overlay");
        const intro = document.querySelector("#intro");
        const introUpperText = document.querySelector("#intro-upper-text");

        if (!hero || !intro || !heroOverlay || !introUpperText) return;

        ScrollTrigger.create({
            trigger: hero,
            start: "top top",
            end: () => document.documentElement.scrollHeight - window.innerHeight,
            pin: true,
            pinSpacing: false,
        });

        ScrollTrigger.create({
            trigger: intro,
            start: "top 40%",
            onEnter: () => {
                setDark(true);

                gsap.to(heroOverlay, {
                    backgroundColor: "rgba(255,255,255,1)",
                    duration: 0.4,
                    ease: "power2.out",
                });
            },
            onLeaveBack: () => {
                setDark(false);

                gsap.to(heroOverlay, {
                    backgroundColor: "rgba(0,0,0,0.5)",
                    duration: 0.4,
                    ease: "power2.out",
                });
            },
        });

        ScrollTrigger.create({
            trigger: intro,
            start: "top 70%",
            onEnter: () => {
                gsap.to(introUpperText, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out",
                });
            },
            onLeaveBack: () => {
                gsap.to(introUpperText, {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                });
            },
        });
    });

    return (
        <div className='w-full h-dvh'>
            {props.children}
        </div>
    )
}