import type { Metadata } from "next";

const siteUrl = "https://digitalkalakaarproductions.com";

export const metadata: Metadata = {
  title: "Our Work — Portfolio of Brand Films, Commercials & Reels",
  description:
    "Explore Digital Kalakaar's portfolio — TV commercials, brand films, Instagram reels, product videos, and fashion films produced for 50+ brands across India including Astrotalk, Keventers, and PolicyBazaar.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Our Work | Digital Kalakaar Productions",
    description:
      "50+ brands. Cinematic commercials, brand films, Instagram reels, and digital content — produced by Digital Kalakaar, New Delhi's top production house.",
    url: `${siteUrl}/work`,
    siteName: "Digital Kalakaar",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Digital Kalakaar Work Portfolio — Brand Films & Commercials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | Digital Kalakaar Productions",
    description:
      "Brand films, commercials, reels, and social content crafted by Digital Kalakaar — India's creative production house.",
    images: ["/twitter-image"],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our Work",
        item: `${siteUrl}/work`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Visually hidden h1 for mobile view — desktop h1 lives in the page component */}
      <h1 className="sr-only">
        Digital Kalakaar Work Portfolio — Brand Films, Commercials &amp; Reels
      </h1>
      {children}
    </>
  );
}
