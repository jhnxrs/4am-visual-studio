import { assumeLanguage } from '@/lib/assume-language';
import { NextResponse, NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const locale = request.cookies.get("locale")?.value;

    if (locale) {
        return NextResponse.next();
    }

    const acceptLanguage = request.headers.get("accept-language");
    const assumedLocale = assumeLanguage(acceptLanguage);

    const res = NextResponse.next();
    res.cookies.set(
        "locale",
        assumedLocale,
        {
            path: "/",
            maxAge: 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        }
    );

    return res;
}