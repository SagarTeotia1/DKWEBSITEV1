# SEO / AEO / GEO Audit & Strategy — Digital Kalakaar Productions
**Domain:** digitalkalakaarproductions.com | **Focus:** Delhi & Delhi NCR production-house search | **Date:** 2026-08-24

---

## Executive Summary

The codebase is already unusually SEO-mature for a small production house — full JSON-LD entity graph (Organization/LocalBusiness/ProfessionalService), FAQPage schema, VideoObject schema, per-page metadata, OG/Twitter cards, geo meta tags, and hidden SEO-rich copy targeting "best production house Delhi NCR." Most agencies would bill for exactly this. **The gap is not on-page technical SEO — it's site depth (2-URL sitemap for a business chasing 60+ keywords), off-site entity consolidation, and unverifiable authority claims.**

Two things need attention before anything else:

1. **The site has only 2 indexable URLs** (`/` and `/work`). Every service, every location, every FAQ answer is crammed into one homepage. This caps topical authority and gives AI answer engines almost nothing to cite beyond the homepage.
2. **The "15M followers / 200M monthly views" claim does not match any discoverable account tied to this business** — see Authority & Social Proof Verification below. This must not go on the site as-is.

---

## Scope & Inputs

- **Full read** of the Next.js codebase: `app/layout.tsx`, `app/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/work/page.tsx` + `layout.tsx`, all components in `components/`.
- **Live fetch** of `https://www.digitalkalakaarproductions.com/` (rendered title/H1/headings confirmed to match source), `sitemap.xml`, and `about.php`.
- **Public web search** for competitor rankings and social-account verification (Instagram, YouTube).
- **Not assessed:** Core Web Vitals lab data (no PageSpeed API access here — recommend running PageSpeed Insights / Search Console directly), backlink profile (needs Ahrefs/Semrush/GSC access), Google Business Profile status (needs GBP dashboard access), actual analytics numbers.

---

## Findings

### Technical SEO — Good, with one structural gap

- ✅ `robots.ts` allows all major bots, correctly disallows `/api/`, `/_next/`, `/static/`, references sitemap + host.
- ✅ `sitemap.ts` valid, but **only 2 URLs**. `lastModified` is a hardcoded static date (`2026-04-24`), not dynamic — every future deploy will show a stale lastmod unless someone remembers to update the literal string. **Fix:** use `new Date()` at build time or per-route real content dates.
- ✅ Canonical tags present (`alternates.canonical`) on both pages.
- ✅ `metadataBase` set correctly, avoiding relative-URL OG image bugs.
- ✅ Google Search Console verification file present (`google15738449dba00665.html`) — site is verified in GSC. **Action:** pull actual Coverage/Performance data from GSC — that data exists and wasn't accessible here.
- ⚠️ **Legacy `/about.php` URL returns HTTP 403**, and Google/search snippets still show it indexed (`"about us - Digital Kalakaar" — digitalkalakaarproductions.com/about.php`). A 403 (not a clean 404 or 301) on a URL still surfacing in search results is a crawl-error signal in GSC and a dead link in the index. **Fix:** either 301-redirect `/about.php` to `/#about`, or serve a real 404/410 — never leave a blocked/forbidden legacy URL indexed.
- ⚠️ No `/work/[slug]` project detail pages — all 6 portfolio pieces live inside one client component array with no unique URLs, so no project can be individually indexed, linked to, or cited by an AI engine ("show me Digital Kalakaar's Astrotalk video" has no dedicated page to point to).
- ⚠️ Core Web Vitals not measured here — flag: homepage renders **6 muted autoplay videos** in `ReelSection`/`WorkPage` grid. Desktop `GridCard` correctly lazy-loads via `IntersectionObserver` (good), but confirm LCP isn't the hero background video/particle animation stack — run PageSpeed Insights on `/` and `/work` before shipping further changes.

### On-Page SEO — Strong copywriting, but real content is invisible

