import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

const siteUrl = "https://digitalkalakaarproductions.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Digital Kalakaar | Production House for Ads, Reels & Brand Films in India",
    template: "%s | Digital Kalakaar Productions",
  },
  description:
    "Digital Kalakaar is a top production house in New Delhi, India specialising in TV commercials, brand films, Instagram reels, product videos, and digital ad content for brands like Astrotalk, Keventers & PolicyBazaar.",
  keywords: [
    "Digital Kalakaar",
    "production house India",
    "video production company Delhi",
    "brand film production India",
    "TV commercial production",
    "Instagram reel production agency",
    "social media video production India",
    "product video production Delhi",
    "corporate video production India",
    "advertising film production house",
    "fashion film production India",
    "digital content agency Delhi NCR",
    "reel production agency India",
    "commercial ad production Delhi",
  ],
  alternates: {
    canonical: "/",
  },
  applicationName: "Digital Kalakaar",
  category: "business",
  openGraph: {
    title: "Digital Kalakaar | Production House for Ads, Reels & Brand Films",
    description:
      "Top production house in New Delhi — cinematic commercials, brand films, Instagram reels, and high-performing digital content for modern Indian brands.",
    url: siteUrl,
    siteName: "Digital Kalakaar",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Digital Kalakaar Productions — Production House India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Kalakaar | Production House India",
    description:
      "Commercials, brand films, reels, and digital content crafted to move audiences and grow brands across India.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": `${siteUrl}/#organization`,
        name: "Digital Kalakaar Productions",
        alternateName: "Digital Kalakaar",
        url: siteUrl,
        email: "digitalkalakaarproductions@gmail.com",
        telephone: "+918851475517",
        description:
          "Award-winning production house in New Delhi, India. We create TV commercials, brand films, Instagram reels, product videos, and digital ad content.",
        image: `${siteUrl}/opengraph-image`,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "New Delhi",
          addressRegion: "Delhi",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 28.6139,
          longitude: 77.209,
        },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "City", name: "New Delhi" },
          { "@type": "City", name: "Mumbai" },
          { "@type": "City", name: "Bangalore" },
        ],
        serviceType: [
          "Video Production",
          "Brand Film Production",
          "Commercial Ad Production",
          "Instagram Reel Production",
          "Product Video Production",
          "Corporate Video Production",
        ],
        priceRange: "₹₹₹",
        foundingDate: "2018",
        sameAs: [
          "https://www.instagram.com/digitalkalakaar_productions/",
        ],
        knowsAbout: [
          "Video Production",
          "Brand Storytelling",
          "Commercial Filmmaking",
          "Social Media Content",
          "Digital Marketing",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Digital Kalakaar Productions",
        description: "Production house for ads, reels, and brand films in India",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/work`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "Digital Kalakaar | Production House for Ads, Reels & Brand Films in India",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-IN",
        description:
          "Digital Kalakaar is a top production house in New Delhi crafting TV commercials, brand films, Instagram reels, and digital content.",
      },
      {
        "@type": "VideoObject",
        name: "InstaQueen — Brand Commercial by Digital Kalakaar",
        description: "Brand commercial film produced by Digital Kalakaar Productions for InstaQueen.",
        thumbnailUrl: `${siteUrl}/opengraph-image`,
        contentUrl:
          "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371219480-d1dd6a9f-69e9-4194-9254-24d1710d3329.MP4",
        uploadDate: "2024-01-01",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "VideoObject",
        name: "Keventers — Social Content Film by Digital Kalakaar",
        description: "Social media content film produced by Digital Kalakaar Productions for Keventers.",
        thumbnailUrl: `${siteUrl}/opengraph-image`,
        contentUrl:
          "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776372090831-bc5f1238-f161-4d19-adf4-f02a22321508.mp4",
        uploadDate: "2023-01-01",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <html lang="en-IN" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev" />
        <link rel="dns-prefetch" href="https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev" />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
