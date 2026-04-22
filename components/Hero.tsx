"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PARTICLES = [
  { id: 1, x: "11%",  y: "18%", size: 2.5, delay: 0.0, dur: 5.2 },
  { id: 2, x: "87%",  y: "14%", size: 2.0, delay: 1.2, dur: 4.8 },
  { id: 3, x: "74%",  y: "71%", size: 3.5, delay: 0.6, dur: 6.0 },
  { id: 4, x: "21%",  y: "67%", size: 2.0, delay: 2.1, dur: 5.5 },
  { id: 5, x: "51%",  y: "9%",  size: 2.5, delay: 0.9, dur: 4.6 },
  { id: 6, x: "34%",  y: "84%", size: 2.0, delay: 1.7, dur: 5.8 },
  { id: 7, x: "91%",  y: "54%", size: 3.0, delay: 0.3, dur: 5.1 },
  { id: 8, x: "7%",   y: "49%", size: 2.0, delay: 1.5, dur: 4.9 },
  { id: 9, x: "64%",  y: "29%", size: 2.0, delay: 2.4, dur: 5.6 },
  { id: 10, x: "41%", y: "61%", size: 2.5, delay: 0.7, dur: 5.3 },
  { id: 11, x: "58%", y: "88%", size: 2.0, delay: 3.0, dur: 4.7 },
  { id: 12, x: "28%", y: "35%", size: 1.5, delay: 1.9, dur: 6.2 },
];

function StackedTitle({ ready }: { ready: boolean }) {
  const productionLetters = "Productions".split("");

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline gap-[0.3em] md:gap-[0.42em]">
        <div className="overflow-hidden pb-[0.15em]">
          <motion.span
            className="block select-none text-cream/90"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(2.6rem, 8vw, 7.5rem)",
              letterSpacing: "0.06em",
              fontWeight: 300,
              lineHeight: 1,
            }}
            initial={{ y: "110%", skewY: 3 }}
            animate={ready ? { y: "0%", skewY: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Digital
          </motion.span>
        </div>

        <div className="overflow-hidden pb-[0.15em]">
          <motion.span
            className="block select-none text-gold italic"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.6rem, 8vw, 7.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
            initial={{ y: "110%", skewY: 3 }}
            animate={ready ? { y: "0%", skewY: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Kalakaar
            <motion.span
              className="not-italic text-cream/60"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              .
            </motion.span>
          </motion.span>
        </div>
      </div>

      {/* Gold rule */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent mt-5"
        style={{ width: "100%", transformOrigin: "center" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={ready ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Productions letter-by-letter */}
      <div className="flex items-center mt-4 overflow-hidden">
        {productionLetters.map((char, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              className="block select-none text-gold"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
                letterSpacing: "0.55em",
                fontWeight: 700,
                textTransform: "uppercase",
                lineHeight: 1,
              }}
              initial={{ y: "110%", opacity: 0 }}
              animate={ready ? { y: "0%", opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.9 + i * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        className="mt-8 text-cream/35 tracking-[0.25em] uppercase text-center"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(0.6rem, 1.3vw, 0.78rem)",
          fontWeight: 400,
        }}
        initial={{ opacity: 0, y: 14 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
      >
        Where Vision Meets Craft
      </motion.p>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const titleY        = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const titleOpacity  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const glowY         = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={containerRef}
      className="sticky top-0 w-full min-h-screen bg-[#0a0a0a] flex flex-col overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* ── Ambient gold glow — top-left ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-25%",
          left: "-18%",
          width: "75vw",
          height: "75vw",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.10) 0%, rgba(201,169,110,0.03) 45%, transparent 70%)",
          y: glowY,
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Ambient gold glow — bottom-right ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "-30%",
          right: "-22%",
          width: "65vw",
          height: "65vw",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.07) 0%, rgba(201,169,110,0.02) 50%, transparent 72%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* ── Noise texture ── */}
      <div className="noise-overlay absolute inset-0 pointer-events-none opacity-50" />

      {/* ── Bokeh particles ── */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: "rgba(201,169,110,0.55)",
            filter: "blur(0.5px)",
          }}
          animate={{ y: [0, -22, 0], opacity: [0, 0.8, 0] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Navbar spacer */}
      <div className="h-[77px] flex-shrink-0" />

      <div className="flex-1 flex flex-col px-4 md:px-8 pb-8">
        {/* ── Main cinematic stage ── */}
        <motion.div
          className="relative flex-1 min-h-[72vh] flex items-center justify-center overflow-hidden"
          style={{ borderRadius: "1.75rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Film-frame border */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              inset: "1.25rem",
              borderRadius: "1.3rem",
              border: "1px solid rgba(201,169,110,0.09)",
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Corner ornaments — TL, TR, BL, BR */}
          {(
            [
              { pos: "top-5 left-5",    bT: true,  bB: false, bL: true,  bR: false },
              { pos: "top-5 right-5",   bT: true,  bB: false, bL: false, bR: true  },
              { pos: "bottom-5 left-5", bT: false, bB: true,  bL: true,  bR: false },
              { pos: "bottom-5 right-5",bT: false, bB: true,  bL: false, bR: true  },
            ] as const
          ).map(({ pos, bT, bB, bL, bR }, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-5 h-5 pointer-events-none`}
              style={{
                borderTop:    bT ? "1px solid rgba(201,169,110,0.35)" : "none",
                borderBottom: bB ? "1px solid rgba(201,169,110,0.35)" : "none",
                borderLeft:   bL ? "1px solid rgba(201,169,110,0.35)" : "none",
                borderRight:  bR ? "1px solid rgba(201,169,110,0.35)" : "none",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}

          {/* Horizontal scan lines */}
          <motion.div
            className="absolute left-10 right-10 h-px pointer-events-none"
            style={{
              top: "28%",
              background:
                "linear-gradient(90deg, transparent, rgba(201,169,110,0.12) 30%, rgba(201,169,110,0.12) 70%, transparent)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.3, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute left-10 right-10 h-px pointer-events-none"
            style={{
              bottom: "28%",
              background:
                "linear-gradient(90deg, transparent, rgba(201,169,110,0.12) 30%, rgba(201,169,110,0.12) 70%, transparent)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.3, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Est. label */}
          <motion.div
            className="absolute top-7 left-7 z-[5]"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <span
              className="text-cream/22"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.6rem",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
              }}
            >
              Est. 2018 · New Delhi, India
            </span>
          </motion.div>

          {/* Central title — parallax */}
          <motion.div
            className="relative z-[3] flex flex-col items-center justify-center text-center px-6"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <StackedTitle ready={ready} />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 }}
          >
            <div className="w-7 h-11 rounded-full border border-cream/18 flex items-start justify-center pt-2">
              <motion.div
                className="w-[3px] h-2.5 rounded-full bg-gold"
                animate={{ y: [0, 14, 0], opacity: [1, 0.15, 1] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ── Bottom row ── */}
        <motion.div
          className="mt-5 flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-gold"
              animate={{ scale: [1, 1.7, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span
              className="text-white/70 hidden md:block"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
              }}
            >
              Award-Winning Production House
            </span>
          </div>

          <button
            onClick={() =>
              document.querySelector("#reel")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-2 text-gold/55 hover:text-gold transition-colors duration-300"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.65rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
            }}
          >
            View Work
            <motion.svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
