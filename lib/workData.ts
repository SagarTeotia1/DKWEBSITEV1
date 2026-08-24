export interface WorkProject {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  video: string;
  description: string;
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    slug: "instaqueen-brand-commercial",
    title: "InstaQueen",
    client: "InstaQueen",
    category: "Brand Commercial",
    year: "2024",
    video:
      "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371219480-d1dd6a9f-69e9-4194-9254-24d1710d3329.MP4",
    description:
      "Brand commercial film produced by Digital Kalakaar Productions for InstaQueen — a TVC-style cinematic brand film shot in Delhi, built for broadcast and digital distribution.",
  },
  {
    slug: "mera-husband-fashion-film",
    title: "Mera Husband",
    client: "Mera Husband",
    category: "Fashion Film",
    year: "2023",
    video:
      "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/DK-WEBSITE/Mera%20Husband%20Trailer%20.mp4",
    description:
      "Fashion film and micro drama trailer produced by Digital Kalakaar Productions — serialised short-form dramatic content crafted for digital audiences in India.",
  },
  {
    slug: "wellbeing-nutritions-product-film",
    title: "Wellbeing Nutritions",
    client: "Wellbeing Nutritions",
    category: "Product Film",
    year: "2024",
    video: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/DK-WEBSITE/Wellbeing%20Ad%20.mp4",
    description:
      "Product film for Wellbeing Nutritions by Digital Kalakaar Productions, Delhi — a high-quality product video showcasing health supplements for digital and social distribution.",
  },
  {
    slug: "astrotalk-digital-content",
    title: "Astrotalk",
    client: "Astrotalk",
    category: "Digital Content",
    year: "2024",
    video: "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/DK-WEBSITE/Astrotalk%20shadi1.mp4",
    description:
      "Digital content film for Astrotalk by Digital Kalakaar Productions — a social media ad campaign produced in Delhi for one of India's leading astrology platforms.",
  },
  {
    slug: "keventers-social-content",
    title: "Keventers",
    client: "Keventers",
    category: "Social Content",
    year: "2023",
    video:
      "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776372090831-bc5f1238-f161-4d19-adf4-f02a22321508.mp4",
    description:
      "Social media content film produced by Digital Kalakaar Productions for Keventers — a brand reel built for Instagram and digital platforms.",
  },
];

export function getWorkBySlug(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug);
}
