"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const SERVICES = [
  {
    number: "01",
    title: "Storytelling Videos",
    tagline: "Narratives that move people",
    description:
      "Brand stories and emotional campaigns that forge authentic connections. We craft visual narratives that linger long after the screen goes dark.",
    video: "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
  },
  {
    number: "02",
    title: "Micro Dramas",
    tagline: "Short. Sharp. Unforgettable.",
    description:
      "Serialised short-form dramatic content engineered for social platforms. High-concept stories in compact formats that demand to be rewatched.",
    video: "https://videos.pexels.com/video-files/855370/855370-sd_640_360_25fps.mp4",
  },
  {
    number: "03",
    title: "TVC Ads",
    tagline: "Broadcast quality. Every frame.",
    description:
      "Television commercials built with cinematic precision. From concept to colour grade, we create spots that captivate mass audiences and drive action.",
    video: "https://videos.pexels.com/video-files/6990394/6990394-sd_640_360_24fps.mp4",
  },
  {
    number: "04",
    title: "Short Films",
    tagline: "Art with intention.",
    description:
      "Award-worthy short films that showcase vision, talent, and craft. Stories told with economy and impact — every second earns its place.",
    video: "https://videos.pexels.com/video-files/18675658/18675658-sd_640_360_30fps.mp4",
  },
  {
    number: "05",
    title: "Documentaries",
    tagline: "Truth, beautifully told.",
    description:
      "In-depth documentary productions exploring real stories with cinematic depth. Journalistic rigour meets visual artistry.",
    video: "https://videos.pexels.com/video-files/6990393/6990393-sd_640_360_24fps.mp4",
  },
  {
    number: "06",
    title: "UGC Videos",
    tagline: "Authentic. Scalable. Effective.",
    description:
      "User-generated-style content that feels native to the platform. Raw authenticity, strategic intent — the kind of content people actually share.",
    video: "https://videos.pexels.com/video-files/855369/855369-sd_640_360_25fps.mp4",
  },
  {
    number: "07",
    title: "Voxpops",
    tagline: "Real voices. Real impact.",
    description:
      "Street-style interviews and opinion captures that surface genuine reactions. Social proof in its most credible, compelling form.",
    video: "https://videos.pexels.com/video-files/7622850/7622850-sd_640_360_30fps.mp4",
  },
];

interface CardProps {
  service: (typeof SERVICES)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function ServiceCard({ service, index, total, scrollYProgress }: CardProps) {
  // Improved segment calculation for smoother animations
  const seg = 1 / (total + 1);
  const cardStart = index * seg;
  const nextCardStart = index < total - 1 ? (index + 1) * seg : 1;

  // Clamp all values to [0, 1]
  const yStart = Math.max(0, Math.min(cardStart - 0.05, 1));
  const yEnd = Math.max(0, Math.min(cardStart + 0.1, 1));
  const opacityStart = Math.max(0, Math.min(cardStart - 0.02, 1));
  const opacityEnd = Math.max(0, Math.min(cardStart + 0.15, 1));
  const scaleStart = Math.max(0, Math.min(nextCardStart - 0.08, 1));
  const scaleEnd = Math.max(0, Math.min(nextCardStart + 0.15, 1));

  // Staggered entrance: each card slides up smoothly
  const y = useTransform(
    scrollYProgress,
    [yStart, yEnd],
    index === 0 ? ["0%", "0%"] : ["120%", "0%"]
  );

  // Smooth opacity fade-in
  const opacity = useTransform(
    scrollYProgress,
    [opacityStart, opacityEnd],
    [index === 0 ? 1 : 0, 1]
  );

  // Aggressive scale as next card pushes it back
  const scale = useTransform(
    scrollYProgress,
    [scaleStart, scaleEnd],
    [1, index < total - 1 ? 0.82 : 1]
  );

  // Very aggressive dimming for background cards - much darker
  const brightness = useTransform(
    scrollYProgress,
    [scaleStart, scaleEnd],
    [
      "brightness(1)",
      index < total - 1 ? "brightness(0.25)" : "brightness(1)"
    ]
  );

  return (
    <motion.div
      style={{ 
        y, 
        opacity, 
        scale, 
        filter: brightness,
        zIndex: index + 1 
      }}
      className="absolute inset-0"
    >
      {/* Card shell — vertical stack on mobile, horizontal on desktop */}
      <div className="w-full h-full bg-[#0f0f0f] rounded-[1.5rem] md:rounded-[2rem] border border-cream/[0.08] overflow-hidden relative flex flex-col md:flex-row shadow-2xl">

        {/* Top gold hairline */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* ── Video Section (Top on Mobile, Right on Desktop) ── */}
        <div className="w-full md:w-2/5 h-64 md:h-full relative overflow-hidden flex-shrink-0 group">
          <video
            src={service.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Video overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/60 via-black/20 to-transparent" />

          {/* Play icon indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-14 h-14 rounded-full border border-cream/40 flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: "rgb(201, 169, 110)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-cream ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* ── Left: Content Section ── */}
        <div className="flex-1 flex flex-col justify-between p-6 md:p-10 lg:p-12">
          <div>
            {/* Number + rule */}
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span
                className="text-[10px] md:text-[11px] tracking-[0.55em] uppercase text-gold/60 font-medium flex-shrink-0"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {service.number}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            </div>

            {/* Title */}
            <h3
              className="text-cream leading-tight mb-3 md:mb-4"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {service.title}
            </h3>

            {/* Tagline */}
            <p
              className="text-gold/70 italic mb-5 md:mb-6 text-[0.9rem] md:text-[1rem]"
              style={{
                fontFamily: "var(--font-playfair)",
              }}
            >
              {service.tagline}
            </p>

            {/* Description */}
            <p
              className="text-cream/45 leading-[1.8] text-[0.85rem] md:text-[0.92rem]"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                maxWidth: "48ch",
              }}
            >
              {service.description}
            </p>
          </div>

          {/* Bottom row */}
          <div className="mt-8 md:mt-10 flex items-center justify-between">
            <motion.button
              className="flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-gold/50 hover:text-gold transition-colors duration-300 group"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              whileHover={{ x: 4 }}
            >
              Enquire
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            <span
              className="text-[10px] tracking-[0.3em] text-cream/15"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {index + 1}&thinsp;/&thinsp;{total}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative"
      style={{ height: `${SERVICES.length * 85 + 120}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col bg-[#0a0a0a] overflow-hidden">

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ── Section header ── */}
        <div className="relative z-10 flex-shrink-0 px-4 md:px-8 pt-12 md:pt-14 pb-4 md:pb-5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-5 md:mb-6">
              <div>
                <p
                  className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold/50 mb-2"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  What We Do
                </p>
                <h2
                  className="text-cream"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  Our{" "}
                  <span
                    className="text-gold italic"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Services
                  </span>
                </h2>
              </div>

              <p
                className="text-cream/25 text-[10px] text-right tracking-[0.08em]"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
              >
                Scroll to explore
              </p>
            </div>

            {/* Gold rule */}
            <div className="h-px bg-gradient-to-r from-gold/25 via-gold/10 to-transparent" />
          </div>
        </div>

        {/* ── Stacking cards ── */}
        <div className="relative z-10 flex-1 px-4 md:px-8 pb-5 overflow-hidden">
          <div className="relative h-full max-w-6xl mx-auto">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.number}
                service={service}
                index={i}
                total={SERVICES.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
