import type { Metadata } from "next";

const siteUrl = "https://digitalkalakaarproductions.com";

export const metadata: Metadata = {
  title: "Our Work — Brand Films, TVC Commercials & Reels Portfolio | Delhi NCR",
  description:
    "Explore Digital Kalakaar's portfolio — TVC commercials, brand films, Instagram reels, product videos, micro dramas, and fashion films for 50+ brands including Astrotalk, Keventers, PolicyBazaar & Shaadi.com. Best production house Delhi NCR.",
  keywords: [
    "Digital Kalakaar portfolio",
    "brand film portfolio Delhi",
    "TVC commercial portfolio India",
    "video production portfolio Delhi NCR",
    "brand reel examples India",
    "production house work Delhi",
    "Astrotalk commercial production",
    "Keventers brand film",
    "PolicyBazaar video production",
    "micro drama production portfolio",
    "short film production Delhi portfolio",
    "best video production company Delhi work",
  ],
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Our Work | Digital Kalakaar — Brand Films, TVC & Reels Portfolio",
    description:
      "50+ brands. Cinematic TVC commercials, brand films, Instagram reels, micro dramas, and digital content — by Digital Kalakaar, Delhi NCR's best production house.",
    url: `${siteUrl}/work`,
    siteName: "Digital Kalakaar Productions",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Digital Kalakaar Work Portfolio — Brand Films & Commercials Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | Digital Kalakaar Productions Delhi",
    description:
      "Brand films, TVC commercials, reels, micro dramas & social content crafted by Digital Kalakaar — Delhi NCR's top production house.",
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

  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/work`,
    name: "Digital Kalakaar Work Portfolio — Brand Films, TVC & Reels",
    description:
      "Portfolio of video productions by Digital Kalakaar Productions — Delhi NCR's best production house. TVC commercials, brand films, Instagram reels, micro dramas, short films, and digital content for 50+ brands across India.",
    url: `${siteUrl}/work`,
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Digital Kalakaar Productions",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Brand Films & Commercial Portfolio",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "InstaQueen — Brand Commercial",
          description: "Cinematic brand commercial for InstaQueen produced by Digital Kalakaar Productions, Delhi.",
          url: `${siteUrl}/work`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Mera Husband — Fashion Film",
          description: "Fashion film produced by Digital Kalakaar for Mera Husband brand.",
          url: `${siteUrl}/work`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Wellbeing Nutritions — Product Film",
          description: "Product film for Wellbeing Nutritions by Digital Kalakaar Productions.",
          url: `${siteUrl}/work`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Astrotalk — Digital Content",
          description: "Digital ad content for Astrotalk by Digital Kalakaar, Delhi.",
          url: `${siteUrl}/work`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Keventers — Social Content Film",
          description: "Social media content film for Keventers by Digital Kalakaar Productions.",
          url: `${siteUrl}/work`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
      />
      <h1 className="sr-only">
        Digital Kalakaar Work Portfolio — Brand Films, TVC Commercials, Reels &amp; Micro Dramas | Best Production House Delhi NCR
      </h1>
      {children}
    </>
  );
}
