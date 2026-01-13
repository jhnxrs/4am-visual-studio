"use client"

import { useTranslations } from "next-intl";

export default function NotFound() {
    const t = useTranslations();

    return (
        <div className="w-full min-h-dvh flex flex-col gap-6 p-12">
            <img
                src="/logo.png"
                className="w-40 filter brightness-0"
                alt="Logo"
            />
            <h2 className="text-lg md:text-2xl tracking-wide text-black">{t('404')}</h2>
            <a className="underline hover:opacity-80 cursor-pointer" href="/">{t('goHome')}</a>
        </div>
    );
}
