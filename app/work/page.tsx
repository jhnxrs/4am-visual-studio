import { LocaleSwitcher } from "@/components/locale-switcher";
import { WorkGallery } from "@/components/work-gallery";
import { getLocale } from "@/lib/get-locale";
import { getTranslations } from "next-intl/server";

export default async function Page() {
    const locale = await getLocale();
    const t = await getTranslations();

    return (
        <div className="w-full min-h-dvh h-full p-6 flex flex-col">
            <div className="w-full flex flex-row items-center justify-between">
                <img
                    src="/logo.png"
                    className="w-20 filter brightness-0"
                    alt="Logo"
                />

                <div className="flex flex-row items-center gap-6">
                    <div>
                        <LocaleSwitcher dark={true} locale={locale} />
                    </div>
                    <a
                        className="px-4 py-2 rounded-full text-white bg-black font-light text-sm cursor-pointer hover:bg-[#C55BF9] hover:text-black transition-all duration-200"
                        href="/"
                    >
                        {t("goHome")}
                    </a>
                </div>
            </div>

            <WorkGallery />
        </div>
    );
}