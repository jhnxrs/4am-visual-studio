export const Hero = () => {
    return (
        <main id="hero" className="w-full h-svh">
            <video
                src="/hero.mp4"
                muted
                playsInline
                autoPlay
                loop
                preload="auto"
                className="w-full h-svh object-cover object-[25%_75%]"
            />

            <div id="hero-overlay" className="absolute inset-0 w-full h-full bg-black/50" />
        </main>
    )
}