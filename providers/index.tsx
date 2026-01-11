import { DarkNavbarProvider } from "@/providers/dark-navbar";
import { SmoothScroll } from "@/providers/smooth-scroll";
import { NextIntlClientProvider } from "next-intl";

type Props = {
    children: React.ReactNode;
}

export const Providers = (props: Props) => {
    return (
        <SmoothScroll>
            <NextIntlClientProvider>
                <DarkNavbarProvider>
                    {props.children}
                </DarkNavbarProvider>
            </NextIntlClientProvider>
        </SmoothScroll>
    )
}