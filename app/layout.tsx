import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const urbanistFont = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4AM Visual Studio",
  description: "4AM is an architectural visualization studio focused on delivering high-quality work that allows clients to fully engage with their projects.",
};

export const viewport: Viewport = {
  initialScale: 1,
  viewportFit: 'cover',
  width: 'device-width'
}

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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
