"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ClientsSection from "@/components/ClientsSection";
import ReelSection from "@/components/ReelSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ClientsSection />
        <ReelSection />
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}