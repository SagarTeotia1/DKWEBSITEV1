"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

type Client = {
  name: string;
  file: string;
  lightBg?: boolean;
};

const clients: Client[] = [
  { name: "Astrotalk",          file: "ASTROTALK%20LOGO.png" },
  { name: "Keventers",          file: "keventers.png" },
  { name: "Vahaflix",           file: "vahaflix.PNG" },
  { name: "Wellbeing Nutrition",file: "Wellbeing%20nutriton.png" },
  { name: "MicroKahani",        file: "MicroKAhani%20logo%20DKWEBSite.png" },
  { name: "Shaadi.com",         file: "shaadi.com.PNG" },
  { name: "Stage",              file: "StageLogo.PNG" },
  { name: "The Indus Valley",   file: "The%20Indus%20Valley.PNG" },
  { name: "Viralo",             file: "VIRALO%20LOGO.JPG",    lightBg: true },
  { name: "Athrox",             file: "athrox.JPG",           lightBg: true },
  { name: "GoGoGo",             file: "GoGoGo%20logo.JPG",    lightBg: true },
  { name: "Crafto",             file: "crafto.jpg",           lightBg: true },
  { name: "BJP",                file: "BJP.JPG",              lightBg: true },
  { name: "Government",         file: "Goverment.JPG",        lightBg: true },
  { name: "PolicyBazaar",       file: "Policy%20baazaar.JPG", lightBg: true },
  { name: "TipTop",             file: "TIPTOPLOGO.JPG",       lightBg: true },
];

// mobile shows first 6 initially (2 rows × 3 cols)
const MOBILE_INITIAL = 6;

export default function ClientsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [expanded, setExpanded] = useState(false);

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] z-20 overflow-hidden">

      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ── Heading ── */}
      <div className="text-center px-6 pt-28 md:pt-36 mb-12 md:mb-16">
        <motion.p
          className="inline-flex items-center gap-3 mb-5 text-[9px] tracking-[0.55em] uppercase text-[#c9a84c]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-5 h-px bg-[#c9a84c]" />
          Our Clients
          <span className="w-5 h-px bg-[#c9a84c]" />
        </motion.p>

        <motion.h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "#f0ebe0",
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Brands that trust us
        </motion.h2>

        <motion.p
          className="mt-4 text-[#666] text-sm tracking-wide"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          50+ brands across India
        </motion.p>
      </div>

      {/* ── Logo grid ── */}
      <div className="max-w-5xl mx-auto px-4 md:px-10">

        {/* desktop: all 16 always visible */}
        <div className="hidden md:grid md:grid-cols-4">
          {clients.map((client, i) => (
            <LogoCell key={i} client={client} index={i} inView={inView} cols={4} />
          ))}
        </div>

        {/* mobile: 3 cols, first 6 visible then expand */}
        <div className="grid grid-cols-3 md:hidden">
          {clients.slice(0, MOBILE_INITIAL).map((client, i) => (
            <LogoCell key={i} client={client} index={i} inView={inView} cols={3} />
          ))}

          <AnimatePresence>
            {expanded &&
              clients.slice(MOBILE_INITIAL).map((client, i) => (
                <LogoCell
                  key={MOBILE_INITIAL + i}
                  client={client}
                  index={MOBILE_INITIAL + i}
                  inView={inView}
                  cols={3}
                  fromExpand
                />
              ))}
          </AnimatePresence>
        </div>

        {/* See more button — mobile only */}
        {!expanded && (
          <motion.div
            className="flex justify-center mt-6 md:hidden"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <button
              onClick={() => setExpanded(true)}
              className="group flex items-center gap-2.5 px-7 py-3 rounded-full border border-white/10 text-[11px] tracking-[0.22em] uppercase text-white/50 hover:text-white hover:border-white/25 transition-all duration-300"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              See all clients
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover:translate-y-0.5"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M6 1v10M1 6l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>

      <div className="pb-24 md:pb-32" />

    </section>
  );
}

/* ── Logo cell ── */
function LogoCell({
  client,
  index,
  inView,
  cols,
  fromExpand = false,
}: {
  client: Client;
  index: number;
  inView: boolean;
  cols: number;
  fromExpand?: boolean;
}) {
  const row = Math.floor(index / cols);
  const col = index % cols;

  return (
    <motion.div
      className="flex items-center justify-center py-7 px-3 md:py-10 md:px-5 group cursor-default"
      initial={{ opacity: 0, y: fromExpand ? 10 : 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: 6 }}
      transition={{
        duration: fromExpand ? 0.35 : 0.5,
        delay: fromExpand ? (index - 6) * 0.04 : 0.3 + row * 0.08 + col * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        whileHover={{ scale: 1.08, y: -3 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "relative transition-all duration-300",
          client.lightBg
            ? "rounded-md overflow-hidden brightness-95 group-hover:brightness-110"
            : "brightness-90 group-hover:brightness-125",
        ].join(" ")}
        style={{ width: "120px", height: "52px" }}
      >
        <Image
          src={`/assets/clients/${client.file}`}
          alt={client.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 33vw, 20vw"
        />
      </motion.div>
    </motion.div>
  );
}
