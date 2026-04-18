"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";

const AboutSection    = dynamic(() => import("@/components/AboutSection"),    { ssr: false });
const ClientsSection  = dynamic(() => import("@/components/ClientsSection"),  { ssr: false });
const ReelSection     = dynamic(() => import("@/components/ReelSection"),     { ssr: false });
const ServicesSection = dynamic(() => import("@/components/ServicesSection"), { ssr: false });
const Footer          = dynamic(() => import("@/components/Footer"),          { ssr: false });

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
