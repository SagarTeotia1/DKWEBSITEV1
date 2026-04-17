"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Project = {
  id: number;
  src: string;
  title: string;
  client: string;
  category: string;
  year: string;
};

const projects: Project[] = [
  { id: 1, src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371219480-d1dd6a9f-69e9-4194-9254-24d1710d3329.MP4", title: "InstaQueen",   client: "InstaQueen",  category: "Brand Commercial", year: "2024" },
  { id: 2, src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371534571-380273bc-5588-4f3a-808b-6f51adef68ba.mp4", title: "Mera Husband", client: "Mera Husband", category: "Fashion Film",    year: "2023" },
  { id: 3, src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371344512-7bc45299-d1f8-4973-8f0a-a6473cc99f92.mp4", title: "Wellbing",     client: "Wellbing",    category: "Product Film",    year: "2024" },
  { id: 4, src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371711317-918364ec-ffb2-4e8e-ad79-e012af08a3cf.mp4", title: "Weellbeing",   client: "Weellbeing",  category: "Makeup Film",     year: "2023" },
  { id: 5, src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371876694-f0309dd5-635a-4a17-9cc3-8a696b6f3168.mp4", title: "Astrotalk",    client: "Astrotalk",   category: "Digital Content", year: "2024" },
  { id: 6, src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776372090831-bc5f1238-f161-4d19-adf4-f02a22321508.mp4", title: "Keventers",    client: "Keventers",   category: "Social Content",  year: "2023" },
];

const categories = ["All", "Brand Commercial", "Fashion Film", "Product Film", "Makeup Film", "Digital Content", "Social Content"];

// ─────────────────────────────────────────────────────────────────────────────
// SHARED: mute svg icons
// ─────────────────────────────────────────────────────────────────────────────
function MuteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}
function UnmuteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE: Instagram-style reel item
// ─────────────────────────────────────────────────────────────────────────────
function ReelItem({ project, index, total }: { project: Project; index: number; total: number }) {
  const wrapRef     = useRef<HTMLDivElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const [muted, setMuted]         = useState(true);
  const [paused, setPaused]       = useState(false);
  const [progress, setProgress]   = useState(0);
  const [buffering, setBuffering] = useState(false);
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.muted = muted;
        video.play().catch(() => {});
        keepAliveRef.current = setInterval(() => {
          if (video.paused && !video.ended && !paused) video.play().catch(() => {});
        }, 800);
      } else {
        clearInterval(keepAliveRef.current ?? undefined);
        video.pause();
        video.muted = true;
        video.currentTime = 0;
        setMuted(true);
        setPaused(false);
        setProgress(0);
        setBuffering(false);
      }
    }, { threshold: 0.7 });
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearInterval(keepAliveRef.current ?? undefined);
      video.pause();
      video.muted = true;
    };
  }, []); // eslint-disable-line

  useEffect(() => { if (videoRef.current) videoRef.current.muted = muted; }, [muted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime    = () => { if (video.duration) setProgress(video.currentTime / video.duration); };
    const onWait    = () => setBuffering(true);
    const onResume  = () => setBuffering(false);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("waiting",    onWait);
    video.addEventListener("playing",    onResume);
    video.addEventListener("canplay",    onResume);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("waiting",    onWait);
      video.removeEventListener("playing",    onResume);
      video.removeEventListener("canplay",    onResume);
    };
  }, []);

  const lastTapRef = useRef(0);
  function handleTap() {
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      setMuted(false);
      videoRef.current?.play().catch(() => {});
      setPaused(false);
    } else {
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) { video.play().catch(() => {}); setPaused(false); }
      else              { video.pause(); setPaused(true); }
    }
    lastTapRef.current = now;
  }

  return (
    <div
      ref={wrapRef}
      className="relative w-full flex-shrink-0 bg-black"
      style={{ height: "100svh", scrollSnapAlign: "start" }}
    >
      <video ref={videoRef} src={project.src} muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover" />

      {/* tap zone */}
      <div className="absolute inset-0 z-[2] cursor-pointer" onClick={handleTap} />

      {/* gradient */}
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/85 via-black/10 to-black/40" />

      {/* buffering spinner */}
      <AnimatePresence>
        {buffering && !paused && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-[6] flex items-center justify-center pointer-events-none"
          >
            <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[#c9a84c] animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* progress */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-[10] h-[2px] bg-white/10">
        <div className="h-full bg-[#c9a84c]" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* top-left */}
      <div className="absolute top-5 left-5 z-[10] flex items-center gap-3">
        <Link href="/" onClick={(e) => e.stopPropagation()}
          className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <span className="text-[7px] tracking-[0.45em] uppercase text-white/30" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Digital Kalakaar
        </span>
      </div>

      {/* counter */}
      <div className="absolute top-5 right-5 z-[10]">
        <span className="text-[7px] tracking-[0.35em] text-white/25" style={{ fontFamily: "var(--font-dm-sans)" }}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* right actions */}
      <div className="absolute right-4 bottom-32 z-[10] flex flex-col items-center gap-5">
        <button type="button" onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
          className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
          aria-label={muted ? "Unmute" : "Mute"}>
          {muted ? <MuteIcon /> : <UnmuteIcon />}
        </button>
        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]/60" />
      </div>

      {/* pause overlay */}
      <AnimatePresence>
        {paused && (
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
                <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {muted && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[4] pointer-events-none">
          <span className="text-[8px] tracking-[0.4em] uppercase text-white/20" style={{ fontFamily: "var(--font-dm-sans)" }}>
            double-tap to unmute
          </span>
        </div>
      )}

      {/* bottom info */}
      <div className="absolute bottom-0 left-0 right-14 z-[10] px-5 pb-8">
        <span className="inline-block mb-2 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/[0.08] text-[6.5px] tracking-[0.4em] uppercase text-[#c9a84c]"
          style={{ fontFamily: "var(--font-dm-sans)" }}>{project.category}</span>
        <h2 className="font-serif italic text-[#f0ebe0] leading-tight"
          style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.5rem,5vw,2.2rem)", letterSpacing: "-0.025em" }}>
          {project.title}
        </h2>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-[7.5px] tracking-[0.45em] uppercase text-white/50" style={{ fontFamily: "var(--font-dm-sans)" }}>{project.client}</span>
          <span className="text-white/15 text-xs">·</span>
          <span className="text-[7.5px] tracking-[0.3em] text-white/25" style={{ fontFamily: "var(--font-dm-sans)" }}>{project.year}</span>
        </div>
        {index === 0 && (
          <div className="mt-5 flex items-center gap-2 opacity-30">
            <div className="w-px h-3 bg-white" />
            <span className="text-[6.5px] tracking-[0.5em] uppercase text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>scroll for more</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP: hover-play grid card
// ─────────────────────────────────────────────────────────────────────────────
function GridCard({ project, index }: { project: Project; index: number }) {
  const ref      = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing,   setPlaying]   = useState(false);
  const [muted,     setMuted]     = useState(true);
  const [buffering, setBuffering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onMeta   = () => { video.currentTime = 0.001; };
    const onWait   = () => setBuffering(true);
    const onResume = () => setBuffering(false);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("waiting",        onWait);
    video.addEventListener("playing",        onResume);
    video.addEventListener("canplay",        onResume);
    video.load();
    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("waiting",        onWait);
      video.removeEventListener("playing",        onResume);
      video.removeEventListener("canplay",        onResume);
    };
  }, []);

  useEffect(() => { if (videoRef.current) videoRef.current.muted = muted; }, [muted]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { videoRef.current?.play().catch(() => {}); setPlaying(true); }}
      onMouseLeave={() => { videoRef.current?.pause(); setPlaying(false); }}
      className="group relative rounded-2xl overflow-hidden bg-[#111] cursor-pointer"
      style={{ aspectRatio: "9/16" }}
    >
      <video ref={videoRef} src={project.src} muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

      <button type="button" onClick={(e) => { e.stopPropagation(); setMuted((p) => !p); }}
        className="absolute bottom-4 right-4 z-[3] w-9 h-9 rounded-full bg-[#3f434c]/90 border border-white/10 flex items-center justify-center text-[#d7dbe2] hover:bg-[#4a4f5a] transition-colors"
        aria-label={muted ? "Unmute" : "Mute"}>
        {muted ? <MuteIcon /> : <UnmuteIcon />}
      </button>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

      {/* buffering spinner */}
      <AnimatePresence>
        {buffering && playing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-[4] flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#c9a84c] animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* play hint */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`}>
        <div className="w-11 h-11 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <span className="text-white/60 text-xs ml-0.5">▶</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[6.5px] tracking-[0.5em] uppercase text-[#c9a84c] mb-1.5" style={{ fontFamily: "var(--font-dm-sans)" }}>
          {project.client}
        </p>
        <h3 className="font-serif italic text-[#f0ebe0] leading-tight"
          style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(0.95rem,1.4vw,1.2rem)", letterSpacing: "-0.02em" }}>
          {project.title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[6.5px] tracking-[0.35em] uppercase text-white/30" style={{ fontFamily: "var(--font-dm-sans)" }}>{project.category}</span>
          <span className="text-[6.5px] tracking-[0.3em] text-white/20" style={{ fontFamily: "var(--font-dm-sans)" }}>{project.year}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const mobileFeedRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  const prevFilter = useRef(activeFilter);
  useEffect(() => {
    if (prevFilter.current !== activeFilter) {
      mobileFeedRef.current?.scrollTo({ top: 0, behavior: "instant" });
      prevFilter.current = activeFilter;
    }
  }, [activeFilter]);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          MOBILE — Instagram Reels (hidden on md+)
      ══════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden relative bg-black" style={{ height: "100svh", overflow: "hidden" }}>

        {/* off-screen preload */}
        <div aria-hidden="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none", top: -9999, left: -9999 }}>
          {projects.map((p) => <video key={p.id} src={p.src} preload="auto" muted playsInline />)}
        </div>

        {/* floating filter bar */}
        <div className="absolute bottom-0 left-0 right-0 z-50">
          <div className="mx-4 mb-4 px-4 py-2.5 rounded-2xl border border-white/[0.08] backdrop-blur-xl flex items-center gap-2 overflow-x-auto"
            style={{ background: "rgba(10,10,10,0.75)", scrollbarWidth: "none" }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className="flex-shrink-0 px-3 py-1.5 rounded-xl text-[7px] tracking-[0.3em] uppercase transition-all duration-200"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  background: activeFilter === cat ? "#c9a84c" : "transparent",
                  color: activeFilter === cat ? "#0a0a0a" : "rgba(255,255,255,0.35)",
                  fontWeight: activeFilter === cat ? 600 : 400,
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* snap feed */}
        <div ref={mobileFeedRef} className="h-full overflow-y-scroll"
          style={{ scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch" }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {filtered.length === 0 ? (
                <div className="flex items-center justify-center" style={{ height: "100svh", scrollSnapAlign: "start" }}>
                  <p className="text-[9px] tracking-[0.5em] uppercase text-white/15" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    No projects in this category
                  </p>
                </div>
              ) : (
                filtered.map((p, i) => <ReelItem key={p.id} project={p} index={i} total={filtered.length} />)
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP — Grid layout (hidden below md)
      ══════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block min-h-screen bg-[#0a0a0a]">

        {/* sticky nav */}
        <div className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.05]">
          <div className="px-10 lg:px-20 h-16 flex items-center justify-between">
            <Link href="/"
              className="inline-flex items-center gap-2 text-[7.5px] tracking-[0.45em] uppercase text-white/30 hover:text-[#c9a84c] transition-colors group"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              <span className="group-hover:-translate-x-0.5 transition-transform duration-300">←</span>
              Back
            </Link>
            <span className="text-[7px] tracking-[0.5em] uppercase text-white/15" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Digital Kalakaar
            </span>
          </div>
        </div>

        {/* hero */}
        <div className="px-10 lg:px-20 pt-20 pb-12">
          <motion.p className="mb-5 inline-flex items-center gap-3 text-[9px] tracking-[0.55em] uppercase text-[#c9a84c]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="w-5 h-px bg-[#c9a84c]" />Our Work
          </motion.p>
          <motion.h1
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.8rem,5.5vw,6rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "#f0ebe0" }}
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>
            Every frame,<br />
            <span style={{ color: "#c9a84c", fontStyle: "italic" }}>intentional.</span>
          </motion.h1>
          <motion.p className="mt-5 text-[0.85rem] leading-[1.85] text-white/28 max-w-md"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            A curated showcase of films made for brands that trust craft over content.
          </motion.p>
        </div>

        {/* filters */}
        <motion.div className="px-10 lg:px-20 pb-8 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              className="px-4 py-1.5 rounded-full border text-[7.5px] tracking-[0.4em] uppercase transition-all duration-300"
              style={{
                fontFamily: "var(--font-dm-sans)",
                borderColor: activeFilter === cat ? "#c9a84c" : "rgba(255,255,255,0.1)",
                color:       activeFilter === cat ? "#c9a84c" : "rgba(255,255,255,0.3)",
                background:  activeFilter === cat ? "rgba(201,168,76,0.06)" : "transparent",
              }}>
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="mx-10 lg:mx-20 h-px bg-white/[0.06] mb-10" />

        {/* grid */}
        <div className="px-10 lg:px-20 pb-32">
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter}
              className="grid grid-cols-3 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {filtered.length === 0 ? (
                <p className="col-span-full text-center py-32 text-[9px] tracking-[0.5em] uppercase text-white/15"
                  style={{ fontFamily: "var(--font-dm-sans)" }}>
                  No projects in this category
                </p>
              ) : (
                filtered.map((p, i) => <GridCard key={p.id} project={p} index={i} />)
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </>
  );
}
