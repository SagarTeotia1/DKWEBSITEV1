"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const navItems = [
  { label: "Work",     href: "/work" },
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "mailto:hello@digitalkalakaar.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-5%" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] });
  const grainY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer ref={sectionRef} className="relative bg-[#080808] overflow-hidden">

      {/* ════════════════ CTA SECTION ════════════════ */}
      <div className="relative overflow-hidden pt-16 pb-0 px-6 md:px-14 lg:px-20">

        {/* Grain layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none select-none"
          style={{ y: grainY }}
        >
          {/* SVG grain */}
          <div
            className="absolute inset-[-20%] opacity-[0.055]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "300px 300px",
            }}
          />
          {/* Subtle warm center glow */}
          <div className="absolute top-0 left-[20%] w-[60%] h-[55%] rounded-full bg-[#c9a84c]/[0.04] blur-[160px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[40%] rounded-full bg-[#3a5c3a]/[0.05] blur-[120px]" />
        </motion.div>

        {/* ── Big headline ── */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full leading-[0.9] select-none"
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 700,
            fontSize: "clamp(3.5rem, 12vw, 11rem)",
            letterSpacing: "-0.03em",
            background: "linear-gradient(125deg, #7a6030 0%, #d4a843 10%, #f0e8c8 20%, #c8d4a0 28%, #5a7a50 36%, #4a6cd4 45%, #c84a4a 54%, #8a4ad4 62%, #d4a843 70%, #f0e8c8 78%, #c8d4a0 86%, #7a6030 100%)",
            backgroundSize: "400% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientShift 9s ease infinite",
          }}
        >
          Let&apos;s Shoot!
        </motion.h2>

        {/* ── Info row ── */}
        <motion.div
          className="relative z-10 mt-10 pb-20 md:pb-28 flex items-start justify-between"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.28 }}
        >
          {/* Left */}
          <div>
            <p
              className="text-[0.9rem] text-white/45 leading-snug"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
            >
              Want to make something stellar? So do we.
            </p>
            <a
              href="mailto:hello@digitalkalakaar.com"
              className="mt-1 inline-block text-[0.82rem] text-white/28 hover:text-[#c9a84c] transition-colors duration-300"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              hello@digitalkalakaar.com
            </a>
          </div>

          {/* Scroll-to-top */}
          <button
            onClick={scrollTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center text-white/25 hover:border-white/30 hover:text-white/60 transition-all duration-300 flex-shrink-0 mt-1"
          >
            <span className="text-sm leading-none">∧</span>
          </button>
        </motion.div>

        {/* ── Creative tagline above company name ── */}
        <motion.p
          className="relative z-10 text-center pb-14 md:pb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.88rem",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(240,235,224,0.22)",
            letterSpacing: "0.01em",
          }}
        >
          Creative-led. Production-smart.
        </motion.p>

      </div>

      {/* ════════════════ COMPANY NAME ════════════════ */}
      <motion.div
        className="text-center px-6 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
            letterSpacing: "-0.01em",
            fontWeight: 600,
            color: "#f0ebe0",
            opacity: 0.78,
            lineHeight: 1,
          }}
        >
          Digital Kalakaar
        </h3>
      </motion.div>

      {/* ════════════════ DIVIDER ════════════════ */}
      <div className="mx-6 md:mx-14 lg:mx-20 h-px bg-white/[0.08]" />

      {/* ════════════════ NAV BAR ════════════════ */}
      <motion.div
        className="px-6 md:px-14 lg:px-20 py-8 md:py-10 flex items-center justify-between"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.55 }}
      >
        {/* Nav links — evenly spaced across left 2/3 */}
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-3 md:gap-x-14 lg:gap-x-20">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative flex items-start gap-0.5"
            >
              <span
                className="text-[1.1rem] md:text-[1.9rem] lg:text-[2.1rem] font-serif text-[#f0ebe0]/65 group-hover:text-[#f0ebe0] transition-colors duration-300 leading-none"
                style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
              >
                {item.label}
              </span>
              {/* ↗ superscript arrow */}
              <span
                className="mt-1 text-[0.6rem] text-white/18 group-hover:text-[#c9a84c]/60 transition-colors duration-300 leading-none"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                ↗
              </span>
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p
          className="hidden md:block text-[7.5px] tracking-[0.3em] uppercase text-white/14 text-right"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          © {year} Digital Kalakaar
        </p>
      </motion.div>

      {/* Mobile copyright */}
      <p
        className="md:hidden text-center pb-8 text-[7px] tracking-[0.3em] uppercase text-white/12"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        © {year} Digital Kalakaar
      </p>

    </footer>
  );
}
