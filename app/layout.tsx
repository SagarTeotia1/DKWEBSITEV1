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
    default: "Digital Kalakaar | Best Production House in Delhi NCR — Brand Films, TVC & Reels",
    template: "%s | Digital Kalakaar Productions",
  },
  description:
    "Digital Kalakaar is Delhi's top production house for brand films, TVC commercials, Instagram reels, short films, micro dramas, documentaries, UGC videos & voxpops. 50+ brands served across India since 2018 — Astrotalk, Keventers, PolicyBazaar, Shaadi.com.",
  keywords: [
    // Brand
    "Digital Kalakaar",
    "Digital Kalakaar Productions",
    // Core — location
    "production house Delhi",
    "production house Delhi NCR",
    "best production house in Delhi",
    "top production house Delhi",
    "best production house Delhi NCR",
    "production house New Delhi India",
    "video production company Delhi",
    "video production agency Delhi NCR",
    "film production company Delhi",
    "creative production house Delhi",
    // Services — brand films
    "brand film production Delhi",
    "brand film production India",
    "brand storytelling video Delhi",
    // Services — TVC
    "TVC production Delhi",
    "TV commercial production Delhi",
    "TVC ad production India",
    "television commercial production Delhi NCR",
    // Services — reels
    "Instagram reel production Delhi",
    "reel production agency Delhi",
    "brand reel production India",
    "social media reel agency Delhi",
    // Services — short films
    "short film production Delhi",
    "short film production India",
    // Services — micro drama
    "micro drama production India",
    "micro drama production Delhi",
    "serialised short drama production",
    // Services — documentary
    "documentary production Delhi",
    "documentary production India",
    // Services — UGC
    "UGC video production Delhi",
    "UGC content creation agency India",
    "user generated content agency Delhi",
    // Services — voxpop
    "voxpop production agency India",
    "voxpop video production Delhi",
    // Services — corporate & product
    "corporate video production Delhi",
    "corporate video Delhi NCR",
    "product video production Delhi",
    "product shoot Delhi",
    "fashion film production Delhi",
    "fashion film India",
    // Services — digital
    "digital content agency Delhi",
    "social media video production Delhi",
    "commercial ad production Delhi",
    "advertising film production Delhi",
    "digital ad film production India",
    // Location variants
    "production house Noida",
    "production house Gurugram",
    "production house Gurgaon",
    "production house Faridabad",
    "video production company NCR",
    "brand film agency India",
    // General
    "production house near me",
    "best video production company India",
    "best video production house India",
  ],
  alternates: {
    canonical: "/",
  },
  applicationName: "Digital Kalakaar",
  category: "business",
  openGraph: {
    title: "Digital Kalakaar | Best Production House in Delhi NCR — Brand Films, TVC & Reels",
    description:
      "Delhi's top production house for brand films, TVC commercials, Instagram reels, short films, micro dramas, documentaries, UGC & voxpops. 50+ brands served — Astrotalk, Keventers, PolicyBazaar.",
    url: siteUrl,
    siteName: "Digital Kalakaar Productions",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Digital Kalakaar Productions — Best Production House in Delhi NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Kalakaar | Best Production House Delhi NCR",
    description:
      "Brand films, TVC commercials, reels, micro dramas, short films & digital content crafted in Delhi for brands across India.",
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
        alternateName: ["Digital Kalakaar", "DK Productions"],
        url: siteUrl,
        email: "digitalkalakaarproductions@gmail.com",
        telephone: "+918851475517",
        slogan: "Where Vision Meets Craft",
        description:
          "Digital Kalakaar Productions is Delhi NCR's best production house, specialising in brand films, TVC commercials, Instagram reels, short films, micro dramas, documentaries, UGC videos, and voxpops for brands across India since 2018.",
        image: `${siteUrl}/opengraph-image`,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "New Delhi",
          addressLocality: "New Delhi",
          addressRegion: "Delhi",
          postalCode: "110001",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 28.6139,
          longitude: 77.209,
        },
        hasMap: "https://maps.google.com/?q=New+Delhi+India",
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "City", name: "New Delhi" },
          { "@type": "City", name: "Delhi" },
          { "@type": "City", name: "Noida" },
          { "@type": "City", name: "Gurugram" },
          { "@type": "City", name: "Gurgaon" },
          { "@type": "City", name: "Faridabad" },
          { "@type": "City", name: "Mumbai" },
          { "@type": "City", name: "Bangalore" },
          { "@type": "City", name: "Hyderabad" },
          { "@type": "AdministrativeArea", name: "Delhi NCR" },
        ],
        serviceType: [
          "Brand Film Production",
          "TVC Commercial Production",
          "Instagram Reel Production",
          "Short Film Production",
          "Micro Drama Production",
          "Documentary Production",
          "UGC Video Production",
          "Voxpop Production",
          "Corporate Video Production",
          "Product Video Production",
          "Fashion Film Production",
          "Social Media Video Production",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Video Production Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Brand Reels",
                description:
                  "Scroll-stopping branded reels for Instagram, YouTube Shorts, and social media. Platform-native storytelling that turns views into brand recall.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "TVC Ads",
                description:
                  "Television commercials with cinematic precision — from concept to colour grade. Broadcast-quality spots that drive mass audience action.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Storytelling Videos",
                description:
                  "Brand stories and emotional campaigns that forge authentic connections with audiences and leave lasting impressions.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Short Films",
                description:
                  "Award-worthy short films that showcase vision, talent, and craft with impact and economy in every second.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Micro Dramas",
                description:
                  "Serialised short-form dramatic content engineered for social platforms — high-concept stories in compact formats.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Documentaries",
                description:
                  "In-depth documentary productions exploring real stories with cinematic depth and journalistic rigour.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "UGC Videos",
                description:
                  "User-generated-style content that feels native to the platform — raw authenticity with strategic intent.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Voxpops",
                description:
                  "Street-style interviews and opinion captures surfacing genuine reactions — social proof in its most credible form.",
              },
            },
          ],
        },
        priceRange: "₹₹₹",
        foundingDate: "2018",
        numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+918851475517",
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["Hindi", "English"],
          },
          {
            "@type": "ContactPoint",
            email: "digitalkalakaarproductions@gmail.com",
            contactType: "sales",
            areaServed: "IN",
          },
        ],
        sameAs: [
          "https://www.instagram.com/digitalkalakaar_productions/",
        ],
        knowsAbout: [
          "Video Production",
          "Brand Storytelling",
          "Commercial Filmmaking",
          "Television Commercial Production",
          "Social Media Content",
          "Short Film Direction",
          "Micro Drama Production",
          "Documentary Filmmaking",
          "UGC Content Strategy",
          "Digital Marketing",
          "Fashion Filmmaking",
          "Post Production",
          "Colour Grading",
          "Motion Graphics",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Digital Kalakaar Productions",
        description:
          "Best production house in Delhi NCR — brand films, TVC ads, reels, short films, micro dramas, documentaries, UGC & voxpops",
        publisher: { "@id": `${siteUrl}/#organization` },
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
        name: "Digital Kalakaar | Best Production House in Delhi NCR — Brand Films, TVC & Reels",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-IN",
        description:
          "Digital Kalakaar Productions — Delhi NCR's best video production house. Brand films, TVC commercials, Instagram reels, short films, micro dramas, documentaries, UGC videos & voxpops for 50+ Indian brands.",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", "#about p", "#services h2"],
        },
      },
      // Videos
      {
        "@type": "VideoObject",
        name: "InstaQueen Brand Commercial — Digital Kalakaar Productions",
        description:
          "Brand commercial film produced by Digital Kalakaar Productions for InstaQueen. TVC-style cinematic brand film shot in Delhi.",
        thumbnailUrl: `${siteUrl}/opengraph-image`,
        contentUrl:
          "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776371219480-d1dd6a9f-69e9-4194-9254-24d1710d3329.MP4",
        uploadDate: "2024-01-01",
        duration: "PT1M",
        publisher: { "@id": `${siteUrl}/#organization` },
        keywords: "brand commercial, TVC, production house Delhi",
      },
      {
        "@type": "VideoObject",
        name: "Keventers Social Content Film — Digital Kalakaar Productions",
        description:
          "Social media content film produced by Digital Kalakaar Productions for Keventers. Brand reel for Instagram and digital platforms.",
        thumbnailUrl: `${siteUrl}/opengraph-image`,
        contentUrl:
          "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/videos/1776372090831-bc5f1238-f161-4d19-adf4-f02a22321508.mp4",
        uploadDate: "2023-01-01",
        duration: "PT1M",
        publisher: { "@id": `${siteUrl}/#organization` },
        keywords: "social content, brand reel, Instagram, Keventers",
      },
      {
        "@type": "VideoObject",
        name: "Wellbeing Nutritions Product Film — Digital Kalakaar Productions",
        description:
          "Product film for Wellbeing Nutritions by Digital Kalakaar Productions, Delhi. High-quality product video showcasing health supplements.",
        thumbnailUrl: `${siteUrl}/opengraph-image`,
        contentUrl:
          "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/DK-WEBSITE/Wellbeing%20Ad%20.mp4",
        uploadDate: "2024-01-01",
        duration: "PT1M",
        publisher: { "@id": `${siteUrl}/#organization` },
        keywords: "product film, product video, Delhi production house",
      },
      {
        "@type": "VideoObject",
        name: "Astrotalk Digital Content — Digital Kalakaar Productions",
        description:
          "Digital content film for Astrotalk by Digital Kalakaar Productions. Social media ad campaign produced in Delhi.",
        thumbnailUrl: `${siteUrl}/opengraph-image`,
        contentUrl:
          "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/DK-WEBSITE/Astrotalk%20shadi1.mp4",
        uploadDate: "2024-01-01",
        duration: "PT1M",
        publisher: { "@id": `${siteUrl}/#organization` },
        keywords: "digital content, social ad, Astrotalk, Delhi production",
      },
      {
        "@type": "VideoObject",
        name: "InstaQueen Micro Drama Trailer — Digital Kalakaar Productions",
        description:
          "Micro drama trailer produced by Digital Kalakaar Productions. Short-form serialised dramatic content for social platforms.",
        thumbnailUrl: `${siteUrl}/opengraph-image`,
        contentUrl:
          "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/DK-WEBSITE/Instaqueen%20trailer.MP4",
        uploadDate: "2024-01-01",
        duration: "PT2M",
        publisher: { "@id": `${siteUrl}/#organization` },
        keywords: "micro drama, short drama, social series, production house Delhi",
      },
      {
        "@type": "VideoObject",
        name: "Mera Husband Micro Drama — Digital Kalakaar Productions",
        description:
          "Micro drama produced by Digital Kalakaar Productions. Serialised short-form content crafted for digital audiences in India.",
        thumbnailUrl: `${siteUrl}/opengraph-image`,
        contentUrl:
          "https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev/DK-WEBSITE/Mera%20Husband%20Trailer%20.mp4",
        uploadDate: "2023-01-01",
        duration: "PT2M",
        publisher: { "@id": `${siteUrl}/#organization` },
        keywords: "micro drama, Hindi drama, digital series, Delhi production",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Digital Kalakaar Productions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Digital Kalakaar Productions is Delhi NCR's best production house, founded in 2018 and based in New Delhi, India. We specialise in brand films, TVC commercials, Instagram reels, short films, micro dramas, documentaries, UGC videos, and voxpops for brands across India.",
        },
      },
      {
        "@type": "Question",
        name: "What services does Digital Kalakaar offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Digital Kalakaar offers 8 core video production services: (1) Brand Reels — scroll-stopping Instagram and social media reels; (2) TVC Ads — broadcast-quality TV commercials; (3) Storytelling Videos — emotional brand narratives; (4) Short Films — cinematic award-quality shorts; (5) Micro Dramas — serialised short-form social content; (6) Documentaries — in-depth real story films; (7) UGC Videos — authentic user-generated style content; (8) Voxpops — street-style interview videos.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Digital Kalakaar Productions located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Digital Kalakaar Productions is located in New Delhi, India. We serve clients across Delhi NCR including Noida, Gurugram, Gurgaon, and Faridabad, as well as brands in Mumbai, Bangalore, and across India.",
        },
      },
      {
        "@type": "Question",
        name: "Which brands has Digital Kalakaar worked with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Digital Kalakaar has produced content for 50+ brands including Astrotalk, Keventers, PolicyBazaar, Shaadi.com, Wellbeing Nutritions, The Indus Valley, MicroKahani, Vahaflix, Stage, BJP, Government of India, GoGoGo, Viralo, Athrox, TipTop, and Crafto.",
        },
      },
      {
        "@type": "Question",
        name: "Is Digital Kalakaar the best production house in Delhi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Digital Kalakaar Productions is one of Delhi's top production houses with 7+ years of experience, 50+ brand clients, and a portfolio spanning TVC commercials, brand films, Instagram reels, micro dramas, short films, and documentaries. We serve brands across Delhi NCR and all of India.",
        },
      },
      {
        "@type": "Question",
        name: "Does Digital Kalakaar produce TVC commercials?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Digital Kalakaar Productions specialises in TVC (television commercial) production with broadcast-quality output. We handle everything from concept development and scripting to filming, post-production, and colour grading for TV and digital platforms.",
        },
      },
      {
        "@type": "Question",
        name: "Can Digital Kalakaar create Instagram reels for my brand?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Digital Kalakaar produces scroll-stopping branded reels for Instagram, YouTube Shorts, and all social media platforms. Our reels are platform-native, designed for attention and retention, and built to turn quick views into lasting brand recall.",
        },
      },
      {
        "@type": "Question",
        name: "Does Digital Kalakaar produce micro dramas and short films?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Digital Kalakaar specialises in both micro dramas (serialised short-form dramatic content for social platforms) and short films (award-worthy cinema-quality shorts). We have produced micro drama series for OTT and social media audiences in India.",
        },
      },
      {
        "@type": "Question",
        name: "How do I contact Digital Kalakaar for video production?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Contact Digital Kalakaar Productions by email at digitalkalakaarproductions@gmail.com, by phone or WhatsApp at +91 88514 75517, or via the contact section on our website at digitalkalakaarproductions.com.",
        },
      },
      {
        "@type": "Question",
        name: "Does Digital Kalakaar serve brands outside Delhi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. While based in New Delhi, Digital Kalakaar Productions serves brands across India including Mumbai, Bangalore, Hyderabad, and all of Delhi NCR (Noida, Gurugram, Gurgaon, Faridabad). We have produced content for national brands and government campaigns.",
        },
      },
    ],
  };

  return (
    <html lang="en-IN" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev" />
        <link rel="dns-prefetch" href="https://pub-753e2e06a0a3437b9cef4cda8815d7a9.r2.dev" />
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="New Delhi" />
        <meta name="geo.position" content="28.6139;77.2090" />
        <meta name="ICBM" content="28.6139, 77.2090" />
        <meta name="DC.title" content="Digital Kalakaar Productions — Best Production House Delhi NCR" />
        <meta name="DC.description" content="Delhi NCR's best production house for brand films, TVC ads, reels, short films, micro dramas, documentaries, UGC & voxpops." />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
