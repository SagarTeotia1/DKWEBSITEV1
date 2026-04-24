import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://digitalkalakaarproductions.com";
  const today = new Date("2026-04-24");

  return [
    {
      url: `${siteUrl}/`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
