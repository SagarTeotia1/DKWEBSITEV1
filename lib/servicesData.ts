export interface ServiceData {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  keywords: string[];
}

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: "brand-reels",
    number: "01",
    title: "Brand Reels",
    tagline: "Hook fast. Stay memorable.",
    description:
      "Scroll-stopping branded reels crafted for attention and retention. Platform-native storytelling designed to turn quick views into lasting brand recall.",
    longDescription:
      "Digital Kalakaar produces Instagram, YouTube Shorts, and Reels content built specifically for the mobile feed — vertical framing, sub-3-second hooks, and pacing tuned to platform algorithms. Every reel is scripted, shot, and edited in-house in Delhi NCR for brands that need consistent, scroll-stopping social content on a recurring cadence.",
    keywords: ["Instagram reel production Delhi", "brand reel production India", "reel production agency Delhi NCR"],
  },
  {
    slug: "tvc-ads",
    number: "02",
    title: "TVC Ads",
    tagline: "Broadcast quality. Every frame.",
    description:
      "Television commercials built with cinematic precision. From concept to colour grade, we create spots that captivate mass audiences and drive action.",
    longDescription:
      "Full-service TVC commercial production for TV and digital broadcast — concept development, scripting, casting, filming, and colour grading handled end-to-end by Digital Kalakaar Productions in Delhi. Our TVC work is built for mass-audience reach while holding up to broadcast-standard technical requirements.",
    keywords: ["TVC production Delhi", "TV commercial production Delhi", "television commercial production Delhi NCR"],
  },
  {
    slug: "storytelling-videos",
    number: "03",
    title: "Storytelling Videos",
    tagline: "Narratives that move people",
    description:
      "Brand stories and emotional campaigns that forge authentic connections. We craft visual narratives that linger long after the screen goes dark.",
    longDescription:
      "Brand films and storytelling videos built around a genuine narrative arc rather than a product list — used by brands that want to build emotional recall, not just impressions. Digital Kalakaar's Delhi-based team handles direction, cinematography, and post to deliver campaign films that hold attention start to finish.",
    keywords: ["brand film production Delhi", "brand storytelling video Delhi", "brand film production India"],
  },
  {
    slug: "short-films",
    number: "04",
    title: "Short Films",
    tagline: "Art with intention.",
    description:
      "Award-worthy short films that showcase vision, talent, and craft. Stories told with economy and impact — every second earns its place.",
    longDescription:
      "Cinematic short film production for brands, festivals, and independent narrative work. Digital Kalakaar's short film credits span fiction and branded-entertainment formats, produced with the same craft discipline as commercial work — full pre-production, direction, and colour-graded post.",
    keywords: ["short film production Delhi", "short film production India"],
  },
  {
    slug: "micro-dramas",
    number: "05",
    title: "Micro Dramas",
    tagline: "Short. Sharp. Unforgettable.",
    description:
      "Serialised short-form dramatic content engineered for social platforms. High-concept stories in compact formats that demand to be rewatched.",
    longDescription:
      "Micro drama production — serialised, high-concept short-form dramatic series built for Instagram, YouTube Shorts, and OTT micro-drama platforms. Digital Kalakaar has produced multiple micro drama series and trailers for social and digital audiences across India, one of the fastest-growing video formats in the country.",
    keywords: ["micro drama production India", "micro drama production Delhi", "serialised short drama production"],
  },
  {
    slug: "documentaries",
    number: "06",
    title: "Documentaries",
    tagline: "Truth, beautifully told.",
    description:
      "In-depth documentary productions exploring real stories with cinematic depth. Journalistic rigour meets visual artistry.",
    longDescription:
      "Documentary production combining journalistic research with cinematic visual language — corporate documentaries, brand-origin films, and independent documentary work produced by Digital Kalakaar's Delhi team from research through final delivery.",
    keywords: ["documentary production Delhi", "documentary production India"],
  },
  {
    slug: "ugc-videos",
    number: "07",
    title: "UGC Videos",
    tagline: "Authentic. Scalable. Effective.",
    description:
      "User-generated-style content that feels native to the platform. Raw authenticity, strategic intent — the kind of content people actually share.",
    longDescription:
      "UGC (user-generated content) video production designed to look and feel native to the platform it runs on — unpolished-but-strategic testimonial, demo, and lifestyle-style content that performs in paid social because it doesn't read as an ad. Digital Kalakaar is one of Delhi's dedicated UGC content production teams, producing UGC at scale for performance marketing and organic social.",
    keywords: ["UGC video production Delhi", "UGC content creation agency India", "user generated content agency Delhi"],
  },
  {
    slug: "voxpops",
    number: "08",
    title: "Voxpops",
    tagline: "Real voices. Real impact.",
    description:
      "Street-style interviews and opinion captures that surface genuine reactions. Social proof in its most credible, compelling form.",
    longDescription:
      "Voxpop (vox populi) video production — street-style interviews and public opinion captures used as authentic social proof for brand and campaign content. Digital Kalakaar produces voxpop series across Delhi NCR for brands that want real, unscripted audience reactions on camera.",
    keywords: ["voxpop production agency India", "voxpop video production Delhi"],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}
