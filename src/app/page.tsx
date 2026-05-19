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
