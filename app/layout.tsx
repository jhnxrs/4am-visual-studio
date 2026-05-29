import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import Script from "next/script";

const urbanistFont = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4AM Visual Studio",
  description: "4AM is an architectural visualization studio focused on delivering high-quality work that allows clients to fully engage with their projects.",
  other: {
    "facebook-domain-verification": [
      "92rr2ldydnowgletbsj7szrxuy1zs2",
      "mhz4hf5eae14ht6f2tgmocl9n162ww",
    ],
  }
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
        <Script
          id="facebookPixelZ"
          strategy="afterInteractive"
        >
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
              n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1228648222533357');
            fbq('track', 'PageView');
          `}
        </Script>

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
