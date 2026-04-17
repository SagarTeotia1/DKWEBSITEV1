"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const navItems = [
  { label: "Work",     href: "/work" },
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
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
    <footer ref={sectionRef} id="contact" className="relative bg-[#080808] overflow-hidden">

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
          {/* Left — Contact Section */}
          <div className="flex-1 max-w-lg">
            <p
              className="text-[0.9rem] text-white/40 leading-snug mb-8"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
            >
              Want to make something stellar? So do we.
            </p>

            <div className="flex flex-col gap-3">

              {/* ── Email ── */}
              <a
                href="mailto:digitalkalakaarproductions@gmail.com"
                className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#c9a84c]/35 hover:bg-[#c9a84c]/[0.05] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 group-hover:bg-[#c9a84c]/18 transition-colors duration-300 flex items-center justify-center flex-shrink-0">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[7px] tracking-[0.45em] uppercase text-white/25 mb-0.5" style={{ fontFamily: "var(--font-dm-sans)" }}>Email us</p>
                  <p className="text-[0.82rem] font-medium text-[#c9a84c] group-hover:text-[#f0ebe0] transition-colors duration-300 truncate" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    digitalkalakaarproductions@gmail.com
                  </p>
                </div>
                <svg className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-40 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {/* ── Phone number — shown once, shared by Call & WhatsApp ── */}
              <div className="px-1 pt-1 pb-0.5 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/[0.06]" />
                <span className="text-[1.15rem] font-semibold tracking-wider text-[#f0ebe0]/70" style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "0.06em" }}>
                  +91 88514 75517
                </span>
                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>

              {/* ── Call + WhatsApp — side by side ── */}
              <div className="grid grid-cols-2 gap-3">

                {/* Call */}
                <a
                  href="tel:+918851475517"
                  className="group flex flex-col items-center justify-center gap-2.5 py-4 px-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.06] active:scale-95 transition-all duration-250"
                >
                  <div className="w-11 h-11 rounded-full bg-white/[0.06] group-hover:bg-white/[0.12] transition-colors duration-300 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0ebe0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9A16 16 0 0 0 15.1 16.1l.98-.99a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span className="text-[8px] tracking-[0.4em] uppercase text-white/40 group-hover:text-white/70 transition-colors duration-300" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    Call Now
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/918851475517"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center gap-2.5 py-4 px-3 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/[0.04] hover:border-[#25D366]/45 hover:bg-[#25D366]/[0.1] active:scale-95 transition-all duration-250"
                >
                  <div className="relative w-11 h-11 rounded-full bg-[#25D366]/10 group-hover:bg-[#25D366]/22 transition-colors duration-300 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#25D366" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.372-.025-.521-.074-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.307 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    {/* online indicator */}
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#080808] animate-pulse" />
                  </div>
                  <span className="text-[8px] tracking-[0.4em] uppercase text-[#25D366]/50 group-hover:text-[#25D366]/80 transition-colors duration-300" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    WhatsApp
                  </span>
                </a>

              </div>

            </div>
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


      </div>

      {/* ════════════════ COMPANY NAME ════════════════ */}


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
        className="md:hidden text-center pb-4 text-[7px] tracking-[0.3em] uppercase text-white/12"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        © {year} Digital Kalakaar
      </p>

      {/* Credit line with enhanced styling */}
      <motion.div
        className="text-center pb-8 px-6"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.65 }}
      >
        <div className="inline-block">
          {/* Subtle background accent */}
          <div className="relative px-5 py-2.5 rounded-full border border-[#c9a84c]/15 bg-[#c9a84c]/[0.03] backdrop-blur-sm">
            <p
              className="text-[6.5px] tracking-[0.3em] uppercase text-white/22"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              Made &amp; maintained with ❤️ by{" "}
              <a
                href="https://sagarteotia.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a84c]/70 hover:text-[#c9a84c] font-semibold transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]"
              >
                SagarTeotia.in
              </a>
            </p>
          </div>
        </div>
      </motion.div>

    </footer>
  );
}
