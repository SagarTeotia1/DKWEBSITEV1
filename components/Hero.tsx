"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_VIDEO = "https://lorem.video/720p";

// Stacked word reveal — mirrors Preloader layout exactly
function StackedTitle({ ready }: { ready: boolean }) {
  const productionLetters = "Productions".split("");

  return (
    <div className="flex flex-col items-center">

      {/* "Digital Kalakaar" — two words side by side, Preloader-style */}
      <div className="flex items-baseline gap-[0.3em] md:gap-[0.42em]">

        {/* Digital — DM Sans light, wide-tracked */}
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

        {/* Kalakaar — Playfair italic gold */}
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

      {/* Thin gold divider — draws in after words land */}
      <motion.div
        className="h-1 bg-gradient-to-r from-transparent via-gold/80 to-transparent mt-4"
        style={{ width: "100%", transformOrigin: "center" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={ready ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* "Productions" — letter-by-letter reveal, small-caps tracking */}
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
    </div>
  );
}



export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section
      ref={containerRef}
      className="sticky top-0 w-full min-h-screen bg-[#0a0a0a] flex flex-col overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div className="h-[77px] flex-shrink-0" />

      <div className="flex-1 px-4 md:px-8 pb-8 flex flex-col">
        {/* ── Video container ── */}
        <motion.div
          className="relative w-full flex-1 min-h-[58vh] md:min-h-[80vh] overflow-hidden"
          style={{ borderRadius: "1.75rem" }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Parallax video */}
          <motion.div className="absolute inset-0 scale-[1.12]" style={{ y: videoY }}>
            <video
              ref={videoRef}
              src={HERO_VIDEO}
              autoPlay
              muted={muted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>



          {/* ── Stacked title (parallax) ── */}
          <motion.div
            className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-6"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <StackedTitle ready={ready} />
           
          </motion.div>

          {/* Corner label */}
          <motion.div
            className="absolute top-5 left-5 z-[5]"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-cream/25">
              Est. 2018 · New Delhi, India
            </span>
          </motion.div>

          {/* Mute toggle */}
          <motion.button
            onClick={toggleMute}
            className="absolute bottom-5 right-5 z-[5] w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:border-gold/40 transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.4, ease: "backOut" }}
          >
            {muted ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cream/50">
                <path d="M11 5 6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                <path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </motion.button>

          {/* Mouse scroll indicator */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <div className="w-7 h-11 rounded-full border border-cream/20 flex items-start justify-center pt-2">
              <motion.div
                className="w-1 h-2.5 rounded-full bg-gold"
                animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ── Bottom row ── */}
        <motion.div
          className="mt-5 flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-gold"
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="text-[11px] tracking-[0.25em] uppercase text-white hidden md:block">
              Award-Winning Production House
            </span>
          </div>

          <button
            onClick={() => document.querySelector("#reel")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-gold/60 hover:text-gold transition-colors duration-300"
          >
            View Work
            <motion.svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
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
