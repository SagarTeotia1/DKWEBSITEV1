"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); // 0=count 1=reveal 2=exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => onComplete(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const letters = "kalakaar.".split("");

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
          />

          {/* Counter */}
          <motion.div
            className="absolute top-8 right-8 text-[11px] tracking-[0.3em] text-cream/20 tabular-nums font-mono"
            animate={{ opacity: phase >= 1 ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Loading
            </motion.span>
          </motion.div>

          {/* Stacked letter reveal */}
          <div className="flex items-end overflow-hidden">
            {letters.map((char, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  className={`block font-serif leading-none select-none ${
                    char === "." ? "text-gold" : "text-cream"
                  }`}
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(4rem, 14vw, 13rem)",
                    fontWeight: 700,
                  }}
                  initial={{ y: "110%" }}
                  animate={{ y: phase >= 0 ? "0%" : "110%" }}
                  transition={{
                    duration: 0.85,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden mt-4">
            <motion.p
              className="text-[11px] tracking-[0.45em] uppercase text-cream/30 text-center"
              initial={{ y: "100%" }}
              animate={{ y: phase >= 1 ? "0%" : "100%" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Complete Digital Kalakaar
            </motion.p>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: phase >= 1 ? "100%" : "40%" }}
            transition={{ duration: phase >= 1 ? 0.8 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
