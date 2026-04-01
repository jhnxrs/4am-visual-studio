"use client"

import { create } from "zustand";

interface Contract {
    theme: 'light' | 'dark';
    mobile: boolean;
    fullscreenUrl: string | null;
    screenY: number; /* 1 for each 100vh scrolled */
    locale: 'en' | 'pt';

    setTheme: (theme: 'light' | 'dark') => void;
    setMobile: (mobile: boolean) => void;
    setFullscreenUrl: (url: string | null) => void;
    setScreenY: (screenY: number) => void;
    setLocale: (locale: 'en' | 'pt') => void;
}

export const useAppState = create<Contract>((set) => ({
    theme: 'light',
    mobile: false,
    fullscreenUrl: null,
    screenY: 0,
    locale: 'en',

    setTheme: (theme) => set({ theme }),
    setMobile: (mobile) => set({ mobile }),
    setFullscreenUrl: (url) => set({ fullscreenUrl: url }),
    setScreenY: (screenY) => set({ screenY }),
    setLocale: (locale) => set({ locale }),
}));