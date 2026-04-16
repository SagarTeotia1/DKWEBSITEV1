"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";

const projects = [
  { id: 1, title: "Lumière Jewels", category: "Brand Commercial", year: "2024", duration: "0:90", video: "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4", featured: true },
  { id: 2, title: "Nakshatra Couture", category: "Fashion Film", year: "2024", duration: "2:15", video: "https://videos.pexels.com/video-files/855370/855370-sd_640_360_25fps.mp4", featured: false },
  { id: 3, title: "Arya Spirits", category: "Product Commercial", year: "2023", duration: "0:45", video: "https://videos.pexels.com/video-files/6990394/6990394-sd_640_360_24fps.mp4", featured: false },
  { id: 4, title: "Horizon Realty", category: "Corporate Film", year: "2023", duration: "3:30", video: "https://videos.pexels.com/video-files/18675658/18675658-sd_640_360_30fps.mp4", featured: false },
  { id: 5, title: "Zephyr Fragrances", category: "Digital Content", year: "2023", duration: "1:00", video: "https://videos.pexels.com/video-files/6990393/6990393-sd_640_360_24fps.mp4", featured: false },
  { id: 6, title: "Indus Heritage", category: "Documentary", year: "2022", duration: "12:00", video: "https://videos.pexels.com/video-files/855369/855369-sd_640_360_25fps.mp4", featured: false },
];

const categories = ["All", "Brand Commercial", "Fashion Film", "Product Commercial", "Corporate Film", "Digital Content", "Documentary"];

// Stacked heading — lines slide up one by one
function RevealHeading({ lines, delay = 0, inView }: { lines: string[]; delay?: number; inView: boolean }) {
  return (
    <div>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden leading-none">
          <motion.div
            initial={{ y: "105%", skewY: 3 }}
            animate={inView ? { y: "0%", skewY: 0 } : {}}
            transition={{ duration: 0.9, delay: delay + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={`block text-[clamp(2.5rem,6vw,5rem)] font-serif leading-[1.0] ${
                i === lines.length - 1 ? "italic text-[#c9a84c]" : "text-[#f0ebe0]"
              }`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {line}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function WorkCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <motion.div
      ref={ref}
      className="work-card group relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
      style={{ clipPath: inView ? "inset(0% 0% 0% 0% round 1rem)" : "inset(0% 0% 100% 0% round 1rem)" }}
      animate={inView ? { clipPath: "inset(0% 0% 0% 0% round 1rem)" } : {}}
      transition={{ duration: 0.9, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      initial={{ clipPath: "inset(0% 0% 100% 0% round 1rem)" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileDrag={{ scale: 1.02 }}
      drag
      dragElastic={0.2}
      dragTransition={{ power: 0.3, restDelta: 0.001 }}
    >
      <div className="aspect-[4/3] relative bg-white/5">
        <video ref={videoRef} src={project.video} muted loop playsInline preload="metadata" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/15 to-transparent z-[1]" />

        {/* Hover overlay w/ clip path reveal */}
        <motion.div
          className="absolute inset-0 z-[1] bg-gold/5"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Tag */}
        <div className="absolute top-4 left-4 z-[3]">
          <motion.span
            className="text-[10px] tracking-[0.2em] uppercase bg-[#0a0a0a]/70 backdrop-blur-sm text-gold/80 px-3 py-1 rounded-full border border-gold/20"
            animate={{ y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {project.category}
          </motion.span>
        </div>

        {/* Play btn */}
        <motion.div
          className="absolute inset-0 z-[2] flex items-center justify-center"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 rounded-full border border-cream/40 flex items-center justify-center backdrop-blur-sm bg-[#0a0a0a]/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-cream ml-1">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </div>
        </motion.div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 z-[3] p-5">
          <div className="flex items-end justify-between">
            <div>
              <div className="overflow-hidden">
                <motion.h3
                  className="font-serif text-xl text-cream"
                  style={{ fontFamily: "var(--font-playfair)" }}
                  animate={{ y: hovered ? 0 : 4 }}
                  transition={{ duration: 0.4 }}
                >
                  {project.title}
                </motion.h3>
              </div>
              <p className="text-[10px] text-cream/40 mt-1 tracking-[0.2em]">{project.year} · {project.duration}</p>
            </div>
            <motion.div
              animate={{ x: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" ref={sectionRef} className="relative bg-[#0e0e0e] px-6 md:px-10 lg:px-16 py-24 md:py-36 max-w-full" style={{ zIndex: 20 }}>
      <div className="max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-14">
          <div>
            <div className="overflow-hidden mb-5">
              <motion.p
                className="text-[9px] tracking-[0.55em] uppercase text-[#c9a84c]"
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                Selected Work
              </motion.p>
            </div>
            <RevealHeading lines={["Our", "Stories."]} delay={0.1} inView={inView} />
          </div>
          <div className="overflow-hidden max-w-xs">
            <motion.p
              className="text-[0.82rem] text-[#f0ebe0]/38 leading-[1.8]"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
              initial={{ y: "80%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Every frame is a deliberate act of storytelling. Browse our curated selection of commercial and editorial work.
            </motion.p>
          </div>
        </div>

        {/* Animated divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent mb-10"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Filter tabs — editorial underline style */}
        <LayoutGroup>
          <motion.div
            className="flex flex-wrap gap-x-8 gap-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative pb-2 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  activeCategory === cat ? "text-[#f0ebe0]" : "text-[#f0ebe0]/30 hover:text-[#f0ebe0]/60"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="filter-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a84c]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Grid — animated with drag support */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((project, i) => (
            <WorkCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        className="mt-16 md:mt-20 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9 }}
      >
        <motion.button
          className="group inline-flex items-center gap-5 text-[10px] tracking-[0.42em] uppercase text-[#f0ebe0]/35 hover:text-[#f0ebe0] transition-colors duration-300"
          whileHover={{ gap: "2.5rem", transition: { type: "spring", stiffness: 300, damping: 22 } }}
        >
          <span className="h-px bg-[#f0ebe0]/15 group-hover:bg-[#c9a84c] transition-all duration-500 w-12 group-hover:w-20" />
          View Full Portfolio
          <span className="h-px bg-[#f0ebe0]/15 group-hover:bg-[#c9a84c] transition-all duration-500 w-12 group-hover:w-20" />
        </motion.button>
      </motion.div>
      </div>
    </section>
  );
}
