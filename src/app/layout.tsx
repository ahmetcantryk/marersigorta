import type { Metadata } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.marersigorta.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marer Sigorta — Sigortanız Sonsuz Güvende",
    template: "%s | Marer Sigorta",
  },
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
    "filo yönetimi sigortası",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Marer Sigorta — Sigortanız Sonsuz Güvende",
    description:
      "30+ sigorta şirketi arasından size en uygun teklifi sunan bağımsız acente. Marer Sigorta ile fiyat ve teminat avantajı bir arada.",
    url: SITE_URL,
    siteName: "Marer Sigorta",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/logo-marer.png",
        width: 1200,
        height: 630,
        alt: "Marer Sigorta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marer Sigorta — Sigortanız Sonsuz Güvende",
    description:
      "30+ sigorta şirketi arasından size en uygun teklifi sunan bağımsız acente.",
    images: ["/logo-marer.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
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
