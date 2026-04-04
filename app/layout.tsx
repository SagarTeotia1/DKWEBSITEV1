import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Kalakaar — Commercials, Films & Digital Content",
  description:
    "Digital Kalakaar is a premium production house crafting cinematic commercials, brand films, and digital content that moves audiences.",
  keywords: "Digital Kalakaar, production house, commercials, brand films, video production, digital content",
  openGraph: {
    title: "Digital Kalakaar Production",
    description: "Where Stories Come Alive.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