- ✅ Title/meta description on `/` and `/work` are keyword-rich, location-anchored, under reasonable length, and template-based (`%s | Digital Kalakaar Productions`).
- ✅ H1 present on homepage (`Hero.tsx` — `sr-only`, keyword-loaded) and on `/work` (`work/layout.tsx` — `sr-only`).
- ⚠️ **Both H1s are `sr-only`** (screen-reader-only, visually hidden) — so is the entire "Our Video Production Services in Delhi NCR" block with H2/H3/keyword copy in `AboutSection.tsx` (lines 136–166). This is not cloaking (content matches what's semantically true, nothing shown to bots that contradicts the page), but it means **every keyword-dense sentence on the site is invisible to a human visitor** and lives only for crawlers. Two consequences:
  - Google's helpful-content systems increasingly weight content that real users actually see/engage with. Hidden text carries less weight than the same text rendered visibly.
  - For AEO/GEO, an AI engine quoting your page will quote the *visible* rendered text a browser/crawler extracts as primary content — hidden SEO blocks are a weaker citation source than genuinely on-page, laid-out answers.
  - **Fix:** convert the sr-only FAQ/service block in `AboutSection.tsx` into a real, visible FAQ accordion section on the page (see Quick Wins) instead of hiding it.
- ✅ Client logos have descriptive `alt` text (`ClientsSection.tsx` line 197).
- ⚠️ No image `alt` audit possible for hero/video content since it's all `<video>`, not `<img>` — fine for SEO, but means zero image search surface. No `og:image` alt beyond the generated OG card.
- ⚠️ Internal linking is thin: homepage → `/work` and anchor jumps (`#about`, `#services`, `#contact`) only. No cross-links from `/work` back into individual service copy, no blog to link out from.
- ⚠️ `ContactSection.tsx` exists in the codebase but **is not rendered anywhere** (`app/page.tsx` never imports it) — and it contains **wrong contact details**: `hello@digitalkalakaar.com` and a placeholder phone `+91 98XXX XXXXX`, versus the real `digitalkalakaarproductions@gmail.com` / `+91 88514 75517` used everywhere else (schema, Footer). This is dead code today, but it's a NAP (Name/Address/Phone) landmine if anyone re-enables it without updating the copy — inconsistent NAP directly hurts local SEO trust signals. **Fix:** delete the component or correct its contact data now, before it accidentally ships.

### AEO (Answer Engine Optimization) — Schema is excellent, surface presentation is the weak link

- ✅ `faqJsonLd` in `layout.tsx` covers 10 well-chosen, genuinely high-value questions ("Which is the best production house in Delhi?", "Does Digital Kalakaar produce TVC commercials?", pricing intent partially covered). This is exactly the AEO play.
- ⚠️ **These FAQs have zero visible UI.** No FAQ accordion, no visible Q&A block anywhere on the rendered page. Since Google restricted FAQPage rich-result eligibility to a narrow set of authoritative site types (health/government) in 2023, the *rich-snippet* upside of this schema is mostly gone — but the *AEO/GEO* upside (AI Overviews, ChatGPT/Perplexity/Gemini pulling structured Q&A) still depends partly on the answer being real, crawlable, human-visible content, not just a JSON-LD block with no on-page counterpart. **Fix:** build a visible "Frequently Asked Questions" section (Quick Win, ready markup below) that mirrors the JSON-LD 1:1.
- ⚠️ No pricing guidance anywhere — "How much does video production cost in Delhi?" is one of the highest-intent buyer questions in this vertical and currently has no answer on the site at all (not in FAQ schema, not in copy). Competitors who publish even rough pricing bands ("TVC production typically ₹X–Y lakh") win this query in AI Overviews because they give a citable number.
- ⚠️ No "What should I look for when hiring a production house?" content — a classic AEO-bait informational question with zero commercial risk to answer, currently entirely unaddressed.

### GEO (Generative Engine Optimization) — Entity is clear on-site, but fragmented off-site

- ✅ On-page entity clarity is genuinely good: `@graph` ties Organization → WebSite → WebPage → VideoObjects together with consistent `@id`s, `foundingDate`, `areaServed`, `serviceType`, `hasOfferCatalog`. An LLM crawling this page has an unambiguous, well-structured picture of who the company is and what it does.
- 🔴 **Critical: entity fragmentation across the web.** Public search surfaces at least these separate, differently-branded presences that all use "Digital Kalakaar" naming:
  - `instagram.com/digitalkalakaar` — **670K followers**, bio "Yahan milega videos ka bhandaar" (personal/creator-style content, not a production-house portfolio account)
  - YouTube `@digitalkalakaar` ("Digital Kalakaar - कलाकार") — **~55M total channel views, ~318K subscribers** per Social Blade/NoxInfluencer
  - `facebook.com/DigitalKalakaar`
  - A **second, separate domain**: `digitalkalakaar.in`
  - The site's own schema `sameAs` only lists `instagram.com/digitalkalakaar_productions/` — a **different handle** from any of the above
  - A legacy `.php` version of this same site is still surfacing in search (`digitalkalakaarproductions.com/about.php`, now 403)

  None of this is necessarily illegitimate — it's plausible the "Digital Kalakaar" personal/creator brand and "Digital Kalakaar Productions" the agency are run by the same founder(s) and represent a personal-brand-to-agency pipeline. But **as it stands, an AI system or a person searching cannot tell whether these are the same entity, a rebrand, a franchise, or unrelated businesses that happen to share a name.** This actively hurts GEO: LLMs favor entities with a single, consistent, cross-verified identity (consistent NAP, consistent social handles, `sameAs` links that actually resolve to accounts representing the same business).
  - **Fix (P1):** Decide and state explicitly, on the site, the actual relationship between "Digital Kalakaar" (creator brand, 670K IG / 55M YT) and "Digital Kalakaar Productions" (this website/agency). If they are the same lineage, say so ("From the team behind Digital Kalakaar — 55M+ views on YouTube — comes Digital Kalakaar Productions") and link the real, high-follower accounts in `sameAs`. If they are unrelated, do not imply a connection anywhere, and consider whether the naming collision itself is a liability worth addressing with a distinguishing brand mark ("DK Productions" is already used as `alternateName` in the schema — lean into it in visible copy too).
- ⚠️ `sameAs` array has exactly one entry. Add every verified real profile — YouTube, Facebook, LinkedIn, Vimeo — once the identity question above is resolved. A single-item `sameAs` gives Knowledge Graph / LLM entity resolution almost nothing to cross-reference.
- ⚠️ No `Person` entities for founders/leadership. GEO and E-E-A-T both reward named, credentialed humans behind a brand ("who directed this," "who founded this in 2018"). Currently the company is a faceless `Organization` with no team page.
- ⚠️ No third-party citations, press mentions, awards, or directory listings referenced anywhere (Clutch, DesignRush, industry press, IMDb for any film/short-film credits). GEO citation-worthiness improves substantially when independent sources corroborate what the site claims about itself — right now every claim ("best production house," "award-winning") is self-asserted with no external backing.

### Local SEO — Delhi / Delhi NCR — Foundations present, GBP unverified

- ✅ `LocalBusiness`/`ProfessionalService` schema present with address, geo-coordinates, `areaServed` covering Delhi, New Delhi, Noida, Gurugram, Gurgaon, Faridabad, plus Mumbai/Bangalore/Hyderabad reach.
- ✅ `geo.region`, `geo.placename`, `geo.position`, `ICBM` meta tags present in `<head>` — old-school but still read by some local-intent crawlers.
- ⚠️ **Cannot verify Google Business Profile exists, is claimed, or matches this NAP** — this is the single highest-leverage local-pack lever and it's outside what's checkable from the codebase. Verify: GBP listed as "New Delhi," category set to Video Production Service / Production Company, phone `+91 88514 75517` matching exactly, photos/videos uploaded, at least a few reviews.
- ⚠️ Address in schema is generic (`streetAddress: "New Delhi"`, no actual street address, `postalCode: 110001`) — if this doesn't match a real, verifiable GBP address, it will actively work against local-pack trust rather than for it. A precise, real studio/office address (even if it's a small production office, not client-facing) is what local ranking algorithms cross-check.
- ⚠️ No dedicated location content beyond keyword lists. Per the brief's own instruction — **don't build doorway pages by swapping city names.** Correct call: don't create `/production-house-noida`, `/production-house-gurugram`, etc. as thin clones. Instead, the one thing worth doing is a single **"Delhi NCR Coverage" section on the homepage or About page** naming specific neighborhoods/business hubs actually served (Cyber City Gurugram, Sector 62 Noida, CP/Connaught Place, etc.) — genuinely useful specificity, not duplication.

