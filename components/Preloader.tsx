"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); // 0=brand reveal  1=productions reveal  2=exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 700);
    const t2 = setTimeout(() => setPhase(2), 2100);
    const t3 = setTimeout(() => onComplete(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const productionLetters = "Productions".split("");

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
          exit={{ y: "-100%", transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Top-left: Est. badge */}
          <motion.div
            className="absolute top-8 left-8 text-[10px] tracking-[0.45em] uppercase text-cream/20"
            style={{ fontFamily: "var(--font-dm-sans)" }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Est. 2018 · New Delhi
          </motion.div>

          {/* Top-right: Loading indicator */}
          <motion.div
            className="absolute top-8 right-8 text-[10px] tracking-[0.35em] uppercase font-mono text-cream/20"
            animate={{ opacity: phase >= 1 ? 0 : 1 }}
            transition={{ duration: 0.35 }}
          >
            Loading
          </motion.div>

          {/* ── Main brand block ── */}
          <div className="flex flex-col items-center">

            {/* "Digital Kalakaar" — two words, word-by-word reveal */}
            <div className="flex items-baseline gap-[0.35em] md:gap-[0.45em]">
              {/* Digital — DM Sans, light, wide-tracked */}
              <div className="overflow-hidden">
                <motion.span
                  className="block select-none text-cream/90 font-light"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "clamp(2.6rem, 8vw, 7.5rem)",
                    letterSpacing: "0.06em",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                  initial={{ y: "110%", skewY: 3 }}
                  animate={{ y: "0%", skewY: 0 }}
                  transition={{ duration: 1.0, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  Digital
                </motion.span>
              </div>

              {/* Kalakaar — Playfair italic, gold */}
              <div className="overflow-hidden">
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
                  animate={{ y: "0%", skewY: 0 }}
                  transition={{ duration: 1.0, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  Kalakaar
                  <motion.span
                    className="not-italic text-cream/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 0 ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    .
                  </motion.span>
                </motion.span>
              </div>
            </div>

            {/* Thin gold divider that draws in after both words land */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-5"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 1 : 0 }}
              style={{ width: "100%", transformOrigin: "center" }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* "Productions" — letter-by-letter reveal, small caps tracking */}
            <div className="flex items-center mt-4 overflow-hidden">
              {productionLetters.map((char, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className="block select-none text-cream/35"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "clamp(0.6rem, 1.4vw, 0.78rem)",
                      letterSpacing: "0.55em",
                      fontWeight: 400,
                      textTransform: "uppercase",
                      lineHeight: 1,
                    }}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{
                      y: phase >= 1 ? "0%" : "110%",
                      opacity: phase >= 1 ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.12 + i * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom-left: corner mark */}
          <motion.div
            className="absolute bottom-8 left-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span
              className="text-[9px] tracking-[0.5em] uppercase text-cream/15"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Premium Production House
            </span>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold/40 via-gold to-gold/40"
            initial={{ width: "0%" }}
            animate={{ width: phase >= 1 ? "100%" : "38%" }}
            transition={{
              duration: phase >= 1 ? 0.9 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
