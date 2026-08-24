import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES_DATA, getServiceBySlug } from "@/lib/servicesData";

const siteUrl = "https://digitalkalakaarproductions.com";

export function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.title} — Best ${service.title} Production House in Delhi NCR`;
  const description = `${service.longDescription} By Digital Kalakaar Productions, Delhi's best production house.`;

  return {
    title,
    description,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/services/${service.slug}`,
      siteName: "Digital Kalakaar Productions",
      type: "website",
      locale: "en_IN",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const currentIndex = SERVICES_DATA.findIndex((s) => s.slug === slug);
  const next = SERVICES_DATA[(currentIndex + 1) % SERVICES_DATA.length];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${siteUrl}/services/${service.slug}` },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.longDescription,
    provider: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Digital Kalakaar Productions",
    },
    areaServed: [
      { "@type": "City", name: "New Delhi" },
      { "@type": "AdministrativeArea", name: "Delhi NCR" },
      { "@type": "Country", name: "India" },
    ],
    url: `${siteUrl}/services/${service.slug}`,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <div className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="px-6 md:px-10 lg:px-20 h-16 flex items-center justify-between">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[7.5px] tracking-[0.45em] uppercase text-white/30 hover:text-[#c9a84c] transition-colors"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            ← All Services
          </Link>
          <span className="text-[7px] tracking-[0.5em] uppercase text-white/15" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {service.number} / 08
          </span>
        </div>
      </div>

      <div className="px-6 md:px-10 lg:px-20 pt-16 pb-10 max-w-3xl">
        <p className="mb-5 text-[9px] tracking-[0.55em] uppercase text-[#c9a84c]" style={{ fontFamily: "var(--font-dm-sans)" }}>
          {service.tagline}
        </p>
        <h1
          style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.4rem,5vw,4.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f0ebe0" }}
        >
          {service.title}
        </h1>
        <p className="mt-6 text-[1rem] leading-[1.9] text-white/50" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}>
          {service.longDescription}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="https://wa.me/918851475517"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl border border-gold/40 text-gold text-sm hover:bg-gold/10 transition-colors"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Enquire on WhatsApp
          </a>
          <Link
            href="/work"
            className="px-5 py-3 rounded-xl border border-white/15 text-white/60 text-sm hover:border-white/30 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            View Our Work
          </Link>
        </div>
      </div>

      <div className="px-6 md:px-10 lg:px-20 pb-24 max-w-3xl">
        <div className="h-px bg-white/[0.06] mb-8" />
        <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Next Service
        </p>
        <Link
          href={`/services/${next.slug}`}
          className="group flex items-center justify-between text-cream hover:text-gold transition-colors"
        >
          <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem" }}>{next.title}</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
