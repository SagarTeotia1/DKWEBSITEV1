"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Client = {
  name: string;
  display: string;
  color: string;
  font: string;
  weight: number;
  size: string;
  tracking: string;
  transform: string;
  bg: string | null;
  icon?: string;
  iconColor?: string;
};

const clients: Client[] = [
  // Row 1
  { name: "Swiggy",    display: "swiggy",    color: "#ffffff", font: "var(--font-dm-sans)",  weight: 800, size: "0.78rem", tracking: "-0.01em", transform: "none",      bg: "#FC8019" },
  { name: "Nykaa",     display: "Nykaa",     color: "#f8e0ee", font: "var(--font-playfair)", weight: 700, size: "0.95rem", tracking: "0.02em",  transform: "none",      bg: null },
  { name: "boAt",      display: "boAt",      color: "#e8e8e8", font: "var(--font-dm-sans)",  weight: 900, size: "0.9rem",  tracking: "-0.04em", transform: "none",      bg: null },
  { name: "Mamaearth", display: "Mamaearth", color: "#8fce4a", font: "var(--font-dm-sans)",  weight: 700, size: "0.72rem", tracking: "-0.01em", transform: "none",      bg: null },
  // Row 2
  { name: "SUGAR",     display: "SUGAR",     color: "#e8356d", font: "var(--font-dm-sans)",  weight: 900, size: "0.85rem", tracking: "0.08em",  transform: "uppercase", bg: null },
  { name: "Zomato",    display: "zomato",    color: "#e23744", font: "var(--font-dm-sans)",  weight: 800, size: "0.85rem", tracking: "-0.02em", transform: "none",      bg: null },
  { name: "Lenskart",  display: "lenskart",  color: "#00bcd4", font: "var(--font-dm-sans)",  weight: 700, size: "0.78rem", tracking: "-0.01em", transform: "none",      bg: null },
  { name: "NOISE",     display: "NOISE",     color: "#e8e8e8", font: "var(--font-dm-sans)",  weight: 900, size: "0.85rem", tracking: "0.1em",   transform: "uppercase", bg: null },
  // Row 3
  { name: "Nikon",     display: "Nikon",     color: "#111111", font: "var(--font-dm-sans)",  weight: 900, size: "0.8rem",  tracking: "-0.02em", transform: "none",      bg: "#f5c500" },
  { name: "BRIDES",    display: "BRIDES",    color: "#f0ebe0", font: "var(--font-playfair)", weight: 700, size: "0.78rem", tracking: "0.12em",  transform: "uppercase", bg: null },
  { name: "BAZAAR",    display: "BAZAAR",    color: "#f0ebe0", font: "var(--font-playfair)", weight: 400, size: "0.8rem",  tracking: "0.1em",   transform: "uppercase", bg: null },
  { name: "Adobe",     display: "Adobe",     color: "#f0ebe0", font: "var(--font-dm-sans)",  weight: 400, size: "0.82rem", tracking: "0em",     transform: "none",      bg: null, icon: "▲", iconColor: "#FA0F00" },
  // Row 4
  { name: "SONY",      display: "SONY",      color: "#f0ebe0", font: "var(--font-dm-sans)",  weight: 900, size: "0.9rem",  tracking: "0.06em",  transform: "uppercase", bg: null },
  { name: "SINGER",    display: "SINGER",    color: "#e03030", font: "var(--font-dm-sans)",  weight: 900, size: "0.85rem", tracking: "0.06em",  transform: "uppercase", bg: null },
  { name: "Hyundai",   display: "HYUNDAI",   color: "#003087", font: "var(--font-dm-sans)",  weight: 900, size: "0.68rem", tracking: "0.06em",  transform: "uppercase", bg: "#f0ebe0" },
  { name: "SAMSUNG",   display: "SAMSUNG",   color: "#1428A0", font: "var(--font-dm-sans)",  weight: 700, size: "0.7rem",  tracking: "0.04em",  transform: "uppercase", bg: "#f0ebe0" },
];

export default function ClientsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] z-20 overflow-hidden">

      {/* Headline block */}
      <div className="px-6 md:px-16 lg:px-24 pt-28 md:pt-36 pb-20 md:pb-24 text-center">
        <motion.p
          className="mb-6 inline-flex items-center gap-3 text-[9px] tracking-[0.55em] uppercase text-[#c9a84c]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-5 h-px bg-[#c9a84c]" />
          Our Clients
          <span className="w-5 h-px bg-[#c9a84c]" />
        </motion.p>


      </div>

      {/* Thin divider */}
      <motion.div
        className="mx-6 md:mx-16 lg:mx-24 h-px bg-white/[0.07]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        style={{ transformOrigin: "left" }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Logo grid */}
      <div className="grid grid-cols-4 mx-6 md:mx-16 lg:mx-24 mb-24 md:mb-32">
        {clients.map((client, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;

          return (
            <motion.div
              key={i}
              className="flex items-center justify-center py-10 md:py-14 px-6 group"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ y: -3 }}
              transition={{
                duration: 0.6,
                delay: 0.45 + row * 0.12 + col * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {client.bg ? (
                <span
                  className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 select-none"
                  style={{ background: client.bg }}
                >
                  {client.icon && (
                    <span style={{ color: client.iconColor, fontSize: "0.85em", lineHeight: 1 }}>
                      {client.icon}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: client.font,
                      fontWeight: client.weight,
                      fontSize: client.size,
                      letterSpacing: client.tracking,
                      textTransform: client.transform as React.CSSProperties["textTransform"],
                      color: client.color,
                      lineHeight: 1,
                    }}
                  >
                    {client.display}
                  </span>
                </span>
              ) : (
                <span
                  className="select-none text-center"
                  style={{
                    fontFamily: client.font,
                    fontWeight: client.weight,
                    fontSize: client.size,
                    letterSpacing: client.tracking,
                    textTransform: client.transform as React.CSSProperties["textTransform"],
                    color: client.color,
                    lineHeight: 1,
                    opacity: 0.8,
                  }}
                >
                  {client.icon && (
                    <span style={{ color: client.iconColor, marginRight: "3px" }}>{client.icon}</span>
                  )}
                  {client.display}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom label */}
      <motion.p
        className="pb-16 text-center text-[9px] tracking-[0.5em] uppercase text-white/20"
        style={{ fontFamily: "var(--font-dm-sans)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        Trusted by 120+ brands across India
      </motion.p>

    </section>
  );
}