### Competitor Gap Analysis (public search only)

Real competitors surfacing for "best production house in Delhi NCR" today: **Swastika Films**, **Rainsong Films** (Gurugram), **Garage Productions**, **Forever Big Entertainment (FBE Films)**, **Cybertize Media Productions**, **Good Morning Films**.

Patterns worth noting without deep-crawling each competitor:
- Several lead with "100% in-house" production capability as a trust/differentiation claim — Digital Kalakaar's site doesn't currently make this kind of capability claim (in-house edit bay, own equipment, in-house VFX) anywhere, which is a common client-trust question ("do you outsource post?").
- None of the ranking competitors appear (from title patterns) to have the schema depth this site already has — **that's a real advantage once the content-depth gap above is closed.**
- Competitor domain patterns suggest most are single-service-focused (film production, or corporate video) rather than the 8-service breadth this site claims — breadth is a differentiator worth making more visible in title tags for service-specific searches ("TVC production Delhi," "micro drama production Delhi") by giving each service its own indexable page rather than one carousel slide with no URL.

### Authority & Social Proof — Verification Required Before Publishing Any Numbers

The brief asked to verify the claimed **15M organic followers / 200M monthly views** before use. Findings:

- The only publicly discoverable accounts plausibly connected to the "Digital Kalakaar" name are: Instagram `@digitalkalakaar` (**670K** followers) and YouTube `@digitalkalakaar` (**~55M lifetime channel views**, ~318K subscribers).
- **Neither figure supports "15M followers" or "200M monthly views."** 670K is nowhere near 15M followers; 55M is a *lifetime* YouTube total, not "200M monthly" on any platform found.
- The Instagram handle actually referenced in this site's own schema (`digitalkalakaar_productions`) is a *third, distinct* handle not appearing in public follower-count searches at all here.
- **Recommendation: do not publish "15M followers / 200M monthly views" anywhere on the site or in outreach material until the client supplies first-party analytics (Instagram/YouTube/TikTok dashboard screenshots or Meta Business Suite / YouTube Studio exports) that substantiate the number and specify which account(s) and time window it covers.** Publishing an unverifiable claim of this size is a real reputational and (in ad-industry pitch contexts) potentially FTC/ASCI-adjacent risk if a prospective client checks. If the number is real but spread across a family of accounts/campaigns rather than one handle, the site should say that explicitly ("across our network of channels") rather than imply one account carries it.

