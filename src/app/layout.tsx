import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marer Sigorta — Sigortanız Sonsuz Güvende",
  description:
    "Bağımsız sigorta acentesi Marer Sigorta. 30+ sigorta şirketinin tekliflerini karşılaştırır, en uygununu sunar. Trafik, kasko, DASK, konut, sağlık, seyahat ve işyeri sigortalarında uzman desteği.",
  keywords: [
    "marer sigorta",
    "sigorta acentesi",
    "trafik sigortası",
    "kasko",
    "DASK",
    "konut sigortası",
    "sağlık sigortası",
    "tamamlayıcı sağlık",
    "seyahat sağlık",
    "işyeri sigortası",
  ],
  openGraph: {
    title: "Marer Sigorta — Sigortanız Sonsuz Güvende",
    description:
      "30+ sigorta şirketi arasından size en uygun teklifi 2 dakikada alın. Marer Sigorta ile fiyat ve teminat avantajı bir arada.",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
