"use client";

export const isAndroidDevice = () => {
    if (typeof navigator === "undefined") return false;

    const ua = navigator.userAgent || navigator.vendor || "";
    return /Android/i.test(ua);
};
