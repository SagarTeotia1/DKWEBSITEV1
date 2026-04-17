import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://digitalkalakaarproductions.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Digital Kalakaar | Production House for Ads, Reels, and Brand Films",
    template: "%s | Digital Kalakaar",
  },
  description:
    "Digital Kalakaar is a creative production house in India crafting commercials, brand films, social media reels, and digital content for modern brands.",
  keywords: [
    "Digital Kalakaar",
    "production house",
    "video production company India",
    "brand film production",
    "commercial ad production",
    "reel production agency",
    "social media video production",
    "creative production studio",
  ],
  alternates: {
    canonical: "/",
  },
  applicationName: "Digital Kalakaar",
  category: "business",
  openGraph: {
    title: "Digital Kalakaar | Production House for Ads, Reels, and Brand Films",
    description:
      "Where stories come alive through cinematic commercials, brand films, and high-performing digital content.",
    url: siteUrl,
    siteName: "Digital Kalakaar",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Digital Kalakaar - Production House",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Kalakaar | Production House",
    description:
      "Commercials, brand films, and digital content crafted to move audiences and grow brands.",
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
  maximumScale: 1,
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
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Digital Kalakaar",
        url: siteUrl,
        email: "digitalkalakaarproductions@gmail.com",
        telephone: "+91 8851475517",
        logo: `${siteUrl}/icon.png`,
        sameAs: ["https://www.instagram.com/"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Digital Kalakaar",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <html lang="en-IN">
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
