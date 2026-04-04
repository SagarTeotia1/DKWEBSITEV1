"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const headlines = [
  { text: "Creative-first.", gold: false, indent: false },
  { text: "Production-smart.", gold: false, indent: false },
  { text: "No fluff.", gold: true, indent: true },
];

const supportCopy = [
  "From ideation to post-production, we handle it all with obsessive attention to craft — cinematic sensibility in every frame.",
  "We are not just your production team — we are your thinking partner throughout.",
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 -mt-10 md:mt-0 mx-0 md:mx-4"
    >
      {/* Mobile: SVG arch paints parchment dome against the dark hero background */}
      <div className="md:hidden w-full" style={{ height: "80px" }}>
        <svg
          viewBox="0 0 390 80"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path fill="#f0ebe0" d="M0,80 C130,45 260,45 390,80 Z" />
        </svg>
      </div>

      {/* Content wrapper — has the parchment background */}
      <div className="relative bg-[#f0ebe0] overflow-hidden md:rounded-t-[2.5rem]">

        {/* Grain texture */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.022]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        <div className="relative z-10 px-6 md:px-12 lg:px-20">

          {/* Meta row */}
          <div className="pt-[150px] md:pt-[90px] pb-10 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="w-5 h-px bg-[#c9a84c] flex-shrink-0" />
              <span
                className="text-[9px] tracking-[0.55em] uppercase text-[#c9a84c]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                About Digital Kalakaar
              </span>
            </motion.div>
            <motion.p
              className="text-[9px] tracking-[0.45em] uppercase text-[#1a1514]/30 hidden md:block"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              initial={{ opacity: 0, x: 14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              New Delhi · Est. 2018
            </motion.p>
          </div>

          {/* Stacked headline */}
          <div className="pb-10 md:pb-14">
            {headlines.map(({ text, gold, indent }, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  className={`font-serif font-bold${gold ? " italic" : ""}${indent ? " pl-0 md:pl-[8vw]" : ""}`}
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(2rem, 5.5vw, 6rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    color: gold ? "#c9a84c" : "#1a1514",
                  }}
                  initial={{ y: "108%", skewY: 3 }}
                  animate={inView ? { y: "0%", skewY: 0 } : {}}
                  transition={{ duration: 1.05, delay: i * 0.12, ease: [0.16, 1.3, 0.4, 1] }}
                >
                  {text}
                </motion.h2>
              </div>
            ))}
          </div>

          {/* Body — lede + two-col support */}
          <div className="pb-20 md:pb-28">

            {/* Lede */}
            <motion.p
              className="text-[1.15rem] md:text-[1.3rem] text-[#1a1514]/75 leading-[1.8] mb-10 md:mb-12 max-w-3xl"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
            >
              Digital Kalakaar is a New Delhi-based production house founded on a single belief — every brand has a story worth telling beautifully.
            </motion.p>

            {/* Two-col support paragraphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-5">
              {supportCopy.map((para, i) => (
                <motion.p
                  key={i}
                  className="text-[0.92rem] md:text-[0.98rem] text-[#2c2723]/55 leading-[2]"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.85, delay: 0.65 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {para}
                </motion.p>
              ))}
            </div>


          </div>

        </div>
      </div>
    </section>
  );
}
