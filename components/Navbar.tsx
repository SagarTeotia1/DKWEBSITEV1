"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about", isCTA: false },
  { label: "Work", href: "/work", isCTA: false },
  { label: "Services", href: "#services", isCTA: false },
  { label: "Contact", href: "#contact", isCTA: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 60);
      setHidden(current > lastScroll.current && current > 200);
      lastScroll.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "mx-4 mt-4 rounded-2xl glass-dark px-6 py-4"
              : "px-8 py-6"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex flex-col group"
              whileHover={{ scale: 1.01 }}
            >
              <span
                className="text-sm font-bold tracking-[0.25em] uppercase text-white group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Digital Kalakaar{" "}
                <span className="text-gold/80 group-hover:text-gold transition-colors duration-300">Productions</span>
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative text-sm font-bold tracking-[0.1em] transition-colors duration-300 group ${
                    link.isCTA
                      ? "px-6 py-2 rounded-lg border border-gold/60 text-gold hover:bg-gold/10"
                      : "text-white hover:text-gold"
                  }`}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                >
                  {link.label}
                  {!link.isCTA && (
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                  )}
                </motion.button>
              ))}

            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-[5px] w-6"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-px bg-cream origin-center"
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-px bg-cream"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-px bg-cream origin-center"
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-4xl font-serif font-bold transition-colors duration-300 ${
                    link.isCTA
                      ? "px-6 py-3 rounded-lg border border-gold/60 text-gold"
                      : "text-white hover:text-gold"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.2, duration: 0.4 }}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <motion.div
              className="absolute bottom-12 text-cream/30 text-xs tracking-[0.25em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Digital Kalakaar Production
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


