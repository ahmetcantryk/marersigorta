import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Branches } from "@/components/Branches";
import { Why, How } from "@/components/WhyHow";
import { Partners } from "@/components/Trust";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Floating, ExitIntent } from "@/components/Floating";

export const metadata: Metadata = {
  title: "Marer Sigorta — Sigortanız Sonsuz Güvende | Bağımsız Sigorta Acentesi",
  description:
    "Marer Sigorta ile 30+ sigorta şirketinin tekliflerini karşılaştırın. Trafik, kasko, DASK, konut, sağlık, seyahat, işyeri ve filo sigortalarında bağımsız acente avantajı.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Marer Sigorta — Sigortanız Sonsuz Güvende",
    description:
      "30+ sigorta şirketinden en uygun teklifi sunan bağımsız acente. Bireysel ve kurumsal 14+ ürün, uzman destek, hızlı hasar süreci.",
    url: "/",
    type: "website",
    locale: "tr_TR",
    siteName: "Marer Sigorta",
  },
};

export default function HomePage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Partners />
        <Branches />
        <How />
        <Why />
        <About />
        <Contact />
      </main>
      <Footer />
      <Floating />
      <ExitIntent />
    </>
  );
}
