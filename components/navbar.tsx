"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useApplicationState } from "@/providers/application-state";
import { useEffect, useState } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

type Props = {
    locale: "pt" | "en";
};

export const Navbar = ({ locale }: Props) => {
    const { dark } = useApplicationState();
    const [menuOpen, setMenuOpen] = useState(false);
    const [renderMenu, setRenderMenu] = useState(false);

    // NAVBAR FADE IN
    useGSAP(() => {
        gsap.from("#navbar-content", {
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
        });
    }, []);

    // MENU OPEN / CLOSE ANIMATION
    useEffect(() => {
        if (menuOpen) {
            setRenderMenu(true);

            requestAnimationFrame(() => {
                gsap.fromTo(
                    ".menu-overlay",
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.25,
                        ease: "power1.out",
                    }
                );

                gsap.fromTo(
                    ".menu-panel",
                    { xPercent: 100 },
                    {
                        xPercent: 0,
                        duration: 0.6,
                        ease: "power3.out",
                    }
                );
            });
        } else if (renderMenu) {
            gsap.to(".menu-panel", {
                xPercent: 100,
                duration: 0.4,
                ease: "power3.in",
            });

            gsap.to(".menu-overlay", {
                opacity: 0,
                duration: 0.25,
                ease: "power1.in",
                onComplete: () => setRenderMenu(false),
            });
        }
    }, [menuOpen, renderMenu]);

    const links = [
        { name: "Intro", href: "#intro" },
        { name: "Recent Projects", href: "#work" },
        { name: "Services", href: "#services" },
        { name: "Approach", href: "#approach" },
        { name: "Get In Touch", href: "#get-in-touch" },
    ];

    return (
        <>
            {renderMenu && (
                <div
                    className="menu-overlay fixed inset-0 z-999 bg-black/30 backdrop-blur-sm flex justify-end"
                    onClick={() => setMenuOpen(false)}
                >
                    <div
                        className="menu-panel w-[80%] md:w-[60%] lg:w-[40%] bg-[#eee] h-full flex flex-col items-center justify-center relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-5 right-5"
                        >
                            <svg
                                className="w-8 h-8"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
                                />
                            </svg>
                        </button>

                        <div className="flex flex-col mr-auto px-12 gap-12">
                            <img
                                src="/logo.png"
                                className="w-20 filter brightness-0"
                                alt="Logo"
                            />

                            <div className="flex flex-col gap-2">
                                {links.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="uppercase text-2xl font-semibold hover:opacity-50 transition"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setMenuOpen(false);

                                            gsap.to(window, {
                                                duration: 1,
                                                ease: "power3.inOut",
                                                scrollTo: link.href,
                                            });
                                        }}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="fixed w-full z-50">
                <div
                    id="navbar-content"
                    className="w-full flex justify-between items-center p-6 bg-transparent data-[dark=true]:bg-[#eee]"
                    data-dark={dark}
                >
                    <img
                        src="/logo.png"
                        className="w-20 filter brightness-0 data-[dark=false]:invert transition"
                        alt="Logo"
                        data-dark={dark}
                    />

                    <div className="flex items-center gap-6">
                        <LocaleSwitcher locale={locale} dark={dark} />

                        <button
                            className="flex flex-col gap-2"
                            onClick={() => setMenuOpen(true)}
                        >
                            <div className="w-6 h-1 bg-[#eee] data-[dark=true]:bg-black" data-dark={dark} />
                            <div className="w-6 h-1 bg-[#eee] data-[dark=true]:bg-black" data-dark={dark} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};