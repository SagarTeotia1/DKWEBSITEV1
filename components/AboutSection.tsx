"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

        <div className="relative z-10 px-6 md:px-8 lg:px-12 py-16 md:py-24 flex flex-col items-center">



          {/* Main Headline */}
          <div className="mb-8 md:mb-12 text-center max-w-4xl">
            <div className="overflow-hidden mb-4">
              <motion.h2
                className="font-serif font-bold"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "#1a1514",
                }}
                initial={{ y: "108%", skewY: 3 }}
                animate={inView ? { y: "0%", skewY: 0 } : {}}
                transition={{ duration: 1.05, delay: 0.1, ease: [0.16, 1.3, 0.4, 1] }}
              >
                About Digital Kalakaar
              </motion.h2>
            </div>
            
            {/* Divider line */}
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-gold/80 to-transparent mx-auto"
              style={{ width: "120px" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={inView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>



          {/* Main Content */}
          <div className="w-full max-w-3xl">

            {/* Intro Paragraph */}
            <motion.p
              className="text-center text-[1rem] md:text-[1.2rem] text-[#1a1514]/80 leading-[1.9] mb-12 md:mb-14"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Digital Kalakaar is a New Delhi-based production house founded on a single belief — <span className="text-[#c9a84c] font-medium">every brand has a story worth telling beautifully.</span>
            </motion.p>

            {/* Two Column Support */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute -left-4 top-0 w-1 h-12 bg-gold/40 rounded-full" />
                <p
                  className="text-[0.95rem] md:text-[1rem] text-[#2c2723]/70 leading-[1.85] pl-4"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                >
                  From ideation to post-production, we handle it all with obsessive attention to craft — cinematic sensibility in every frame.
                </p>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.77, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute -left-4 top-0 w-1 h-12 bg-gold/40 rounded-full" />
                <p
                  className="text-[0.95rem] md:text-[1rem] text-[#2c2723]/70 leading-[1.85] pl-4"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                >
                  We are not just your production team — we are your thinking partner throughout, transforming ideas into powerful stories.
                </p>
              </motion.div>
            </div>

            {/* Full Width Bottom Copy */}
            <motion.p
              className="text-center text-[0.95rem] md:text-[1rem] text-[#2c2723]/65 leading-[1.85]"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.89, ease: [0.22, 1, 0.36, 1] }}
            >
              Our team of skilled video editors and motion graphics artists crafts compelling visual narratives — from corporate and product videos to inspirational stories, films and micro-dramas. <span className="text-[#1a1514]/80 font-medium">We guarantee high-quality results, timely delivery, and a collaborative approach that brings each vision to life.</span>
            </motion.p>

          </div>

          {/* Social proof strip */}
          <motion.div
            className="w-full max-w-2xl mt-4 mb-2 grid grid-cols-3 gap-4 md:gap-8 border-t border-[#1a1514]/10 pt-8"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { value: "15M+", label: "Combined Followers" },
              { value: "200M+", label: "Monthly Views" },
              { value: "50+", label: "Brands Served" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-[#c9a84c]"
                  style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 700 }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-1 text-[10px] md:text-xs tracking-[0.15em] uppercase text-[#2c2723]/55"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* SEO/AEO/GEO content — visible, matches FAQPage JSON-LD 1:1 */}
          <motion.div
            className="w-full max-w-2xl mt-10 pt-8 border-t border-[#1a1514]/10"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3
              className="text-center text-[#1a1514]/85 mb-3"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.1rem,2vw,1.4rem)", fontWeight: 700 }}
            >
              Best Production House &amp; UGC Agency in Delhi NCR
            </h3>
            <p
              className="text-center text-[0.82rem] text-[#2c2723]/60 leading-[1.85] mb-5"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
            >
              Digital Kalakaar Productions is a top-rated video production house, UGC production house, and micro
              drama production house in New Delhi, serving brands across Delhi NCR (Noida, Gurugram, Gurgaon,
              Faridabad) and all of India since 2018 — brand reels, TVC ads, storytelling videos, short films,
              micro dramas, documentaries, UGC videos, and voxpops.
            </p>
            <p
              className="text-center text-[0.78rem] text-[#2c2723]/45 leading-[1.8]"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
            >
              Brands we&apos;ve worked with: Astrotalk, Keventers, PolicyBazaar, Shaadi.com, Wellbeing Nutritions,
              The Indus Valley, MicroKahani, Vahaflix, Stage, and Government of India campaigns.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
