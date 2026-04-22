"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

const SERVICES = [
  {
    number: "01",
    title: "Storytelling Videos",
    tagline: "Narratives that move people",
    description:
      "Brand stories and emotional campaigns that forge authentic connections. We craft visual narratives that linger long after the screen goes dark.",
  },
  {
    number: "02",
    title: "Micro Dramas",
    tagline: "Short. Sharp. Unforgettable.",
    description:
      "Serialised short-form dramatic content engineered for social platforms. High-concept stories in compact formats that demand to be rewatched.",
  },
  {
    number: "03",
    title: "TVC Ads",
    tagline: "Broadcast quality. Every frame.",
    description:
      "Television commercials built with cinematic precision. From concept to colour grade, we create spots that captivate mass audiences and drive action.",
  },
  {
    number: "04",
    title: "Short Films",
    tagline: "Art with intention.",
    description:
      "Award-worthy short films that showcase vision, talent, and craft. Stories told with economy and impact — every second earns its place.",
  },
  {
    number: "05",
    title: "Documentaries",
    tagline: "Truth, beautifully told.",
    description:
      "In-depth documentary productions exploring real stories with cinematic depth. Journalistic rigour meets visual artistry.",
  },
  {
    number: "06",
    title: "UGC Videos",
    tagline: "Authentic. Scalable. Effective.",
    description:
      "User-generated-style content that feels native to the platform. Raw authenticity, strategic intent — the kind of content people actually share.",
  },
  {
    number: "07",
    title: "Voxpops",
    tagline: "Real voices. Real impact.",
    description:
      "Street-style interviews and opinion captures that surface genuine reactions. Social proof in its most credible, compelling form.",
  },
];

/* ── Decorative right panel ── */
function ServiceVisual({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden select-none">

      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 55% 50%, rgba(201,169,110,0.09) 0%, transparent 68%)",
        }}
      />

      {/* Horizontal scan lines — 5 thin rules */}
      {[18, 34, 50, 66, 82].map((top) => (
        <div
          key={top}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            top: `${top}%`,
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,110,0.06) 20%, rgba(201,169,110,0.06) 80%, transparent)",
          }}
        />
      ))}

      {/* Vertical accent line — left edge */}
      <div
        className="absolute top-8 bottom-8 w-px left-8 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(201,169,110,0.18) 30%, rgba(201,169,110,0.18) 70%, transparent)",
        }}
      />

      {/* Giant number */}
      <div
        className="absolute pointer-events-none leading-none"
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-playfair)",
          fontWeight: 700,
          fontStyle: "italic",
          fontSize: "clamp(9rem, 22vw, 20rem)",
          letterSpacing: "-0.05em",
          background:
            "linear-gradient(135deg, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0.05) 60%, transparent 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          userSelect: "none",
        }}
      >
        {service.number}
      </div>

      {/* Tagline — centered below number */}
      <div className="absolute bottom-10 left-8 right-8 flex flex-col items-center gap-2">
        <div
          className="h-px w-8"
          style={{ background: "rgba(201,169,110,0.3)" }}
        />
        <p
          className="text-center px-4 py-1.5 rounded-full border border-gold/20"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 500,
            textTransform: "uppercase",
            fontSize: "clamp(0.62rem, 0.78vw, 0.72rem)",
            color: "rgba(201,169,110,0.68)",
            letterSpacing: "0.28em",
            background:
              "linear-gradient(180deg, rgba(201,169,110,0.12), rgba(201,169,110,0.02))",
          }}
        >
          {service.tagline}
        </p>
      </div>

      {/* Corner ornaments — TR and BL only */}
      <div
        className="absolute top-5 right-5 w-5 h-5"
        style={{
          borderTop: "1px solid rgba(201,169,110,0.25)",
          borderRight: "1px solid rgba(201,169,110,0.25)",
        }}
      />
      <div
        className="absolute bottom-5 left-5 w-5 h-5"
        style={{
          borderBottom: "1px solid rgba(201,169,110,0.25)",
          borderLeft: "1px solid rgba(201,169,110,0.25)",
        }}
      />
    </div>
  );
}

/* ── Individual slide ── */
interface SlideProps {
  service: (typeof SERVICES)[number];
  index: number;
  total: number;
  direction: number;
  onSwipeNext: () => void;
  onSwipePrev: () => void;
}

