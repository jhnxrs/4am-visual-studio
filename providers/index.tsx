import { ApplicationStateProvider } from "@/providers/application-state";
import { CustomCursor } from "@/providers/custom-cursor";
import { FullscreenProvider } from "@/providers/fullscreen";
import { SmoothScroll } from "@/providers/smooth-scroll";
import { WhatsappButton } from "@/providers/whatsapp-button";
import { NextIntlClientProvider } from "next-intl";

type Props = {
    children: React.ReactNode;
}

export const Providers = (props: Props) => {
    return (
        <SmoothScroll>
            <NextIntlClientProvider>
                <ApplicationStateProvider>
                    <FullscreenProvider>
                        <CustomCursor />
                        <WhatsappButton />
                        {props.children}
                    </FullscreenProvider>
                </ApplicationStateProvider>
            </NextIntlClientProvider>
        </SmoothScroll>
    )
}