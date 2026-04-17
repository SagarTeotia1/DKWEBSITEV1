"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  type PanInfo,
} from "framer-motion";

type Reel = {
  id: number;
  src: string;
  title: string;
  client: string;
  category: string;
  year: string;
};

const reels: Reel[] = [
  { id: 1, src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371219480-d1dd6a9f-69e9-4194-9254-24d1710d3329.MP4", title: "InstaQueen",   client: "InstaQueen",  category: "Brand Commercial", year: "2024" },
  { id: 2, src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371534571-380273bc-5588-4f3a-808b-6f51adef68ba.mp4", title: "Mera Husband", client: "Mera Husband", category: "Fashion Film",     year: "2023" },
  { id: 3, src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371344512-7bc45299-d1f8-4973-8f0a-a6473cc99f92.mp4", title: "Wellbing",     client: "Wellbing",    category: "Product Film",     year: "2024" },
  { id: 4, src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371711317-918364ec-ffb2-4e8e-ad79-e012af08a3cf.mp4", title: "Weellbeing",   client: "Weellbeing",  category: "Makeup Film",      year: "2023" },
  { id: 5, src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371876694-f0309dd5-635a-4a17-9cc3-8a696b6f3168.mp4", title: "Astrotalk",    client: "Astrotalk",   category: "Digital Content",  year: "2024" },
  { id: 6, src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776372090831-bc5f1238-f161-4d19-adf4-f02a22321508.mp4", title: "Keventers",    client: "Keventers",   category: "Social Content",   year: "2023" },
];

// ── Card ─────────────────────────────────────────────────────────────────────

function Card({
  reel,
  depth,
  isTop,
  onSwipe,
  playHint,
  onInteract,
  sectionVisible,
  isMobile,
}: {
  reel: Reel;
  depth: number;
  isTop: boolean;
  onSwipe: () => void;
  playHint?: number;
  onInteract?: () => void;
  sectionVisible: boolean;
  isMobile: boolean;
}) {
  const [muted,     setMuted]     = useState(true);
  const [buffering, setBuffering] = useState(true); // start true — show spinner until first play
  const x          = useMotionValue(0);
  const rotate     = useTransform(x, [-320, 320], [-18, 18]);
  const cardOpacity= useTransform(x, [-240, -90, 0, 90, 240], [0, 1, 1, 1, 0]);
  const watchBadge = useTransform(x, [35, 110], [0, 1]);
  const skipBadge  = useTransform(x, [-110, -35], [1, 0]);
  const idleOpacity= useTransform(x, [-50, 0, 50], [0, 1, 0]);

  // On mobile hide stacked cards behind top
  const hideStack = isMobile && depth > 0;
  const stackScale = hideStack ? 1      : ([1, 0.955, 0.91][depth]  ?? 0.91);
  const stackY     = hideStack ? 0      : ([0, 22, 44][depth]        ?? 44);
  const bgDim      = hideStack ? 0      : ([1, 0.6, 0.32][depth]    ?? 0.32);

  const videoRef = useRef<HTMLVideoElement>(null);

  // ── Show spinner whenever this card becomes the top card ───────────────
  useEffect(() => {
    if (isTop) setBuffering(true);
  }, [isTop]);

  // ── True-unmount cleanup ─────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (!video) return;
      video.pause();
      video.muted = true;
      // Do NOT set video.src = "" here — it prevents replay when scrolling back
    };
  }, []);

  // ── Primary play/pause control ──────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;

    if (!sectionVisible || !isTop) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }, [isTop, muted, sectionVisible]);

  // ── Keep-alive + buffering events ──────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const t = setInterval(() => {
      if (isTop && sectionVisible && video.paused && !video.ended) {
        video.play().catch(() => {});
      }
    }, 800);

    const onPause   = () => { if (isTop && sectionVisible) video.play().catch(() => {}); };
    const onWait    = () => setBuffering(true);
    // Only `playing` clears the spinner — canplay fires before actual playback starts
    const onPlaying = () => setBuffering(false);
    video.addEventListener("pause",   onPause);
    video.addEventListener("waiting", onWait);
    video.addEventListener("playing", onPlaying);

    return () => {
      clearInterval(t);
      video.removeEventListener("pause",   onPause);
      video.removeEventListener("waiting", onWait);
      video.removeEventListener("playing", onPlaying);
      // NO video.src = "" here — that only runs in the unmount effect above
    };
  }, [isTop, sectionVisible]);

  // ── Drag-hint wobble ────────────────────────────────────────────────────
  useEffect(() => {
    if (!playHint || !isTop) return;
    let cancelled = false;
    async function runHint() {
      if (cancelled) return;
      await animate(x, 78, { duration: 0.45, ease: [0.22, 1, 0.36, 1] });
      if (cancelled) return;
      await animate(x, 0, { type: "spring", stiffness: 260, damping: 20 });
      if (cancelled) return;
      await animate(x, -34, { duration: 0.32, ease: [0.22, 1, 0.36, 1] });
      if (cancelled) return;
      animate(x, 0, { type: "spring", stiffness: 300, damping: 26 });
    }
    runHint();
    return () => { cancelled = true; };
  }, [playHint]);

  // ── Double-tap/click → unmute + force play ──────────────────────────────
  const lastTapRef = useRef(0);
  function handleTap() {
    if (!isTop) return;
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      // double tap
      setMuted(false);
      videoRef.current?.play().catch(() => {});
    }
    lastTapRef.current = now;
  }

  async function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (!isTop) return;
    const far  = Math.abs(info.offset.x) > 80;
    const fast = Math.abs(info.velocity.x) > 400;
    if (far || fast) {
      await animate(x, info.offset.x > 0 ? 520 : -520, {
        duration: 0.26,
        ease: [0.4, 0, 1, 1],
      });
      // Kill audio synchronously before React re-renders the new top card
      const vid = videoRef.current;
      if (vid) { vid.pause(); vid.muted = true; }
      onSwipe();
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  }

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragStart={() => onInteract?.()}
      onDragEnd={handleDragEnd}
      onPointerDown={handleTap}
      style={{
        position: "absolute",
        inset: 0,
        scale: stackScale,
        y: stackY,
        zIndex: 30 - depth,
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? cardOpacity : (hideStack ? 0 : bgDim),
      }}
      className={isTop ? "cursor-grab active:cursor-grabbing touch-none" : "pointer-events-none"}
    >
      <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden bg-[#181410] shadow-[0_32px_64px_rgba(0,0,0,0.65)]">

        <video
          ref={videoRef}
          src={reel.src}
          muted={muted}
          loop
          playsInline
          autoPlay
          preload="auto"
          controls={false}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* buffering spinner — only on top card */}
        {isTop && buffering && (
          <div className="absolute inset-0 z-[7] flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[#c9a84c] animate-spin" />
          </div>
        )}

        {/* Mute button */}
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setMuted((prev) => !prev);
          }}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-5 right-5 z-[6] w-10 h-10 rounded-full bg-[#3f434c]/95 border border-white/10 flex items-center justify-center text-[#d7dbe2] hover:bg-[#4a4f5a] transition-colors duration-300"
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

        {/* Double-tap hint — mobile only, top card only */}
        {isTop && isMobile && muted && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[5]">
            <span
              className="text-[8px] tracking-[0.4em] uppercase text-white/25"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              double-tap to unmute
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-transparent to-black/30" />

        {/* Top row */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <span
            className="px-3 py-1 rounded-full border border-white/[0.12] bg-black/40 backdrop-blur-sm text-[7.5px] tracking-[0.42em] uppercase text-white/58"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {reel.category}
          </span>
          <span
            className="text-[7.5px] tracking-[0.35em] text-white/22"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {reel.year}
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <p
            className="text-[8px] tracking-[0.5em] uppercase text-[#c9a84c] mb-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {reel.client}
          </p>
          <h3
            className="font-serif italic text-[#f0ebe0]"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.2rem, 3.5vw, 1.6rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {reel.title}
          </h3>
          <div className="mt-5 flex items-center gap-2.5 opacity-[0.22]">
            <div className="h-px flex-1 bg-white" />
            <span
              className="text-[6.5px] tracking-[0.5em] uppercase text-white"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              swipe
            </span>
            <div className="h-px flex-1 bg-white" />
          </div>
        </div>

        {/* Direction badges */}
        {isTop && (
          <>
            <motion.div className="absolute top-[33%] right-5 rotate-[14deg]" style={{ opacity: watchBadge }}>
              <span className="block px-3 py-1.5 rounded-lg border-2 border-[#c9a84c] text-[#c9a84c] text-[8px] font-bold tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>
                LOVE ✦
              </span>
            </motion.div>
            <motion.div className="absolute top-[33%] left-5 -rotate-[14deg]" style={{ opacity: skipBadge }}>
              <span className="block px-3 py-1.5 rounded-lg border-2 border-white/20 text-white/35 text-[8px] font-bold tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>
                SKIP ×
              </span>
            </motion.div>
            <motion.div
              className="absolute top-[30%] left-0 right-0 flex justify-between px-5 pointer-events-none"
              style={{ opacity: idleOpacity }}
            >
              <div className="flex flex-col items-center gap-1 opacity-20">
                <span className="text-white text-xl">←</span>
                <span className="text-[6.5px] tracking-[0.45em] uppercase text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>skip</span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-20">
                <span className="text-white text-xl">→</span>
                <span className="text-[6.5px] tracking-[0.45em] uppercase text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>love</span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function ReelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView        = useInView(sectionRef, { once: true, margin: "-6%" });
  // Use a generous threshold so scrolling slightly away doesn't kill playback
  const sectionVisible = useInView(sectionRef, { amount: 0.05 });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [cards, setCards] = useState<number[]>(() => reels.map((_, i) => i).reverse());
  const done   = cards.length === 0;
  const viewed = reels.length - cards.length;

  const [hintCount, setHintCount] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  useEffect(() => {
    if (!inView || userInteracted || done) return;
    const t = setTimeout(() => setHintCount((c) => c + 1), 2000);
    return () => clearTimeout(t);
  }, [inView, userInteracted, done, hintCount]);

  function swipeCard() {
    if (done) return;
    setCards((prev) => prev.slice(0, -1));
    setHintCount(0);
  }
  function resetCards() {
    setCards(reels.map((_, i) => i).reverse());
    setHintCount(0);
    setUserInteracted(false);
  }

  const visibleCards = cards.slice(-3);

  // Card container dimensions
  const cardW = isMobile ? "calc(100vw - 40px)" : "min(320px, 82vw)";
  const cardH = isMobile
    ? "min(72svh, 520px)"
    : "clamp(490px, calc(82vw * 1.778 + 44px), 620px)";
  const innerH = isMobile
    ? "min(72svh, 520px)"
    : "clamp(446px, calc(82vw * 1.778), 576px)";

  return (
    <section
      ref={sectionRef}
      id="reel"
      className="relative bg-[#0a0a0a] z-20 overflow-hidden"
    >
      {/* Preload all videos — positioned off-screen, NOT display:none (Safari ignores hidden) */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none", top: -9999, left: -9999 }}
      >
        {reels.map((r) => (
          <video key={r.id} src={r.src} preload="auto" muted playsInline />
        ))}
      </div>

      <div className="h-px mx-6 md:mx-16 bg-white/[0.06]" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-20 py-20 md:py-28 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20 xl:gap-28">

          {/* ── LEFT: Text ── */}
          <motion.div
            className="flex-1 min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-5 inline-flex items-center gap-3 text-[9px] tracking-[0.55em] uppercase text-[#c9a84c]" style={{ fontFamily: "var(--font-dm-sans)" }}>
              <span className="w-5 h-px bg-[#c9a84c]" />
              Selected Work
            </p>

            <h2
              className="hidden md:block font-serif font-bold text-[#f0ebe0]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.6rem, 4.5vw, 5.2rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
              }}
            >
              Stories that{" "}
              <span style={{ color: "#c9a84c", fontStyle: "italic" }}>move</span>
              <br />people.
            </h2>

            <p
              className="hidden md:block mt-5 text-[0.875rem] leading-[1.9] text-white/30 max-w-[320px] lg:max-w-[280px]"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
            >
              Drag or swipe through our work — crafted frame by frame for brands that mean business.
            </p>

            <div className="mt-10">
              <a
                href="/work"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/[0.12] hover:border-[#c9a84c]/50 hover:bg-[#c9a84c]/[0.04] transition-all duration-300"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <span className="text-[8.5px] tracking-[0.45em] uppercase text-white/45 group-hover:text-[#c9a84c] transition-colors duration-300">
                  See Our Work
                </span>
                <span className="text-white/25 group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-300 text-sm">→</span>
              </a>
            </div>

            {!done && (
              <div className="mt-8 flex items-center gap-3">
                {reels.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:  i === viewed ? "22px" : "6px",
                      height: "6px",
                      background: i === viewed ? "#c9a84c" : "rgba(255,255,255,0.12)",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* ── RIGHT: Card stack ── */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center gap-3 lg:gap-5 order-1 lg:order-2"
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Skip — desktop only */}
            <button onClick={swipeCard} disabled={done} aria-label="Skip"
              className="hidden lg:flex flex-col items-center gap-1.5 group disabled:opacity-20 flex-shrink-0">
              <div className="w-12 h-12 rounded-full border border-white/[0.1] bg-white/[0.03] flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/[0.07] transition-all duration-300">
                <span className="text-white/40 group-hover:text-white/70 transition-colors text-base">✕</span>
              </div>
              <span className="text-[6.5px] tracking-[0.4em] uppercase text-white/20 group-hover:text-white/40 transition-colors" style={{ fontFamily: "var(--font-dm-sans)" }}>skip</span>
            </button>

            {/* Card container */}
            <div style={{ width: cardW, height: cardH, position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: innerH }}>
                {done ? (
                  <div className="absolute inset-0 rounded-[1.75rem] border border-white/[0.07] flex flex-col items-center justify-center gap-4 text-center px-10">
                    <p className="font-serif italic text-white/28 text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>That&apos;s a wrap.</p>
                    <p className="text-[8px] tracking-[0.5em] uppercase text-white/15" style={{ fontFamily: "var(--font-dm-sans)" }}>You&apos;ve seen it all</p>
                    <button
                      onClick={resetCards}
                      className="mt-1 px-5 py-2.5 rounded-full border border-[#c9a84c]/35 text-[#c9a84c] text-[8.5px] tracking-[0.45em] uppercase hover:bg-[#c9a84c]/10 transition-colors duration-300"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Watch Again
                    </button>
                  </div>
                ) : (
                  visibleCards.map((reelIndex, arrI) => {
                    const depth = visibleCards.length - 1 - arrI;
                    return (
                      <Card
                        key={reels[reelIndex].id}
                        reel={reels[reelIndex]}
                        depth={depth}
                        isTop={depth === 0}
                        onSwipe={() => { setCards((p) => p.slice(0, -1)); setHintCount(0); }}
                        playHint={depth === 0 ? hintCount : 0}
                        onInteract={() => setUserInteracted(true)}
                        sectionVisible={sectionVisible}
                        isMobile={isMobile}
                      />
                    );
                  })
                )}
              </div>
            </div>

            {/* Love — desktop only */}
            <button onClick={swipeCard} disabled={done} aria-label="Love it"
              className="hidden lg:flex flex-col items-center gap-1.5 group disabled:opacity-20 flex-shrink-0">
              <div className="w-12 h-12 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/[0.04] flex items-center justify-center group-hover:border-[#c9a84c]/60 group-hover:bg-[#c9a84c]/10 transition-all duration-300">
                <span className="text-[#c9a84c]/50 group-hover:text-[#c9a84c] transition-colors text-base">✦</span>
              </div>
              <span className="text-[6.5px] tracking-[0.4em] uppercase text-[#c9a84c]/30 group-hover:text-[#c9a84c]/60 transition-colors" style={{ fontFamily: "var(--font-dm-sans)" }}>love</span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
