"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Brand Commercials",
    description: "High-impact commercials built for television, digital, and OOH. We translate brand strategy into visual narratives that drive recall and emotion.",
    tags: ["TVC", "Digital Ads", "OTT", "Social"],
    video: "https://lorem.video/720p",
  },
  {
    id: "02",
    title: "Fashion Films",
    description: "Cinematic fashion films that move beyond the lookbook. We collaborate with designers, stylists, and talent to capture the essence of a collection.",
    tags: ["Editorial", "Runway", "Campaign", "Lookbook"],
    video: "https://lorem.video/720p",
  },
  {
    id: "03",
    title: "Digital & Social Content",
    description: "Platform-native content engineered for engagement. Reels, shorts, and long-form pieces crafted with thumb-stopping visuals and tight storytelling.",
    tags: ["Instagram", "YouTube", "OTT", "Branded Content"],
    video: "https://lorem.video/720p",
  },
  {
    id: "04",
    title: "Corporate Films",
    description: "From investor presentations to internal culture films — we help organisations articulate their story with clarity, professionalism, and genuine emotion.",
    tags: ["Investor Decks", "Culture Films", "Events", "Training"],
    video: "https://lorem.video/720p",
  },
  {
    id: "05",
    title: "Music Videos",
    description: "Conceptually rich, visually immersive music videos that amplify an artist's universe. We bring creative directors, choreographers, and cinematographers together.",
    tags: ["Narrative", "Performance", "Lyric Videos", "EPK"],
    video: "https://lorem.video/720p",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleHover = (idx: number | null) => {
    setActive(idx);
    if (videoRef.current) {
      if (idx !== null) {
        videoRef.current.src = services[idx].video;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  };

  const headingLines = [
    { text: "Services" },
    { text: "& Craft.", gold: true },
  ];

  return (
    <section id="services" ref={ref} className="py-24 md:py-36 bg-[#0d0d0d] overflow-hidden">
      <div className="px-4 md:px-8 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="overflow-hidden mb-5">
              <motion.p
                className="text-xs tracking-[0.35em] uppercase text-gold/60"
                initial={{ y: "105%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                What We Do
              </motion.p>
            </div>
            {headingLines.map((line, i) => (
              <div key={i} className="overflow-hidden leading-[1.05]">
                <motion.div
                  initial={{ y: "105%", skewY: 3 }}
                  animate={inView ? { y: "0%", skewY: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className={`block text-[clamp(2.5rem,6vw,5rem)] font-serif font-bold leading-none ${line.gold ? "text-gold italic" : "text-cream"}`}
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {line.text}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Floating preview */}
          <motion.div
            className="hidden lg:block relative w-72 h-44 rounded-2xl overflow-hidden border border-white/5"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <video
              ref={videoRef}
              src={services[0].video}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: active !== null ? 1 : 0.25 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
            <AnimatePresence mode="wait">
              {active !== null && (
                <motion.p
                  key={active}
                  className="absolute bottom-4 left-4 text-xs tracking-widest uppercase text-gold/70"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {services[active].title}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Animated divider */}
        <div className="relative h-px mb-2">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gold/30 via-white/10 to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Service list */}
        <div className="mt-2">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className="group"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 * i + 0.4, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => handleHover(null)}
            >
              <div
                className={`py-7 border-b flex items-center gap-6 transition-colors duration-400 ${
                  active === i ? "border-gold/20" : "border-white/[0.05]"
                }`}
              >
                {/* Number */}
                <motion.span
                  className="text-xs tracking-[0.2em] w-8 flex-shrink-0 transition-colors duration-300"
                  animate={{ color: active === i ? "#c9a96e" : "rgba(245,240,232,0.2)" }}
                >
                  {service.id}
                </motion.span>

                {/* Title */}
                <h3
                  className={`text-[clamp(1.1rem,2.5vw,1.8rem)] font-serif flex-1 transition-all duration-300 ${
                    active === i ? "text-gold" : "text-cream/65 group-hover:text-cream/90"
                  }`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {service.title}
                </h3>

                {/* Description — visible on hover */}
                <AnimatePresence>
                  {active === i && (
                    <motion.p
                      className="hidden md:block text-sm text-cream/40 max-w-xs leading-relaxed flex-1"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {service.description}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Tags */}
                <div className="hidden md:flex gap-2 flex-wrap justify-end">
                  {service.tags.map((tag, ti) => (
                    <motion.span
                      key={tag}
                      className="text-[10px] tracking-widest uppercase px-2 py-1 rounded border transition-colors duration-300"
                      animate={{
                        borderColor: active === i ? "rgba(201,169,110,0.3)" : "rgba(245,240,232,0.06)",
                        color: active === i ? "rgba(201,169,110,0.65)" : "rgba(245,240,232,0.22)",
                      }}
                      transition={{ delay: ti * 0.04 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Animated arrow */}
                <motion.div
                  animate={{ x: active === i ? 0 : -8, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-shrink-0"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}