---

## Prioritized Action Plan

### P0 — Critical (do first, hours to 1 day each)

| # | Problem | Fix | Page | Benefit | Measure |
|---|---|---|---|---|---|
| 1 | `/about.php` returns 403, still indexed | 301-redirect to `/` (or `/#about`) in `next.config` redirects, or serve clean 404 | domain-level | Removes crawl error, consolidates link equity | GSC Coverage report — error resolved |
| 2 | Sitemap `lastModified` hardcoded to a fixed literal date | Replace with `new Date()` (build time) or real per-page last-edit date | `app/sitemap.ts` | Accurate freshness signal | Check sitemap.xml after next deploy |
| 3 | Unverified "15M followers/200M views" claim | Do not publish; request real analytics export before any authority-claim copy | site-wide | Avoids false-claim risk | Client provides verified source before copy ships |
| 4 | `ContactSection.tsx` has wrong NAP data, unused but landmine | Delete file or correct email/phone to match real NAP | `components/ContactSection.tsx` | Prevents future NAP inconsistency | Confirm file removed/corrected in repo |

### P1 — High Impact (days)

| # | Problem | Fix | Page | Benefit | Dependencies |
|---|---|---|---|---|---|
| 5 | Only 2 indexable URLs | Ship individual pages: `/services`, `/services/[slug]` (8 services), `/work/[slug]` (per-project), `/about` | new routes | Topical depth, more AI-citable units, more query coverage | none |
| 6 | FAQ content is schema-only, invisible to users | Build a real, visible FAQ accordion on homepage using the existing 10 Q&As verbatim | `app/page.tsx` + new `FAQSection.tsx` | Stronger AEO citation source, better UX, still keeps JSONLD in sync | none |
| 7 | No pricing guidance | Add a "What does video production cost in Delhi?" answer with real ranges (even bands: "Reels from ₹X, TVC from ₹Y") | new FAQ entry + `/services` | Captures highest-intent buyer question; big AEO win | Client must supply real pricing bands |
| 8 | `sameAs` has 1 entry; entity fragmented across domains/handles | Resolve relationship between "Digital Kalakaar" creator brand and "Digital Kalakaar Productions"; add verified real profiles to `sameAs`; redirect/disclaim `digitalkalakaar.in` if related | `app/layout.tsx` schema + copy | Major GEO entity-consolidation win | Client input on account ownership |
| 9 | GBP status unverified | Audit/claim/optimize Google Business Profile: category, real address, hours, phone match, photos, Q&A, first reviews | external | Local pack visibility — likely single biggest local lever available | Access to Google Business account |
| 10 | No named humans behind the brand | Add a small "Leadership"/"Founders" block with real names, roles, credentials, headshots + `Person` schema | new `/about` or section | E-E-A-T + GEO (LLMs prefer attributable expertise) | Client bios/photos |

