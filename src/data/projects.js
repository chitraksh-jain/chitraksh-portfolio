/**
 * ============================================================
 * PROJECTS CONFIGURATION — CHITRAKSH JAIN PORTFOLIO
 * ============================================================
 * Single source of truth for all video & poster assets.
 * To use real files: place .mp4 and .jpg files in /public/media/
 * and update the videoUrl & posterUrl paths below.
 * No animation or layout code needs to be modified.
 * ============================================================
 */

// High-reliability royalty-free video clips (Google Cloud / Wikimedia / CDN)
const SAMPLE_VERTICAL_1 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
const SAMPLE_VERTICAL_2 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
const SAMPLE_VERTICAL_3 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
const SAMPLE_VERTICAL_4 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
const SAMPLE_VERTICAL_5 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";

const SAMPLE_WIDE_1 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_WIDE_2 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const SAMPLE_WIDE_3 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4";

// ——————————————————————————————————————————————————————————
// 1. SHOWREEL (16:9 Cinematic Video)
// ——————————————————————————————————————————————————————————
export const showreel = {
  videoUrl: SAMPLE_WIDE_1,
  posterUrl:
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=85",
  title: "Showreel 2024 — Selected Works",
  subtitle: "Commercial / Reels / Narrative",
  year: "2024",
};

// ——————————————————————————————————————————————————————————
// 2. HORIZONTAL REEL PROJECTS (9:16 Portrait Cards)
// Dynamic data-driven array — add or remove projects freely.
// ——————————————————————————————————————————————————————————
export const reelProjects = [
  {
    id: 1,
    index: "01",
    title: "Apex Podcast Series",
    category: "SOCIAL MEDIA",
    categoryLabel: "Talking Heads / Reels / Podcasts",
    description:
      "High-retention talking-head reel with kinetic title cards, multicam cuts, and micro-zooms.",
    videoUrl: SAMPLE_VERTICAL_1,
    posterUrl:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=85",
    tools: ["Premiere Pro", "After Effects"],
    duration: "0:30",
  },
  {
    id: 2,
    index: "02",
    title: "Creator Flow Reel",
    category: "SOCIAL MEDIA",
    categoryLabel: "Talking Heads / Reels / Podcasts",
    description:
      "Fast-paced short-form breakdown engineered for Instagram Reels and viral TikTok engagement.",
    videoUrl: SAMPLE_VERTICAL_2,
    posterUrl:
      "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=800&q=85",
    tools: ["Premiere Pro"],
    duration: "0:28",
  },
  {
    id: 3,
    index: "03",
    title: "Velocity Sneaker Launch",
    category: "ADS & UGC",
    categoryLabel: "Performance Creatives / Product Ads",
    description:
      "Direct-response performance creative combining UGC hook pacing with commercial color treatment.",
    videoUrl: SAMPLE_VERTICAL_3,
    posterUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
    tools: ["Premiere Pro", "After Effects"],
    duration: "0:45",
  },
  {
    id: 4,
    index: "04",
    title: "Kinetic Typography Spec",
    category: "MOTION GRAPHICS",
    categoryLabel: "Kinetic Typography / Explainers / VFX",
    description:
      "Experimental typographic title sequence exploring fluid weight interpolation and rhythmic cuts.",
    videoUrl: SAMPLE_VERTICAL_4,
    posterUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85",
    tools: ["After Effects"],
    duration: "0:40",
  },
  {
    id: 5,
    index: "05",
    title: "Neural Core Explainer",
    category: "MOTION GRAPHICS",
    categoryLabel: "Kinetic Typography / Explainers / VFX",
    description:
      "3D vector motion explainer translating complex AI architecture into sleek visual clarity.",
    videoUrl: SAMPLE_VERTICAL_5,
    posterUrl:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=85",
    tools: ["After Effects", "Premiere Pro"],
    duration: "1:10",
  },
  {
    id: 6,
    index: "06",
    title: "Chronos SaaS Platform",
    category: "SAAS & PRODUCT",
    categoryLabel: "UI Animations / Product Demos",
    description:
      "Polished UI animation showcasing product workflows with simulated 3D camera pan and glass overlays.",
    videoUrl: SAMPLE_VERTICAL_1,
    posterUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=85",
    tools: ["After Effects", "Premiere Pro"],
    duration: "1:30",
  },
  {
    id: 7,
    index: "07",
    title: "Horizon App Showcase",
    category: "SAAS & PRODUCT",
    categoryLabel: "UI Animations / Product Demos",
    description:
      "Sleek mobile app walkthrough combining device tilt physics with synchronized motion typography.",
    videoUrl: SAMPLE_VERTICAL_2,
    posterUrl:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=85",
    tools: ["After Effects"],
    duration: "0:55",
  },
  {
    id: 8,
    index: "08",
    title: "Atelier Brand Film",
    category: "BRAND CONTENT",
    categoryLabel: "Corporate / Promotional / Lifestyle",
    description:
      "Emotional founder documentary weaving intimate interview dialogue with purposeful b-roll pacing.",
    videoUrl: SAMPLE_VERTICAL_3,
    posterUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85",
    tools: ["Premiere Pro", "Lumetri"],
    duration: "2:00",
  },
  {
    id: 9,
    index: "09",
    title: "Nordic Solitude",
    category: "CINEMATIC",
    categoryLabel: "Travel / Events / Fashion / Fitness",
    description:
      "Cinematic anamorphic travel sequence featuring natural light transitions and rich film emulation.",
    videoUrl: SAMPLE_VERTICAL_4,
    posterUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85",
    tools: ["Premiere Pro", "Lumetri"],
    duration: "3:00",
  },
  {
    id: 10,
    index: "10",
    title: "Monochrome Editorial",
    category: "CINEMATIC",
    categoryLabel: "Travel / Events / Fashion / Fitness",
    description:
      "High-fashion campaign edit built on razor-sharp rhythm, visual contrast, and sound design.",
    videoUrl: SAMPLE_VERTICAL_5,
    posterUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
    tools: ["Premiere Pro", "After Effects"],
    duration: "1:45",
  },
];

// ——————————————————————————————————————————————————————————
// 3. LONG-FORM / YOUTUBE PROJECTS (16:9 Cinematic Video)
// ——————————————————————————————————————————————————————————
export const longFormProjects = [
  {
    id: 101,
    title: "Creative Process Behind My Edits",
    category: "YOUTUBE / BREAKDOWN",
    description:
      "A deep-dive behind the timeline: breaking down pacing, sound design layering, and color grading workflows that keep watch-time above 70%.",
    videoUrl: SAMPLE_WIDE_1,
    posterUrl:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=85",
    tools: ["Premiere Pro", "After Effects"],
    duration: "12:40",
    views: "24K views",
  },
  {
    id: 102,
    title: "Studio Podcast Production",
    category: "PODCAST / LONG-FORM",
    description:
      "End-to-end multi-cam edit featuring custom animated lower thirds, chapter cards, and audio mastering for broadcast clarity.",
    videoUrl: SAMPLE_WIDE_2,
    posterUrl:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=85",
    tools: ["Premiere Pro"],
    duration: "45:00",
    views: "18K views",
  },
  {
    id: 103,
    title: "Founders & Vision — Documentary",
    category: "BRAND DOCUMENTARY",
    description:
      "Long-form documentary combining archival b-roll, original score timing, and nuanced pacing to convey the human story behind the brand.",
    videoUrl: SAMPLE_WIDE_3,
    posterUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85",
    tools: ["Premiere Pro", "Lumetri Color"],
    duration: "8:20",
    views: "31K views",
  },
];
