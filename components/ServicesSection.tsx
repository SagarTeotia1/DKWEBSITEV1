"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";

const SERVICES = [
  {
    number: "01",
    title: "Storytelling Videos",
    tagline: "Narratives that move people",
    description:
      "Brand stories and emotional campaigns that forge authentic connections. We craft visual narratives that linger long after the screen goes dark.",
    video:
      "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
  },
  {
    number: "02",
    title: "Micro Dramas",
    tagline: "Short. Sharp. Unforgettable.",
    description:
      "Serialised short-form dramatic content engineered for social platforms. High-concept stories in compact formats that demand to be rewatched.",
    video:
      "https://videos.pexels.com/video-files/855370/855370-sd_640_360_25fps.mp4",
  },
  {
    number: "03",
    title: "TVC Ads",
    tagline: "Broadcast quality. Every frame.",
    description:
      "Television commercials built with cinematic precision. From concept to colour grade, we create spots that captivate mass audiences and drive action.",
    video:
      "https://videos.pexels.com/video-files/6990394/6990394-sd_640_360_24fps.mp4",
  },
  {
    number: "04",
    title: "Short Films",
    tagline: "Art with intention.",
    description:
      "Award-worthy short films that showcase vision, talent, and craft. Stories told with economy and impact — every second earns its place.",
    video:
      "https://videos.pexels.com/video-files/18675658/18675658-sd_640_360_30fps.mp4",
  },
  {
    number: "05",
    title: "Documentaries",
    tagline: "Truth, beautifully told.",
    description:
      "In-depth documentary productions exploring real stories with cinematic depth. Journalistic rigour meets visual artistry.",
    video:
      "https://videos.pexels.com/video-files/6990393/6990393-sd_640_360_24fps.mp4",
  },
  {
    number: "06",
    title: "UGC Videos",
    tagline: "Authentic. Scalable. Effective.",
    description:
      "User-generated-style content that feels native to the platform. Raw authenticity, strategic intent — the kind of content people actually share.",
    video:
      "https://videos.pexels.com/video-files/855369/855369-sd_640_360_25fps.mp4",
  },
  {
    number: "07",
    title: "Voxpops",
    tagline: "Real voices. Real impact.",
    description:
      "Street-style interviews and opinion captures that surface genuine reactions. Social proof in its most credible, compelling form.",
    video:
      "https://videos.pexels.com/video-files/7622850/7622850-sd_640_360_30fps.mp4",
  },
];

interface CardProps {
  service: (typeof SERVICES)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  isActive: boolean;
}

