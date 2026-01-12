"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useApplicationState } from "@/providers/application-state";

type Props = {
    locale: 'pt' | 'en';
}

export const Navbar = (props: Props) => {
    const { dark } = useApplicationState();
    const { locale } = props;

    useGSAP(() => {
        gsap.from(document.querySelector('#navbar-content'), {
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
        });
    }, []);

    return (
        <div className="fixed w-full z-50">
            <div
                className="w-full flex flex-row justify-between items-center p-6 bg-transparent data-[dark=true]:bg-white"
                data-dark={dark}
                id="navbar-content"
            >
                <img
                    src="/logo.png"
                    className="w-20 md:w-25 filter brightness-0 data-[dark=false]:invert transition-all duration-300"
                    alt="Logo"
                    data-dark={dark}
                />

                <div className="flex flex-row items-center gap-6">
                    <LocaleSwitcher locale={locale} dark={dark} />
                    <button
                        className="flex flex-col gap-2 cursor-pointer"
                    >
                        <div
                            className="w-4 h-0.5 md:w-6 md:h-1 bg-white data-[dark=true]:bg-black transition-all duration-300"
                            data-dark={dark}
                        />
                        <div
                            className="w-4 h-0.5 md:w-6 md:h-1 bg-white data-[dark=true]:bg-black transition-all duration-300"
                            data-dark={dark}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}