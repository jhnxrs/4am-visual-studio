import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Navbar } from "@/components/navbar";
import { Work } from "@/components/work";
import { Services } from "@/components/services";
import { GetInTouch } from "@/components/get-in-touch";
import { AnimationController } from "@/components/animation-controller";
import { getLocale } from "@/lib/get-locale";
import { Approach } from "@/components/approach";

export default async function Page() {
  const locale = await getLocale();

  return (
    <AnimationController>
      <Navbar locale={locale} />
      <Hero />
      <Intro />
      <Work />
      <Services />
      <Approach />
      <GetInTouch />
    </AnimationController>
  )
}