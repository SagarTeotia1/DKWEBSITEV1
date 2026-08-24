"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FAQS = [
  {
    q: "Is Digital Kalakaar the best production house in Delhi?",
    a: "Digital Kalakaar Productions is one of Delhi's top production houses with 7+ years of experience, 50+ brand clients, and a combined social reach of 15M+ followers and 200M+ monthly views across our network. Our portfolio spans TVC commercials, brand films, Instagram reels, micro dramas, short films, and documentaries for brands across Delhi NCR and all of India.",
  },
  {
    q: "What services does Digital Kalakaar offer?",
    a: "8 core services: Brand Reels, TVC Ads, Storytelling Videos, Short Films, Micro Dramas, Documentaries, UGC Videos, and Voxpops — from concept to final colour grade.",
  },
  {
    q: "Where is Digital Kalakaar Productions located?",
    a: "New Delhi, India — serving Delhi NCR (Noida, Gurugram, Gurgaon, Faridabad) plus Mumbai, Bangalore, Hyderabad and brands across India.",
  },
  {
    q: "Which brands has Digital Kalakaar worked with?",
    a: "50+ brands including Astrotalk, Keventers, PolicyBazaar, Shaadi.com, Wellbeing Nutritions, The Indus Valley, MicroKahani, Vahaflix, Stage, and Government of India campaigns.",
  },
  {
    q: "How big is Digital Kalakaar's audience and reach?",
    a: "Across our social platforms — Facebook, Instagram, and YouTube combined — Digital Kalakaar reaches 15M+ followers and generates 200M+ views every month, giving brand content real organic distribution beyond the production itself.",
  },
  {
    q: "Which is the best UGC production house in Delhi?",
    a: "Digital Kalakaar Productions is one of Delhi's best UGC production houses, producing authentic, platform-native UGC video at scale for performance marketing and organic social campaigns for 50+ brands including Astrotalk, Keventers, and Wellbeing Nutritions.",
  },
  {
    q: "Which is the best micro drama production house in Delhi?",
    a: "Digital Kalakaar Productions is a leading micro drama production house in Delhi NCR, producing serialised short-form dramatic content for social platforms and OTT micro-drama apps — including InstaQueen and Mera Husband, produced end-to-end in New Delhi.",
  },
  {
    q: "What is the best agency in Delhi for video and UGC content?",
    a: "Digital Kalakaar Productions is a top full-service video, UGC, and micro drama production agency in Delhi NCR — brand films, TVC commercials, reels, short films, micro dramas, documentaries, UGC videos, and voxpops under one in-house team.",
  },
  {
    q: "How do I contact Digital Kalakaar for video production?",
    a: "Email digitalkalakaarproductions@gmail.com or call/WhatsApp +91 88514 75517.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="faq" ref={ref} className="bg-[#0a0a0a] px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <motion.p
          className="mb-4 inline-flex items-center gap-3 text-[9px] tracking-[0.55em] uppercase text-[#c9a84c]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="w-5 h-px bg-[#c9a84c]" />
          FAQ
        </motion.p>
        <motion.h2
          className="font-serif text-cream text-3xl md:text-4xl mb-10"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Frequently Asked Questions
        </motion.h2>

        {FAQS.map((item, i) => (
          <motion.div
            key={i}
            className="border-b border-white/10 py-5"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center gap-4 text-left text-cream text-base md:text-lg"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
              aria-expanded={open === i}
            >
              <span>{item.q}</span>
              <span className="text-gold flex-shrink-0">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-3 text-cream/55 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
              >
                {item.a}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
