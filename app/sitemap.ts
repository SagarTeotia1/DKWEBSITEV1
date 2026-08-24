import type { MetadataRoute } from "next";
import { SERVICES_DATA } from "@/lib/servicesData";
import { WORK_PROJECTS } from "@/lib/workData";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://digitalkalakaarproductions.com";
  const today = new Date();

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
    {
      url: `${siteUrl}/services`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...SERVICES_DATA.map((s) => ({
      url: `${siteUrl}/services/${s.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...WORK_PROJECTS.map((p) => ({
      url: `${siteUrl}/work/${p.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