### P2 — Authority (weeks)

- Build 4–6 real **case studies** (not just logos): brand, challenge, approach, format, result if measurable (views/engagement client will share). Each gets its own URL + `Article`/`CreativeWork` schema.
- Pursue **digital PR**: pitch 2–3 completed projects to Indian marketing/ad-industry press (Storyboard18, exchange4media, Social Samosa) — real third-party citations do more for GEO than any on-page change.
- Get listed on relevant **directories** with NAP consistency: Clutch, DesignRush (production/video category), local Delhi business directories, JustDial/Sulekha (already dominant for Indian local search).
- Add genuine client **testimonials/quotes** (with permission) — even 3–5 real quotes with name+company beat zero.
- Publish a small **insights/blog** cluster (3–5 posts) around the informational queries already scoped: "What should I look for when hiring a production house," "TVC vs brand film — what's the difference," "How long does a brand film take to produce." Each links back into relevant service pages.

### P3 — Moat (long-term)

- Once `/services/[slug]` and `/work/[slug]` exist, build genuine topical clusters: each service page links to 2–3 relevant case studies and 1–2 blog posts; each blog post links back to the service and a location-relevant mention.
- Video-specific SEO: submit key portfolio videos to YouTube as well (currently hosted only on a private R2 bucket, invisible to YouTube's own massive search surface) with matching titles/descriptions — this also gives real `VideoObject` `contentUrl`/`embedUrl` targets Google trusts more than a CDN link.
- Ongoing monthly check of AI Overview / ChatGPT / Perplexity presence for the 5–8 highest priority queries (manual spot-check, see Measurement below) with content iteration based on what gets cited vs. what doesn't.

---

## Schema Markup — Ready to Paste

### Visible FAQ section component (mirrors existing `faqJsonLd` 1:1 — paste as `components/FAQSection.tsx` and render it in `app/page.tsx`)

```tsx
"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "Is Digital Kalakaar the best production house in Delhi?",
    a: "Digital Kalakaar Productions is one of Delhi's top production houses with 7+ years of experience, 50+ brand clients, and a portfolio spanning TVC commercials, brand films, Instagram reels, micro dramas, short films, and documentaries. We serve brands across Delhi NCR and all of India.",
  },
  {
    q: "What services does Digital Kalakaar offer?",
    a: "8 core services: Brand Reels, TVC Ads, Storytelling Videos, Short Films, Micro Dramas, Documentaries, UGC Videos, and Voxpops.",
  },
  {
    q: "Where is Digital Kalakaar Productions located?",
    a: "New Delhi, India — serving Delhi NCR (Noida, Gurugram, Gurgaon, Faridabad) plus Mumbai, Bangalore, Hyderabad and pan-India brands.",
  },
  {
    q: "Which brands has Digital Kalakaar worked with?",
    a: "50+ brands including Astrotalk, Keventers, PolicyBazaar, Shaadi.com, Wellbeing Nutritions, The Indus Valley, MicroKahani, Vahaflix, Stage, and Government of India campaigns.",
  },
  {
    q: "How do I contact Digital Kalakaar for video production?",
    a: "Email digitalkalakaarproductions@gmail.com or call/WhatsApp +91 88514 75517.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-[#0a0a0a] px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-cream text-3xl md:text-4xl mb-10" style={{ fontFamily: "var(--font-playfair)" }}>
          Frequently Asked Questions
        </h2>
        {FAQS.map((item, i) => (
          <div key={i} className="border-b border-white/10 py-5">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center text-left text-cream text-base md:text-lg"
              aria-expanded={open === i}
            >
              {item.q}
              <span className="text-gold ml-4">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <p className="mt-3 text-cream/60 text-sm leading-relaxed">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
```

### BreadcrumbList for future `/services/[slug]` pages

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://digitalkalakaarproductions.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://digitalkalakaarproductions.com/services" },
    { "@type": "ListItem", "position": 3, "name": "TVC Ads", "item": "https://digitalkalakaarproductions.com/services/tvc-ads" }
  ]
}
```

### Person schema (add once founder/leadership info is supplied)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Founder Name]",
  "jobTitle": "Founder & Creative Director",
  "worksFor": { "@id": "https://digitalkalakaarproductions.com/#organization" },
  "sameAs": ["[real LinkedIn URL]", "[real Instagram URL if personal]"]
}
```