function ServiceCard({ service, index, total, scrollYProgress, isActive }: CardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted,     setMuted]     = useState(true);
  const [buffering, setBuffering] = useState(true);
  const N = total;
  const seg = 1 / N;

  /*
   * Animation timing — the key fix:
   * Exit (scale + dim) starts only AFTER the next card has fully entered.
   * This eliminates the bleed-through where a scaled-down card is visible
   * around the edges of a partially-entered card.
   *
   * For card i:
   *   entryStart = i*seg - seg*0.30   (slide begins slightly before its turn)
   *   entryEnd   = i*seg + seg*0.12   (card fully settled)
   *   exitStart  = entryEnd of card (i+1) = (i+1)*seg + seg*0.12
   *   exitEnd    = exitStart + seg*0.25
   *
   * This guarantees a clean gap between entry completion and exit start.
   */
  const entryStart = Math.max(0, index * seg - seg * 0.3);
  const entryEnd = index * seg + seg * 0.12;

  const nextEntryEnd = (index + 1) * seg + seg * 0.12; // when next card finishes entering
  const exitStart = nextEntryEnd;
  const exitEnd = Math.min(1, exitStart + seg * 0.25);

  const isLast = index === total - 1;

  // Y — first card is always 0%; others slide up from 105%
  const y = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [entryStart, entryEnd],
    index === 0 ? ["0%", "0%"] : ["105%", "0%"]
  );

  // Scale — push back once NEXT card is fully in
  const scale = useTransform(
    scrollYProgress,
    [exitStart, exitEnd],
    [1, isLast ? 1 : 0.88]
  );

  // Brightness — aggressively dim when pushed back
  const brightnessVal = useTransform(
    scrollYProgress,
    [exitStart, exitEnd],
    [1, isLast ? 1 : 0.06]
  );
  const saturateVal = useTransform(
    scrollYProgress,
    [exitStart, exitEnd],
    [1, isLast ? 1 : 0.3]
  );
  const filter = useMotionTemplate`brightness(${brightnessVal}) saturate(${saturateVal})`;

  // Play/pause based on which card is active
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive, muted]);

  // Keep-alive + buffering events (only while active)
  useEffect(() => {
    if (!isActive) return;
    const video = videoRef.current;
    if (!video) return;

    setBuffering(true); // show spinner when this card becomes active

    const onWait    = () => setBuffering(true);
    const onPlaying = () => setBuffering(false);
    video.addEventListener("waiting", onWait);
    video.addEventListener("playing", onPlaying);

    const t = setInterval(() => {
      if (video.paused && !video.ended) video.play().catch(() => {});
    }, 800);

    return () => {
      clearInterval(t);
      video.removeEventListener("waiting", onWait);
      video.removeEventListener("playing", onPlaying);
    };
  }, [isActive]);

  return (
    <motion.div
      style={{ y, scale, filter, zIndex: index + 1 }}
      className="absolute inset-0"
    >
      <div className="w-full h-full rounded-[1.75rem] md:rounded-[2rem] overflow-hidden relative bg-[#0d0d0d] border border-cream/[0.05] shadow-[0_48px_96px_rgba(0,0,0,0.85)]">

        {/* Gold top hairline */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent z-20" />

        {/* ── Video: right 56% on desktop, top 42% on mobile ── */}
        <div
          className="absolute overflow-hidden
            inset-x-0 top-0 h-[42%]
            md:inset-y-0 md:right-0 md:h-auto md:w-[56%] md:left-auto"
        >
          <video
            ref={videoRef}
            src={service.video}
            muted={muted}
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />

          {/* Buffering spinner */}
          {buffering && isActive && (
            <div className="absolute inset-0 z-[20] flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#c9a84c] animate-spin" />
            </div>
          )}

          <button
            type="button"
            onClick={() => setMuted((prev) => !prev)}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="absolute bottom-4 right-4 z-[22] w-10 h-10 rounded-full bg-[#3f434c]/95 border border-white/10 flex items-center justify-center text-[#d7dbe2] hover:bg-[#4a4f5a] transition-colors duration-300"
          >
            {muted ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M11 5 6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M11 5 6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
          {/* Desktop: gradient bleeds left so text reads cleanly */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/55 to-transparent pointer-events-none" />
          {/* Mobile: gradient bleeds down */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d0d0d] pointer-events-none" />
          {/* Universal vignette on bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0d0d0d]/70 to-transparent pointer-events-none" />
        </div>

        {/* ── Watermark number — desktop only ── */}
        <div
          className="hidden md:block absolute bottom-2 right-[40%] select-none pointer-events-none z-[5] leading-none"
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(7rem, 13vw, 13rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.022)",
            letterSpacing: "-0.04em",
          }}
        >
          {service.number}
        </div>

        {/* ── Text content ── */}
        <div
          className="
            absolute z-10 flex flex-col justify-between
            inset-x-0 bottom-0 top-[36%] p-5
            md:inset-y-0 md:left-0 md:top-0 md:w-[52%] md:right-auto md:p-10 lg:p-14
          "
        >
          {/* Top block */}
          <div>
            {/* Number + rule */}
            <div className="flex items-center gap-4 mb-6 md:mb-10">
              <span
                className="text-[9px] md:text-[10px] tracking-[0.65em] uppercase text-gold/40 flex-shrink-0 font-medium"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {service.number}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
            </div>

            {/* Title */}
            <h3
              className="text-cream mb-2 md:mb-3 leading-[1.05]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.7rem, 3.2vw, 3rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
              }}
            >
              {service.title}
            </h3>

            {/* Tagline */}
            <p
              className="text-gold/55 italic mb-5 md:mb-7"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
              }}
            >
              {service.tagline}
            </p>

            {/* Short rule */}
            <div className="w-7 h-px bg-gold/20 mb-5 md:mb-7" />

            {/* Description */}
            <p
              className="text-cream/35 leading-[1.85]"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "clamp(0.78rem, 0.95vw, 0.875rem)",
                maxWidth: "43ch",
              }}
            >
              {service.description}
            </p>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-5 md:mt-0">
            <motion.button
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-2 text-[9px] md:text-[10px] tracking-[0.45em] uppercase text-gold/40 hover:text-gold transition-colors duration-300"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Enquire
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            <span
              className="tabular-nums text-cream/10"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
              }}
            >
              {String(index + 1).padStart(2, "0")}&thinsp;/&thinsp;
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Track which service is active for the header counter
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(
      Math.floor(v * SERVICES.length),
      SERVICES.length - 1
    );
    setActiveIndex(i);
  });

  // Gold progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative"
      style={{ height: `${SERVICES.length * 95 + 80}vh` }}
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

        {/* Ambient glow — follows active service subtly */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 75% 60%, rgba(201,169,110,0.04) 0%, transparent 70%)",
          }}
        />

        {/* ── Section header ── */}
        <div className="relative z-10 flex-shrink-0 px-4 md:px-8 pt-10 md:pt-12 pb-3">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-3 md:mb-4">
              {/* Left: label + title */}
              <div>
                <p
                  className="text-[9px] md:text-[10px] tracking-[0.55em] uppercase text-gold/40 mb-1.5"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  What We Do
                </p>
                <h2
                  className="text-cream"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
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

              {/* Right: live service counter */}
              <div className="text-right flex items-baseline gap-1.5">
                <motion.span
                  key={activeIndex}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="text-gold/50 tabular-nums"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                    fontStyle: "italic",
                  }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </motion.span>
                <span
                  className="text-cream/15 tabular-nums"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                  }}
                >
                  / {String(SERVICES.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Progress track */}
            <div className="h-px bg-cream/[0.07] overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: progressWidth,
                  background:
                    "linear-gradient(90deg, rgba(201,169,110,0.7) 0%, rgba(201,169,110,0.3) 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Stacking cards ── */}
        <div className="relative z-10 flex-1 px-4 md:px-8 pb-4 overflow-hidden">
          <div className="relative h-full max-w-6xl mx-auto">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.number}
                service={service}
                index={i}
                total={SERVICES.length}
                scrollYProgress={scrollYProgress}
                isActive={i === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
