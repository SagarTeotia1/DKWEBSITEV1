"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
  { id: 1,  src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371219480-d1dd6a9f-69e9-4194-9254-24d1710d3329.MP4", title: "InstaQueen",      client: "InstaQueen",       category: "Brand Commercial", year: "2024" },
  { id: 2,  src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371344512-7bc45299-d1f8-4973-8f0a-a6473cc99f92.mp4", title: "Wellbing",        client: "Wellbing",         category: "Product Film",     year: "2024" },
  { id: 3,  src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371534571-380273bc-5588-4f3a-808b-6f51adef68ba.mp4", title: "Mera Husband",    client: "Mera Husband",     category: "Fashion Film",     year: "2023" },
  { id: 4,  src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371711317-918364ec-ffb2-4e8e-ad79-e012af08a3cf.mp4", title: "Weellbeing",      client: "Weellbeing",       category: "Makeup Film",      year: "2023" },
  { id: 5,  src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371876694-f0309dd5-635a-4a17-9cc3-8a696b6f3168.mp4", title: "Astrotalk",       client: "Astrotalk",        category: "Digital Content",  year: "2024" },
  { id: 6,  src: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776372090831-bc5f1238-f161-4d19-adf4-f02a22321508.mp4", title: "Keventers",       client: "Keventers",        category: "Social Content",   year: "2023" },
  { id: 7,  src: "https://lorem.video/corgi_480p_h264_30fps_20s.mp4",  title: "Vision Drop",        client: "Lenskart",        category: "Brand Film",       year: "2024" },
  { id: 8,  src: "https://lorem.video/test_480p_h264_30fps_20s.mp4",   title: "Snap Reels",         client: "SONY",            category: "Product Film",     year: "2023" },
  { id: 9,  src: "https://lorem.video/bunny_480p_h264_30fps_15s.mp4",  title: "Frame One",          client: "Nikon",           category: "Brand Commercial", year: "2024" },
  { id: 10, src: "https://lorem.video/cat_480p_h264_30fps_15s.mp4",    title: "Sound Off",          client: "Zomato",          category: "Social Content",   year: "2023" },
  { id: 11, src: "https://lorem.video/corgi_480p_h264_30fps_15s.mp4",  title: "Rhythm & Colour",    client: "SUGAR Cosmetics", category: "Fashion Film",     year: "2024" },
  { id: 12, src: "https://lorem.video/test_480p_h264_30fps_15s.mp4",   title: "Drive Forward",      client: "Hyundai",         category: "Brand Commercial", year: "2023" },
];

const categories = ["All", "Brand Commercial", "Product Film", "Fashion Film", "Digital Content", "Social Content", "Makeup Film", "Brand Film"];

function VideoCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = muted;
  }, [muted]);

  function handleMouseEnter() {
    videoRef.current?.play().catch(() => {});
    setPlaying(true);
  }
  function handleMouseLeave() {
    videoRef.current?.pause();
    setPlaying(false);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden bg-[#111] cursor-pointer"
      style={{ aspectRatio: "9/16" }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={project.src}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setMuted((prev) => !prev);
        }}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 z-[3] w-10 h-10 rounded-full bg-[#3f434c]/95 border border-white/10 flex items-center justify-center text-[#d7dbe2] hover:bg-[#4a4f5a] transition-colors duration-300"
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

      {/* Always-on gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Play hint (shown when not hovering) */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`}>
        <div className="w-12 h-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <span className="text-white/60 text-sm ml-0.5">▶</span>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="text-[7px] tracking-[0.5em] uppercase text-[#c9a84c] mb-1.5"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {project.client}
        </p>
        <h3
          className="font-serif italic text-[#f0ebe0] leading-tight"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {project.title}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <span
            className="text-[7px] tracking-[0.35em] uppercase text-white/30"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {project.category}
          </span>
          <span
            className="text-[7px] tracking-[0.3em] text-white/20"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {project.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ── Top nav bar ── */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="px-6 md:px-16 lg:px-24 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-[7.5px] tracking-[0.45em] uppercase text-white/30 hover:text-[#c9a84c] transition-colors duration-300 group"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-300">←</span>
            <span>Back</span>
          </Link>
          <span
            className="text-[7px] tracking-[0.5em] uppercase text-white/15"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Digital Kalakaar
          </span>
        </div>
      </div>

      {/* ── Hero header ── */}
      <div className="px-6 md:px-16 lg:px-24 pt-20 md:pt-28 pb-14">
        <motion.p
          className="mb-6 inline-flex items-center gap-3 text-[9px] tracking-[0.55em] uppercase text-[#c9a84c]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-5 h-px bg-[#c9a84c]" />
          Our Work
        </motion.p>

        <motion.h1
          className="font-serif text-[#f0ebe0]"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.8rem, 6vw, 7rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          Every frame,<br />
          <span style={{ color: "#c9a84c", fontStyle: "italic" }}>intentional.</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-[0.85rem] leading-[1.85] text-white/28 max-w-md"
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A curated showcase of films made for brands that trust craft over content.
        </motion.p>
      </div>

      {/* Filter bar */}
      <motion.div
        className="px-6 md:px-16 lg:px-24 pb-10 flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className="px-4 py-1.5 rounded-full border text-[7.5px] tracking-[0.4em] uppercase transition-all duration-300"
            style={{
              fontFamily: "var(--font-dm-sans)",
              borderColor: activeFilter === cat ? "#c9a84c" : "rgba(255,255,255,0.1)",
              color: activeFilter === cat ? "#c9a84c" : "rgba(255,255,255,0.3)",
              background: activeFilter === cat ? "rgba(201,168,76,0.06)" : "transparent",
            }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Thin divider */}
      <div className="mx-6 md:mx-16 lg:mx-24 h-px bg-white/[0.06] mb-12" />

      {/* Video grid */}
      <div className="px-6 md:px-16 lg:px-24 pb-32">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          layout
        >
          {filtered.map((project, i) => (
            <VideoCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p
            className="text-center py-32 text-[9px] tracking-[0.5em] uppercase text-white/15"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            No projects in this category yet
          </p>
        )}
      </div>

    </div>
  );
}
