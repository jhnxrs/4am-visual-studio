import { ApplicationStateProvider } from "@/providers/application-state";
import { CustomCursor } from "@/providers/custom-cursor";
import { SmoothScroll } from "@/providers/smooth-scroll";
import { NextIntlClientProvider } from "next-intl";

type Props = {
    children: React.ReactNode;
}

export const Providers = (props: Props) => {
    return (
        <SmoothScroll>
            <NextIntlClientProvider>
                <ApplicationStateProvider>
                    <CustomCursor />
                    {props.children}
                </ApplicationStateProvider>
            </NextIntlClientProvider>
        </SmoothScroll>
    )
}