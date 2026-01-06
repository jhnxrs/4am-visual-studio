import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

const urbanistFont = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4AM Visual Studio",
  description: "4AM is an architectural visualization studio focused on delivering high-quality work that allows clients to fully engage with their projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanistFont.variable} antialiased`}
      >
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