function ServiceSlide({
  service,
  index,
  total,
  direction,
  onSwipeNext,
  onSwipePrev,
}: SlideProps) {
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const swipeConfidenceThreshold = 8000;

  return (
    <motion.div
      key={service.number}
      className="absolute inset-0"
      custom={direction}
      variants={{
        enter: (dir: number) => ({
          x: dir > 0 ? 70 : -70,
          opacity: 0,
          scale: 0.98,
        }),
        center: {
          x: 0,
          opacity: 1,
          scale: 1,
        },
        exit: (dir: number) => ({
          x: dir > 0 ? -70 : 70,
          opacity: 0,
          scale: 0.98,
        }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        const swipe = swipePower(info.offset.x, info.velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
          onSwipeNext();
        } else if (swipe > swipeConfidenceThreshold) {
          onSwipePrev();
        }
      }}
    >
      <div className="w-full h-full rounded-[1.75rem] md:rounded-[2rem] overflow-hidden relative bg-[#0d0d0d] border border-cream/[0.05] shadow-[0_48px_96px_rgba(0,0,0,0.85)]">

        {/* Gold top hairline */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent z-20" />

        {/* ── Right: visual panel ── */}
        <div
          className="absolute overflow-hidden
            hidden md:block
            inset-y-0 right-0 w-[52%]"
        >
          <ServiceVisual service={service} />

          {/* Left-bleed gradient so text reads clean */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent pointer-events-none" />
        </div>

        {/* ── Watermark number — desktop only ── */}
        <div
          className="hidden md:block absolute bottom-2 right-[40%] select-none pointer-events-none z-[5] leading-none"
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(7rem, 13vw, 13rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.018)",
            letterSpacing: "-0.04em",
          }}
        >
          {service.number}
        </div>

        {/* ── Text panel ── */}
        <div
          className="
            absolute z-10 flex flex-col justify-between
            inset-0 p-7
            md:inset-y-0 md:left-0 md:w-[52%] md:right-auto md:p-10 lg:p-14
          "
        >
          {/* Top block */}
          <div>
            {/* Number + rule */}
            <div className="flex items-center gap-4 mb-7 md:mb-10">
              <span
                className="text-[9px] md:text-[10px] tracking-[0.65em] uppercase text-gold/40 flex-shrink-0"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
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
                fontSize: "clamp(1.7rem, 3vw, 2.8rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
              }}
            >
              {service.title}
            </h3>

            {/* Tagline */}
            <p
              className="text-gold/75 mb-6 md:mb-8 uppercase"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 500,
                fontSize: "clamp(0.64rem, 0.86vw, 0.76rem)",
                letterSpacing: "0.24em",
                textShadow: "0 0 16px rgba(201,169,110,0.2)",
              }}
            >
              {service.tagline}
            </p>

            {/* Short rule */}
            <div className="w-6 h-px bg-gold/20 mb-6 md:mb-8" />

            {/* Description */}
            <p
              className="text-cream/32 leading-[1.9]"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "clamp(0.78rem, 0.9vw, 0.85rem)",
                maxWidth: "42ch",
              }}
            >
              {service.description}
            </p>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-6 md:mt-0">
            <motion.button
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-2 text-gold/35 hover:text-gold transition-colors duration-300"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.6rem",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
              }}
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
                fontSize: "0.6rem",
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

/* ── Section ── */
export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const id = window.setInterval(() => {
      goNext();
    }, 6500);

    return () => window.clearInterval(id);
  }, [isPaused]);

  return (
    <section
      id="services"
      className="relative bg-[#0a0a0a] pt-0 pb-14 md:pb-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[86vh] min-h-[680px] md:h-[90vh] md:min-h-[760px] flex flex-col bg-[#0a0a0a] overflow-hidden">

        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Section header */}
        <div className="relative z-10 flex-shrink-0 px-4 md:px-8 pt-10 md:pt-12 pb-3">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-3 md:mb-4">

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
                  <span className="text-gold italic" style={{ fontFamily: "var(--font-playfair)" }}>
                    Services
                  </span>
                </h2>
              </div>

              {/* Live counter */}
              <div className="text-right flex items-baseline gap-1.5">
                <motion.span
                  key={activeIndex}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="text-gold/45 tabular-nums"
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
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                  }}
                >
                  / {String(SERVICES.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Progress track */}
            <div className="h-px bg-cream/[0.06] overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full"
                animate={{
                  width: `${((activeIndex + 1) / SERVICES.length) * 100}%`,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background:
                    "linear-gradient(90deg, rgba(201,169,110,0.65) 0%, rgba(201,169,110,0.28) 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Carousel slide */}
        <div className="relative z-10 flex-1 px-4 md:px-8 pb-4 overflow-hidden">
          <div className="relative w-full h-full min-h-[420px] md:min-h-[520px] max-w-6xl mx-auto">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <ServiceSlide
                key={SERVICES[activeIndex].number}
                service={SERVICES[activeIndex]}
                index={activeIndex}
                total={SERVICES.length}
                direction={direction}
                onSwipeNext={goNext}
                onSwipePrev={goPrev}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="relative z-20 px-4 md:px-8 pb-8 md:pb-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-gold/30 text-gold/70 hover:text-gold hover:border-gold/55 transition-colors duration-300 grid place-items-center"
                aria-label="Previous service"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={goNext}
                className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-gold/30 text-gold/70 hover:text-gold hover:border-gold/55 transition-colors duration-300 grid place-items-center"
                aria-label="Next service"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2" role="tablist" aria-label="Services pagination">
              {SERVICES.map((service, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={service.number}
                    type="button"
                    onClick={() => goToSlide(i)}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? "1.9rem" : "0.55rem",
                      background: isActive
                        ? "rgba(201,169,110,0.75)"
                        : "rgba(245,240,232,0.2)",
                    }}
                    aria-label={`Go to service ${i + 1}: ${service.title}`}
                    aria-current={isActive ? "true" : undefined}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
