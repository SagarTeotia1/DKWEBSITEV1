"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const projectTypes = [
  "Brand Commercial",
  "Fashion Film",
  "Corporate Film",
  "Music Video",
  "Digital Content",
  "Other",
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    brand: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    // Simulate async send
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-36 px-4 md:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <motion.p
              className="text-xs tracking-[0.35em] uppercase text-gold/60 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Let&apos;s Talk
            </motion.p>

            <motion.h2
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-serif leading-none text-cream mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Start
              <br />
              your
              <br />
              <em className="text-gold not-italic">Project.</em>
            </motion.h2>

            <motion.p
              className="text-sm text-cream/40 max-w-sm leading-relaxed mb-12"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Have a story worth telling? We&apos;d love to hear about your project.
              Drop us the details and our team will be in touch within 24 hours.
            </motion.p>

            {/* Contact details */}
            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 }}
            >
              {[
                {
                  label: "Email",
                  value: "hello@digitalkalakaar.com",
                  href: "mailto:hello@digitalkalakaar.com",
                },
                {
                  label: "Phone",
                  value: "+91 98XXX XXXXX",
                  href: "tel:+919800000000",
                },
                {
                  label: "Studio",
                  value: "New Delhi, India",
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-6 items-start">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-cream/25 pt-1 w-12 flex-shrink-0">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-cream/60 hover:text-gold transition-colors duration-300"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm text-cream/60">{item.value}</span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              className="mt-10 flex gap-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              {["Instagram", "Vimeo", "YouTube", "LinkedIn"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-[10px] tracking-[0.2em] uppercase text-cream/30 hover:text-gold transition-colors duration-300"
                >
                  {platform}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right â€” form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center h-full text-center py-24"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3
                  className="text-3xl font-serif text-cream mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Message Sent.
                </h3>
                <p className="text-sm text-cream/40">We&apos;ll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="text-[10px] tracking-[0.25em] uppercase text-cream/30 block mb-3">
                      Your Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.25em] uppercase text-cream/30 block mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@brand.com"
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="text-[10px] tracking-[0.25em] uppercase text-cream/30 block mb-3">
                      Brand / Company
                    </label>
                    <input
                      name="brand"
                      value={form.brand}
                      onChange={handleChange}
                      placeholder="Your brand name"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.25em] uppercase text-cream/30 block mb-3">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="form-input appearance-none bg-transparent"
                    >
                      <option value="" className="bg-[#0a0a0a]">Select type</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t} className="bg-[#0a0a0a]">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-cream/30 block mb-3">
                    Tell Us About Your Project *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your vision, goals, and timeline..."
                    required
                    rows={4}
                    className="form-input resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="group flex items-center justify-between w-full border border-gold/30 text-cream/70 hover:bg-gold hover:text-bg hover:border-gold px-8 py-5 rounded-2xl transition-all duration-400 disabled:opacity-50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="text-sm tracking-[0.2em] uppercase">
                    {sending ? "Sending..." : "Send Message"}
                  </span>
                  <motion.div
                    animate={{ x: sending ? 8 : 0, opacity: sending ? 0.4 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


