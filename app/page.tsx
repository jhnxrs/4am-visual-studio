import { LocaleSwitcher } from "@/components/home/locale-switcher";
import { getLocale } from "@/lib/get-locale";
import { getTranslations } from "next-intl/server"

export default async function Page() {
  const t = await getTranslations('home');
  const locale = await getLocale();

  return (
    <div className="w-screen h-full min-h-screen relative overflow-hidden">
      <video
        src="/hero.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-screen h-screen object-cover object-[25%_75%]"
        playsInline
      />

      <div className="absolute inset-0 w-screen h-screen z-2 bg-black/80" />

      <div className="w-screen h-screen relative flex flex-col justify-between z-20 p-8">
        <img
          src="/logo.png"
          className="w-20 md:w-25 filter brightness-0 invert"
        />

        <div className="absolute top-8 right-8 z-21">
          <LocaleSwitcher locale={locale} />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl text-white font-light md:font-thin --font-urbanist">{t('hero.title')}</h2>
          <p className="text-sm md:text-base text-white/60 font-normal md:font-light max-w-xl">{t('hero.caption')}</p>
        </div>

        <div className="hidden md:block absolute bottom-8 right-8 fill-white/20 animate-bounce">
          <svg
            className="w-10 h-10"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path
              d="M24 12c0-6.623-5.377-12-12-12s-12 5.377-12 12 5.377 12 12 12 12-5.377 12-12zm-1 0c0-6.071-4.929-11-11-11s-11 4.929-11 11 4.929 11 11 11 11-4.929 11-11zm-11.5 4.828l-3.763-4.608-.737.679 5 6.101 5-6.112-.753-.666-3.747 4.604v-11.826h-1v11.828z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}