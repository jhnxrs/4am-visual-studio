"use client"

import { setLocale } from "@/lib/set-locale";
import { useRouter } from "next/navigation";

type Props = {
    locale: 'en' | 'pt';
    dark: boolean;
}

export const LocaleSwitcher = (props: Props) => {
    const router = useRouter();

    const onLanguageChange = (language: string) => {
        setLocale(language);
        router.refresh();
    }

    return (
        <div className="flex flex-row items-center gap-2">
            <button
                className="tracking-wide text-white data-[dark=true]:text-black text-xs cursor-pointer data-[active=true]:bg-white/10 data-[dark=true]:data-[active=true]:bg-black/10 data-[active=true]:backdrop-blur-sm px-1.5 py-0.5 rounded-md"
                data-active={props.locale === 'pt'}
                data-dark={props.dark}
                onClick={() => onLanguageChange('pt')}
            >
                🇧🇷 PT
            </button>
            <span className="mx-1 text-white/20">/</span>
            <button
                className="tracking-wide text-white data-[dark=true]:text-black text-xs cursor-pointer data-[active=true]:bg-white/10 data-[dark=true]:data-[active=true]:bg-black/10 data-[active=true]:backdrop-blur-sm px-1.5 py-0.5 rounded-md"
                data-active={props.locale === 'en'}
                data-dark={props.dark}
                onClick={() => onLanguageChange('en')}
            >
                🇺🇸 EN
            </button>
        </div>
    )
}