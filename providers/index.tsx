import { AppStateProvider } from "@/providers/app-state";
import { CustomCursor } from "@/components/global/custom-cursor";
import { FullscreenProvider } from "@/providers/fullscreen";
import { ScrollTrackerProvider } from "@/providers/scroll-tracker";
import { SmoothScrollProvider } from "@/providers/smooth-scroll";
import { WhatsappButton } from "@/components/global/whatsapp-button";
import { NextIntlClientProvider } from "next-intl";

type Props = {
    children: React.ReactNode;
}

export const Providers = (props: Props) => {
    return (
        <SmoothScrollProvider>
            <NextIntlClientProvider>
                <FullscreenProvider>
                    <ScrollTrackerProvider>
                        <CustomCursor />
                        <WhatsappButton />

                        {props.children}
                    </ScrollTrackerProvider>
                </FullscreenProvider>
            </NextIntlClientProvider>
        </SmoothScrollProvider>
    )
}