import type { Metadata } from "next";

const siteUrl = "https://digitalkalakaarproductions.com";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Digital Kalakaar's portfolio of commercials, brand films, social reels, and digital campaigns.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Our Work | Digital Kalakaar",
    description:
      "A curated showcase of production work across brand commercials, fashion films, and social media content.",
    url: `${siteUrl}/work`,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Digital Kalakaar Work Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | Digital Kalakaar",
    description:
      "Commercials, brand films, and social content crafted by Digital Kalakaar.",
    images: ["/twitter-image"],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
