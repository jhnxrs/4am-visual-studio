"use client";

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useSyncExternalStore,
    type ReactNode,
} from "react";

type ScrollSnapshot = {
    scrollY: number;
    screenY: number;
};

type ScrollStore = {
    subscribe: (listener: () => void) => () => void;
    getSnapshot: () => ScrollSnapshot;
    getServerSnapshot: () => ScrollSnapshot;
    start: () => void;
    stop: () => void;
};

const SERVER_SNAPSHOT: ScrollSnapshot = {
    scrollY: 0,
    screenY: 0,
};

function createScrollStore(): ScrollStore {
    let snapshot: ScrollSnapshot = SERVER_SNAPSHOT;

    let ticking = false;
    let started = false;

    const listeners = new Set<() => void>();

    const emit = () => {
        listeners.forEach((listener) => listener());
    };

    const getNextSnapshot = (): ScrollSnapshot => {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const viewportHeight = window.innerHeight || 1;

        return {
            scrollY,
            screenY: scrollY / viewportHeight,
        };
    };

    const updateScroll = () => {
        ticking = false;

        const nextSnapshot = getNextSnapshot();

        if (
            nextSnapshot.scrollY !== snapshot.scrollY ||
            nextSnapshot.screenY !== snapshot.screenY
        ) {
            snapshot = nextSnapshot;
            emit();
        }
    };

    const onScroll = () => {
        if (ticking) return;

        ticking = true;
        window.requestAnimationFrame(updateScroll);
    };

    const start = () => {
        if (started || typeof window === "undefined") return;
        started = true;

        snapshot = getNextSnapshot();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
    };

    const stop = () => {
        if (!started || typeof window === "undefined") return;
        started = false;

        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
    };

    return {
        subscribe(listener) {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
        getSnapshot() {
            return snapshot;
        },
        getServerSnapshot() {
            return SERVER_SNAPSHOT;
        },
        start,
        stop,
    };
}

const scrollStore = createScrollStore();

const ScrollContext = createContext<ScrollStore | null>(null);

type ScrollProviderProps = {
    children: ReactNode;
};

export function ScrollProvider({ children }: ScrollProviderProps) {
    const mountedRef = useRef(false);

    useEffect(() => {
        if (mountedRef.current) return;
        mountedRef.current = true;

        scrollStore.start();

        return () => {
            scrollStore.stop();
            mountedRef.current = false;
        };
    }, []);

    return (
        <ScrollContext.Provider value={scrollStore}>
            {children}
        </ScrollContext.Provider>
    );
}

export function useScroll() {
    const store = useContext(ScrollContext);

    if (!store) {
        throw new Error("useScroll must be used inside a ScrollProvider");
    }

    return useSyncExternalStore(
        store.subscribe,
        store.getSnapshot,
        store.getServerSnapshot
    );
}

export function useScrollY(): number {
    return useScroll().scrollY;
}

export function useScreenY(): number {
    return useScroll().screenY;
}