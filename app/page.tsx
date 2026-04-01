import { Approach } from "@/components/chunks/approach";
import { GetInTouch } from "@/components/chunks/get-in-touch";
import { Hero } from "@/components/chunks/hero";
import { Intro } from "@/components/chunks/intro";
import { Navbar } from "@/components/chunks/navbar";
import { Services } from "@/components/chunks/services";
import { Work } from "@/components/chunks/work";
import { getLocale } from "@/lib/get-locale";
import { AppStateProvider } from "@/providers/app-state";

export default async function Page() {
  const locale = await getLocale();

  return (
    <AppStateProvider locale={locale}>
      <div className="w-full flex flex-col relative">
        <Navbar />
        <Hero />
        <Intro />
        <Work />
        <Services />
        <Approach />
        <GetInTouch />
      </div>
    </AppStateProvider>
  );
}