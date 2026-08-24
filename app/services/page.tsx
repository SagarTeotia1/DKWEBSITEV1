import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES_DATA } from "@/lib/servicesData";

const siteUrl = "https://digitalkalakaarproductions.com";

export const metadata: Metadata = {
  title: "Our Services — Best Production House & UGC Agency in Delhi NCR",
  description:
    "8 video production services from Digital Kalakaar — Delhi's best UGC production house, micro drama production house, and video production agency. Brand reels, TVC ads, storytelling videos, short films, micro dramas, documentaries, UGC videos & voxpops.",
  keywords: [
    "best production house in Delhi",
    "best agency in Delhi",
    "best UGC production house in Delhi",
    "best micro drama production house in Delhi",
    "video production services Delhi",
    "UGC content agency Delhi",
    "micro drama production company Delhi",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Video Production Services | Digital Kalakaar — Best Production House Delhi NCR",
    description:
      "Brand reels, TVC ads, storytelling videos, short films, micro dramas, documentaries, UGC videos & voxpops — from Delhi's best production house and UGC agency.",
    url: `${siteUrl}/services`,
    siteName: "Digital Kalakaar Productions",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Digital Kalakaar Services — Best Production House Delhi NCR" }],
  },
};

export default function ServicesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Digital Kalakaar Video Production Services",
    itemListElement: SERVICES_DATA.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${siteUrl}/services/${s.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <div className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="px-6 md:px-10 lg:px-20 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[7.5px] tracking-[0.45em] uppercase text-white/30 hover:text-[#c9a84c] transition-colors"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            ← Back
          </Link>
          <span className="text-[7px] tracking-[0.5em] uppercase text-white/15" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Digital Kalakaar
          </span>
        </div>
      </div>

      <div className="px-6 md:px-10 lg:px-20 pt-16 pb-10 max-w-4xl">
        <p className="mb-5 text-[9px] tracking-[0.55em] uppercase text-[#c9a84c]" style={{ fontFamily: "var(--font-dm-sans)" }}>
          What We Do
        </p>
        <h1
          style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.2rem,4.5vw,4rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "#f0ebe0" }}
        >
          Best Production House &amp; <span style={{ color: "#c9a84c", fontStyle: "italic" }}>UGC Agency in Delhi.</span>
        </h1>
        <p className="mt-5 text-[0.9rem] leading-[1.85] text-white/40 max-w-2xl" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}>
          Digital Kalakaar Productions is a full-service video production house and UGC content agency based in New
          Delhi, serving brands across Delhi NCR and India since 2018. Below are our 8 core services — each built
          in-house, from concept to final delivery.
        </p>
      </div>

      <div className="px-6 md:px-10 lg:px-20 pb-24 grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES_DATA.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/[0.03] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <span
                className="text-[10px] tracking-[0.5em] uppercase text-gold/40"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {service.number}
              </span>
              <span className="text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300">→</span>
            </div>
            <h2
              className="text-cream mb-2"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 700 }}
            >
              {service.title}
            </h2>
            <p className="text-cream/45 text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}>
              {service.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="px-6 md:px-10 lg:px-20 pb-24 max-w-3xl">
        <h2 className="text-cream mb-4" style={{ fontFamily: "var(--font-playfair)", fontSize: "1.6rem" }}>
          Why Digital Kalakaar Is Delhi&apos;s Best Production House
        </h2>
        <p className="text-cream/50 text-sm leading-[1.9]" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}>
          As one of Delhi&apos;s best production houses and top UGC production agencies, we&apos;ve produced content
          for 50+ brands including Astrotalk, Keventers, PolicyBazaar, and Shaadi.com. Whether you need a best-in-class
          micro drama production house in Delhi for serialised social content, or a UGC agency that produces
          authentic, platform-native ad creative at scale, our in-house team in New Delhi handles every stage —
          concept, shoot, edit, and delivery.{" "}
          <Link href="/work" className="text-gold/80 hover:text-gold underline underline-offset-4">
            See our work →
          </Link>
        </p>
      </div>
    </div>
  );
}
