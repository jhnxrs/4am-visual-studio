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
                className="tracking-wide text-white data-[dark=true]:text-black text-xs cursor-pointer data-[active=true]:bg-white/10 data-[dark=true]:data-[active=true]:bg-black/10 data-[active=true]:backdrop-blur-sm px-1.5 py-0.5 rounded-md flex flex-row items-center gap-1"
                data-active={props.locale === 'pt'}
                data-dark={props.dark}
                onClick={() => onLanguageChange('pt')}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-2.5 h-2.5"
                >
                    <path
                        fill="#46b000"
                        stroke="#45413c"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M45 12.25h-6.32A45.9 45.9 0 0 1 24 9.88A45.7 45.7 0 0 0 9.37 7.5H3c-.58 0-1 .35-1 .79v26a.94.94 0 0 0 1 .79h6.37A46 46 0 0 1 24 37.46a45.6 45.6 0 0 0 14.65 2.38H45a.93.93 0 0 0 1-.79V13a.94.94 0 0 0-1-.75"
                        strokeWidth="1"
                    />
                    <path
                        fill="#ffe500"
                        stroke="#45413c"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M24 34.47s-3.55-2.77-7.59-6.11c-3.7-3.06-8-6.33-8-6.33S12 19.53 16.34 17S24 12.87 24 12.87s3.42 2.68 7.58 6c4.44 3.56 8 6.42 8 6.42s-3.8 2.71-8.05 5.19S24 34.47 24 34.47"
                        strokeWidth="1"
                    /><path
                        fill="#009fd9"
                        d="M18.319 25.225a6.99 5.92 74.78 1 0 11.425-3.108a6.99 5.92 74.78 1 0-11.425 3.108"
                    />
                    <path
                        fill="#fff"
                        d="M18.22 21.38a8 8 0 0 0-.22 1.71v.59a21.1 21.1 0 0 1 7.57.77a15.6 15.6 0 0 1 4.13 1.85a7.6 7.6 0 0 0 .3-2.05s0 0 0-.05a14.8 14.8 0 0 0-4.4-2a21.3 21.3 0 0 0-7.38-.82m2.52 4.78a.58.54 0 1 0 1.16 0a.58.54 0 1 0-1.16 0m3.15 2.61a.44.41 0 1 0 .88 0a.44.41 0 1 0-.88 0m-.44-1.66a.44.41 0 1 0 .88 0a.44.41 0 1 0-.88 0m3.75-5.78a.44.41 0 1 0 .88 0a.44.41 0 1 0-.88 0"
                    />
                    <path
                        fill="none"
                        stroke="#45413c"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.319 25.225a6.99 5.92 74.78 1 0 11.425-3.108a6.99 5.92 74.78 1 0-11.425 3.108"
                        strokeWidth="1"
                    />
                    <path
                        fill="#45413c"
                        d="M12.5 45.5a11.5 1.5 0 1 0 23 0a11.5 1.5 0 1 0-23 0"
                        opacity="0.15"
                    />
                </svg>

                PT
            </button>
            <span className="mx-1 text-white/20 data-[dark=true]:text-black/20" data-dark={props.dark}>/</span>
            <button
                className="tracking-wide text-white data-[dark=true]:text-black text-xs cursor-pointer data-[active=true]:bg-white/10 data-[dark=true]:data-[active=true]:bg-black/10 data-[active=true]:backdrop-blur-sm px-1.5 py-0.5 rounded-md flex flex-row items-center gap-2"
                data-active={props.locale === 'en'}
                data-dark={props.dark}
                onClick={() => onLanguageChange('en')}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-2.5 h-2.5"
                >
                    <path
                        fill="#fff"
                        stroke="#45413c"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M24 9.53A48.9 48.9 0 0 0 8.37 7H1.61a1 1 0 0 0-1.11.84v27.75a1 1 0 0 0 1.11.85h6.76A48.9 48.9 0 0 1 24 39h0a48.9 48.9 0 0 0 15.63 2.5h6.76c.61 0 1.11-.37 1.11-.84V12.91a1 1 0 0 0-1.11-.84h-6.76A48.6 48.6 0 0 1 24 9.53"
                        strokeWidth="1"
                    />
                    <path
                        fill="#ff6242"
                        stroke="#45413c"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M47.5 16.29h-7.87A48.9 48.9 0 0 1 24 13.76h0a48.9 48.9 0 0 0-15.63-2.54H.5V7.84A1 1 0 0 1 1.61 7h6.76A48.9 48.9 0 0 1 24 9.53h0a48.6 48.6 0 0 0 15.63 2.54h6.76a1 1 0 0 1 1.11.84Zm0 4.23h-7.87A48.9 48.9 0 0 1 24 18h0a48.9 48.9 0 0 0-15.63-2.55H.5v4.22h7.87A48.9 48.9 0 0 1 24 22.21h0a48.9 48.9 0 0 0 15.63 2.53h7.87Zm0 8.31h-7.87A48.9 48.9 0 0 1 24 26.3h0a48.9 48.9 0 0 0-15.63-2.54H.5V28h7.87A48.9 48.9 0 0 1 24 30.52h0a48.9 48.9 0 0 0 15.63 2.54h7.87ZM46.39 41.5c.61 0 1.11-.37 1.11-.84v-3.38h-7.87A48.9 48.9 0 0 1 24 34.75h0a48.6 48.6 0 0 0-15.63-2.54H.5v3.38a1 1 0 0 0 1.11.85h6.76A48.9 48.9 0 0 1 24 39h0a48.9 48.9 0 0 0 15.63 2.5Z"
                        strokeWidth="1"
                    />
                    <path
                        fill="#00b8f0"
                        stroke="#45413c"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.3 8.22A49.7 49.7 0 0 0 8.37 7H1.61a1 1 0 0 0-1.11.84v11.83h7.87a49.7 49.7 0 0 1 10.93 1.22Z"
                        strokeWidth="1"
                    />
                    <path
                        fill="#fff"
                        d="m4.72 9.46l.29.59a.16.16 0 0 0 .12.09l.66.1a.16.16 0 0 1 .09.27L5.4 11a.2.2 0 0 0 0 .15l.11.65a.17.17 0 0 1-.24.17l-.58-.31a.2.2 0 0 0-.15 0l-.59.31a.16.16 0 0 1-.23-.17l.11-.65a.17.17 0 0 0 0-.15l-.47-.46a.16.16 0 0 1 .09-.27l.65-.1a.18.18 0 0 0 .13-.09l.29-.59a.16.16 0 0 1 .2-.03m4.8 0l.29.59a.18.18 0 0 0 .12.09l.66.1a.16.16 0 0 1 .09.27l-.48.49a.2.2 0 0 0 0 .15l.11.65a.16.16 0 0 1-.23.17l-.59-.31a.2.2 0 0 0-.15 0l-.59.31a.16.16 0 0 1-.23-.17l.11-.65a.2.2 0 0 0 0-.15l-.48-.46a.16.16 0 0 1 .09-.27l.66-.1a.18.18 0 0 0 .12-.09l.29-.59a.16.16 0 0 1 .21-.03m4.77.99l.29.59a.16.16 0 0 0 .12.09l.65.09a.16.16 0 0 1 .09.28L15 12a.16.16 0 0 0-.05.14l.12.66a.17.17 0 0 1-.24.17l-.58-.31a.14.14 0 0 0-.15 0l-.59.31a.16.16 0 0 1-.23-.17l.11-.66a.16.16 0 0 0 0-.14l-.47-.46a.16.16 0 0 1 .09-.28l.65-.09a.16.16 0 0 0 .04-.17l.3-.59a.16.16 0 0 1 .29.04m-9.57 3.74l.29.59a.16.16 0 0 0 .12.09l.66.09a.17.17 0 0 1 .09.28l-.48.46a.18.18 0 0 0 0 .14l.11.65a.16.16 0 0 1-.24.17l-.58-.3a.14.14 0 0 0-.15 0l-.59.3a.16.16 0 0 1-.23-.17l.11-.65a.16.16 0 0 0 0-.14l-.47-.46a.17.17 0 0 1 0-.24l.64-.13a.18.18 0 0 0 .13-.09l.29-.59a.16.16 0 0 1 .3 0m4.8 0l.29.59a.18.18 0 0 0 .12.09l.66.09a.17.17 0 0 1 .09.28l-.48.46a.18.18 0 0 0 0 .14l.11.65a.16.16 0 0 1-.23.17l-.59-.3a.14.14 0 0 0-.15 0l-.59.3a.16.16 0 0 1-.23-.17l.11-.65a.18.18 0 0 0 0-.14l-.48-.46a.17.17 0 0 1 .01-.24l.66-.09a.18.18 0 0 0 .12-.09l.29-.59a.16.16 0 0 1 .29-.04m4.77.98l.29.6a.15.15 0 0 0 .12.08l.65.1a.15.15 0 0 1 .09.27l-.47.47a.15.15 0 0 0-.05.14l.12.65a.17.17 0 0 1-.24.17l-.58-.31a.2.2 0 0 0-.15 0l-.59.31a.16.16 0 0 1-.23-.17l.11-.65a.15.15 0 0 0 0-.14l-.47-.47a.15.15 0 0 1 .09-.27l.65-.1a.15.15 0 0 0 .12-.08l.3-.6a.16.16 0 0 1 .24 0"
                    />
                    <path
                        fill="#45413c"
                        d="M11 45.5a11.5 1.5 0 1 0 23 0a11.5 1.5 0 1 0-23 0"
                        opacity="0.15"
                    />
                </svg>

                EN
            </button>
        </div>
    )
}