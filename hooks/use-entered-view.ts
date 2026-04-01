"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
    threshold?: number;
    rootMargin?: string;
};

export const useEnteredView = <T extends Element>(
    options: Options = {}
) => {
    const { threshold = 0.12, rootMargin = "0px 0px -8% 0px" } = options;

    const ref = useRef<T>(null);
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || entered) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                setEntered(true);
                observer.unobserve(element);
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [entered, rootMargin, threshold]);

    return { ref, entered };
};
