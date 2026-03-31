import { Navbar } from "@/components/navbar";
import { ApproachV2 } from "@/components/v2/approach";
import { GetInTouchV2 } from "@/components/v2/get-in-touch";
import { HeroV2 } from "@/components/v2/hero";
import { IntroV2 } from "@/components/v2/intro";
import { NavbarV2 } from "@/components/v2/navbar";
import { ServicesV2 } from "@/components/v2/services";
import { WorkV2 } from "@/components/v2/work";
import { getLocale } from "@/lib/get-locale";

export default async function Page() {
  const locale = await getLocale();

  return (
    <div className="w-full flex flex-col relative">
      <NavbarV2 locale={locale} />
      <HeroV2 />
      <IntroV2 />
      <WorkV2 locale={locale} />
      <ServicesV2 />
      <ApproachV2 locale={locale} />
      <GetInTouchV2 locale={locale} />
    </div>
  );
}