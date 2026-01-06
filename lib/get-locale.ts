"use server"

import { cookies } from "next/headers"

type Output = 'pt' | 'en';

export const getLocale = async (): Promise<Output> => {
    const store = await cookies();
    const locale = store.get("locale")?.value || 'en';

    return locale as Output;
}