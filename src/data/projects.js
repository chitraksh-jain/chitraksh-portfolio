/**
 * ============================================================
 * PROJECTS CONFIGURATION — CHITRAKSH JAIN PORTFOLIO
 * ============================================================
 * To update media: edit videoUrl / posterUrl in each object.
 * Drop real video files in /public/media/ and reference as:
 *   videoUrl: "/media/your-reel.mp4"
 *   posterUrl: "/media/your-poster.jpg"
 * Do NOT touch any component or animation files.
 * ============================================================
 */

// Free royalty-free placeholder videos (Big Buck Bunny / Tears of Steel clips)
const SAMPLE_VERTICAL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
const SAMPLE_VERTICAL_2 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
const SAMPLE_VERTICAL_3 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
const SAMPLE_VERTICAL_4 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
const SAMPLE_VERTICAL_5 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";
const SAMPLE_WIDE =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_WIDE_2 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const SAMPLE_WIDE_3 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4";

// ——————————————————————————————————————————————————————————
// SHOWREEL
// ——————————————————————————————————————————————————————————
export const showreel = {
  videoUrl: SAMPLE_WIDE,
  posterUrl: "",
  title: "Showreel 2024",
};

// ——————————————————————————————————————————————————————————
// HORIZONTAL REEL PROJECTS  (9:16 vertical cards)
// Add / remove items freely — the gallery adapts automatically.
// ——————————————————————————————————————————————————————————
export const reelProjects = [
  {
    id: 1,
    index: "01",
    title: "Social Reel 01",
    category: "SOCIAL MEDIA",
    categoryLabel: "Talking Heads / Reels / Podcasts",
    description:
      "Fast-paced talking-head edit crafted for brand growth and maximum watch time.",
    videoUrl: SAMPLE_VERTICAL,
    posterUrl: "",
    tools: ["Premiere Pro"],
    duration: "0:30",
  },
  {
    id: 2,
    index: "02",
    title: "Social Reel 02",
    category: "SOCIAL MEDIA",
    categoryLabel: "Talking Heads / Reels / Podcasts",
    description:
      "High-retention short-form content optimised for Instagram Reels and TikTok.",
    videoUrl: SAMPLE_VERTICAL_2,
    posterUrl: "",
    tools: ["Premiere Pro", "After Effects"],
    duration: "0:28",
  },
  {
    id: 3,
    index: "03",
    title: "Performance Ad 01",
    category: "ADS & UGC",
    categoryLabel: "Performance Creatives / Product Ads",
    description:
      "Direct-response UGC-style ad engineered for ROAS-positive social campaigns.",
    videoUrl: SAMPLE_VERTICAL_3,
    posterUrl: "",
    tools: ["Premiere Pro"],
    duration: "0:45",
  },
  {
    id: 4,
    index: "04",
    title: "Kinetic Type 01",
    category: "MOTION GRAPHICS",
    categoryLabel: "Kinetic Typography / Explainers / VFX",
    description:
      "Bold kinetic typography experiment pushing editorial motion aesthetics.",
    videoUrl: SAMPLE_VERTICAL_4,
    posterUrl: "",
    tools: ["After Effects"],
    duration: "0:40",
  },
  {
    id: 5,
    index: "05",
    title: "Explainer Animation",
    category: "MOTION GRAPHICS",
    categoryLabel: "Kinetic Typography / Explainers / VFX",
    description:
      "Clean explainer animation translating complex ideas into visual clarity.",
    videoUrl: SAMPLE_VERTICAL_5,
    posterUrl: "",
    tools: ["After Effects", "Premiere Pro"],
    duration: "1:10",
  },
  {
    id: 6,
    index: "06",
    title: "SaaS Product Demo",
    category: "SAAS & PRODUCT",
    categoryLabel: "UI Animations / Product Demos",
    description:
      "Polished UI walkthrough elevating a SaaS product launch with motion-first storytelling.",
    videoUrl: SAMPLE_VERTICAL,
    posterUrl: "",
    tools: ["After Effects", "Premiere Pro"],
    duration: "1:30",
  },
  {
    id: 7,
    index: "07",
    title: "App Promo",
    category: "SAAS & PRODUCT",
    categoryLabel: "UI Animations / Product Demos",
    description:
      "Sleek app promo combining screen recording with cinematic overlays and motion type.",
    videoUrl: SAMPLE_VERTICAL_2,
    posterUrl: "",
    tools: ["After Effects"],
    duration: "0:55",
  },
  {
    id: 8,
    index: "08",
    title: "Brand Story",
    category: "BRAND CONTENT",
    categoryLabel: "Corporate / Promotional / Lifestyle",
    description:
      "Emotional brand narrative weaving lifestyle footage with purposeful pacing.",
    videoUrl: SAMPLE_VERTICAL_3,
    posterUrl: "",
    tools: ["Premiere Pro", "After Effects"],
    duration: "2:00",
  },
  {
    id: 9,
    index: "09",
    title: "Travel Cinematic",
    category: "CINEMATIC",
    categoryLabel: "Travel / Events / Fashion / Fitness",
    description:
      "Cinematic travel edit harnessing natural light and seamless colour grading.",
    videoUrl: SAMPLE_VERTICAL_4,
    posterUrl: "",
    tools: ["Premiere Pro", "Lumetri"],
    duration: "3:00",
  },
  {
    id: 10,
    index: "10",
    title: "Fashion Film",
    category: "CINEMATIC",
    categoryLabel: "Travel / Events / Fashion / Fitness",
    description:
      "High-fashion editorial sequence built on precise rhythm and visual contrast.",
    videoUrl: SAMPLE_VERTICAL_5,
    posterUrl: "",
    tools: ["Premiere Pro", "After Effects"],
    duration: "1:45",
  },
];

// ——————————————————————————————————————————————————————————
// LONG-FORM / YOUTUBE PROJECTS  (16:9)
// ——————————————————————————————————————————————————————————
export const longFormProjects = [
  {
    id: 101,
    title: "Creative Process Behind My Edits",
    category: "YOUTUBE / EDITING BREAKDOWN",
    description:
      "A behind-the-scenes look at how I transform raw footage into polished narratives — covering colour, pacing and sound design.",
    videoUrl: SAMPLE_WIDE,
    posterUrl: "",
    tools: ["Premiere Pro", "After Effects"],
    duration: "12:40",
  },
  {
    id: 102,
    title: "Podcast Production — Full Episode",
    category: "PODCAST / LONG-FORM",
    description:
      "End-to-end podcast edit with dynamic text overlays, chapter markers and branded motion graphics.",
    videoUrl: SAMPLE_WIDE_2,
    posterUrl: "",
    tools: ["Premiere Pro"],
    duration: "45:00",
  },
  {
    id: 103,
    title: "Brand Documentary",
    category: "BRAND CONTENT / STORYTELLING",
    description:
      "Founder story documentary combining handheld interviews with b-roll and original score composition.",
    videoUrl: SAMPLE_WIDE_3,
    posterUrl: "",
    tools: ["Premiere Pro", "After Effects", "Lumetri"],
    duration: "8:20",
  },
];
