import { AnimationController } from "@/providers/animation-controller";
import { ApplicationStateProvider } from "@/providers/application-state";
import { CustomCursor } from "@/providers/custom-cursor";
import { FullscreenProvider } from "@/providers/fullscreen";
import { ScrollProvider } from "@/providers/scroll-provider";
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
                        <ScrollProvider>
                            <AnimationController>
                                <CustomCursor />
                                <WhatsappButton />
                                {props.children}
                            </AnimationController>
                        </ScrollProvider>
                    </FullscreenProvider>
                </ApplicationStateProvider>
            </NextIntlClientProvider>
        </SmoothScroll>
    )
}