export const SUPPORTED_LOCALES = ["en", "pt"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export function assumeLanguage(
    acceptLanguage: string | null
): Locale {
    if (!acceptLanguage) return "en";

    const langs = acceptLanguage
        .toLowerCase()
        .split(",")
        .map(l => l.split(";")[0].trim());

    for (const lang of langs) {
        if (lang.startsWith("pt")) return "pt";
        if (lang.startsWith("en")) return "en";
    }

    return "en";
}