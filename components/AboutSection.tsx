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

          {/* SEO-rich content — screen-reader accessible, visually minimal */}
          <div className="sr-only">
            <h2>Best Production House in Delhi NCR — Digital Kalakaar Productions</h2>
            <p>
              Digital Kalakaar Productions is a top-rated video production company in New Delhi, India,
              serving brands across Delhi NCR (Noida, Gurugram, Gurgaon, Faridabad) and all of India since 2018.
              We are the best production house in Delhi for brand films, TVC commercials, Instagram reels,
              short films, micro dramas, documentaries, UGC videos, and voxpops.
            </p>
            <h3>Our Video Production Services in Delhi NCR</h3>
            <ul>
              <li>Brand Reels — Instagram and social media reel production in Delhi</li>
              <li>TVC Ads — TV commercial production Delhi NCR</li>
              <li>Storytelling Videos — brand narrative film production</li>
              <li>Short Films — cinematic short film production Delhi</li>
              <li>Micro Dramas — serialised short-form drama for social platforms</li>
              <li>Documentaries — documentary film production Delhi India</li>
              <li>UGC Videos — user-generated content creation agency Delhi</li>
              <li>Voxpops — street interview and opinion video production</li>
            </ul>
            <h3>Brands We Have Worked With</h3>
            <p>
              Astrotalk, Keventers, PolicyBazaar, Shaadi.com, Wellbeing Nutritions,
              The Indus Valley, MicroKahani, Vahaflix, Stage, BJP, Government of India,
              GoGoGo, Viralo, Athrox, TipTop, Crafto.
            </p>
            <p>
              Contact Delhi&apos;s best production house at digitalkalakaarproductions@gmail.com
              or call +91 88514 75517 for brand films, TVC production, reel production,
              short films, micro dramas, documentaries, and all video production services in Delhi NCR.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