---

## Measurement & Reporting Plan

| Discipline | Metric | Tool | Cadence |
|---|---|---|---|
| Technical SEO | Coverage errors, crawl stats | Google Search Console | Weekly |
| SEO rankings | Position for the ~15 priority Delhi/NCR queries | GSC Performance + manual SERP checks | Bi-weekly |
| Local SEO | GBP views, calls, direction requests, review count/rating | Google Business Profile dashboard | Weekly once claimed |
| Core Web Vitals | LCP/CLS/INP on `/` and `/work` | PageSpeed Insights / CrUX in GSC | After every deploy touching Hero/Work |
| AEO | Featured snippet / PAA appearances for target questions | Manual SERP spot-check (no reliable API) | Monthly |
| GEO | Whether ChatGPT/Perplexity/Gemini/Claude cite or mention the brand for target queries | Manual prompting spot-check — no mature analytics product exists for this yet | Monthly |
| Conversion | WhatsApp clicks, call clicks, email clicks from footer CTAs | GA4 event tracking (confirm it's installed — not found in this codebase) | Ongoing |

**Realistic timeline:** P0 fixes show in GSC within 1–2 weeks (crawl signals). New service/work pages (P1) typically take 4–8 weeks to index and start ranking. Authority/PR plays (P2) take 2–6 months to show measurable ranking or citation movement. AI-answer-engine citation (GEO) has no fixed timeline — it improves as entity consolidation and third-party corroboration accumulate.

**Note:** No GA4 or any analytics package was found anywhere in the codebase during this review — verify analytics is actually installed; without it, none of the above conversion/traffic measurement is possible.
