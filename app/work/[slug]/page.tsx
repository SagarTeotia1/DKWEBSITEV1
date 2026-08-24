import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WORK_PROJECTS, getWorkBySlug } from "@/lib/workData";

const siteUrl = "https://digitalkalakaarproductions.com";

export function generateStaticParams() {
  return WORK_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.category} | Digital Kalakaar Productions`;
  const description = `${project.description} A ${project.category.toLowerCase()} produced by Digital Kalakaar, Delhi's best production house.`;

  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/work/${project.slug}`,
      siteName: "Digital Kalakaar Productions",
      type: "video.other",
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

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Our Work", item: `${siteUrl}/work` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${siteUrl}/work/${project.slug}` },
    ],
  };

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${project.title} — ${project.category} — Digital Kalakaar Productions`,
    description: project.description,
    thumbnailUrl: `${siteUrl}/opengraph-image`,
    contentUrl: project.video,
    uploadDate: `${project.year}-01-01`,
    duration: "PT1M",
    publisher: { "@id": `${siteUrl}/#organization` },
    keywords: `${project.category}, ${project.client}, production house Delhi`,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />

      <div className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="px-6 md:px-10 lg:px-20 h-16 flex items-center justify-between">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[7.5px] tracking-[0.45em] uppercase text-white/30 hover:text-[#c9a84c] transition-colors"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            ← All Work
          </Link>
          <span className="text-[7px] tracking-[0.5em] uppercase text-white/15" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Digital Kalakaar
          </span>
        </div>
      </div>

      <div className="px-6 md:px-10 lg:px-20 pt-14 pb-8 max-w-4xl">
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[9px] tracking-[0.4em] uppercase text-[#c9a84c]" style={{ fontFamily: "var(--font-dm-sans)" }}>
          {project.category}
        </span>
        <h1
          style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f0ebe0" }}
        >
          {project.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-white/35 text-xs" style={{ fontFamily: "var(--font-dm-sans)" }}>
          <span>{project.client}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>
      </div>

      <div className="px-6 md:px-10 lg:px-20 pb-10 max-w-4xl">
        <div className="rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "9/16", maxWidth: "420px" }}>
          <video src={project.video} controls playsInline preload="metadata" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="px-6 md:px-10 lg:px-20 pb-24 max-w-2xl">
        <p className="text-white/50 text-[0.95rem] leading-[1.9]" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}>
          {project.description}
        </p>
        <Link
          href="/work"
          className="mt-8 inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm transition-colors"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          ← Back to full portfolio
        </Link>
      </div>
    </div>
  );
}
