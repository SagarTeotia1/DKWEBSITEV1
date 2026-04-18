import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://digitalkalakaarproductions.com";

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-04-18"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date("2026-04-18"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
