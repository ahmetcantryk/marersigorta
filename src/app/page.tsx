"use client";

import { useCallback, useRef } from "react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Branches } from "@/components/Branches";
import { Why, How } from "@/components/WhyHow";
import { Partners, Reviews } from "@/components/Trust";
import { About } from "@/components/About";
import { Claims } from "@/components/Claims";
import { FaqSection } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Floating, ExitIntent } from "@/components/Floating";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);

  const goToQuote = useCallback(() => {
    heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <TopBar />
      <Header onQuote={goToQuote} />
      <main>
        <Hero ref={heroRef} />
        <Partners />
        <Branches onQuote={goToQuote} />
        <Why />
        <How />
        <Reviews />
        <About />
        <Claims />
        <FaqSection />
        <Contact />
      </main>
      <Footer />
      <Floating />
      <ExitIntent onQuote={goToQuote} />
    </>
  );
}
