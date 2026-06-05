export interface ThemeDef {
  name: string;
  background: string;
  foreground: string;
  footerBg: string;
  footerText: string;
  wellness: [string, string, string, string, string, string, string, string, string, string]; // 50 to 900
  earth: [string, string, string, string, string, string]; // 50 to 500
}

// Helper to easily generate gold/silver palettes
const pureSilver: ThemeDef["wellness"] = ["#f8f9fa", "#f1f3f5", "#e9ecef", "#dee2e6", "#ced4da", "#adb5bd", "#868e96", "#495057", "#343a40", "#212529"];
const warmGold: ThemeDef["wellness"] = ["#fff8e1", "#ffecb3", "#ffe082", "#ffd54f", "#ffca28", "#ffc107", "#ffb300", "#ffa000", "#ff8f00", "#ff6f00"];
const paleGold: ThemeDef["wellness"] = ["#fdfcf0", "#fbf8da", "#f6f1ba", "#efe694", "#e4d668", "#d6c141", "#ba9f2a", "#957c24", "#7b6323", "#685221"];
const roseGold: ThemeDef["wellness"] = ["#fff5f5", "#ffe3e3", "#ffc9c9", "#ffa8a8", "#ff8787", "#ff6b6b", "#fa5252", "#f03e3e", "#e03131", "#c92a2a"]; // Reddish-gold
const champagne: ThemeDef["wellness"] = ["#fcfcfc", "#f6f6f6", "#e8e8e8", "#d4d4d4", "#b8b8b8", "#9c9c9c", "#828282", "#6b6b6b", "#575757", "#454545"];

export const THEMES: ThemeDef[] = [
  // 0. Original
  {
    name: "Original Greens",
    background: "#faf7f2",
    foreground: "#253d37",
    footerBg: "#e0eee8",
    footerText: "#111827",
    wellness: ["#f2f7f5", "#e0eee8", "#c2ddd2", "#9bc6b5", "#71ab96", "#518e78", "#3f7060", "#345a4e", "#2b4941", "#253d37"],
    earth: ["#faf7f2", "#f2ebe0", "#e5d5c0", "#d4ba9b", "#c49d76", "#b48157"],
  },
  // 1. Pure Dark + Silver/Platinum
  {
    name: "Pure Dark Silver",
    background: "#000000",
    foreground: "#e5e5e5",
    footerBg: "#111111",
    footerText: "#a3a3a3",
    wellness: pureSilver,
    earth: ["#171717", "#262626", "#404040", "#525252", "#737373", "#a3a3a3"],
  },
];

// Generate themes 2-19 (Combinations of Dark/Medium-dark with Gold variants)
const darkBackgrounds = [
  { bg: "#0a0a0a", fg: "#fafafa", fb: "#171717", ft: "#d4d4d4" }, // Rich Black
  { bg: "#121212", fg: "#ffffff", fb: "#1e1e1e", ft: "#cccccc" }, // Material Dark
  { bg: "#1a1a1a", fg: "#f3f4f6", fb: "#27272a", ft: "#e5e7eb" }, // Charcoal
  { bg: "#0f172a", fg: "#f8fafc", fb: "#1e293b", ft: "#cbd5e1" }, // Slate
  { bg: "#1c1917", fg: "#fafaf9", fb: "#292524", ft: "#d6d3d1" }, // Stone
  { bg: "#111827", fg: "#f9fafb", fb: "#1f2937", ft: "#e5e7eb" }, // Gray
];

const goldVariants = [warmGold, paleGold, roseGold];

for (let i = 0; i < 18; i++) {
  const bgDef = darkBackgrounds[i % darkBackgrounds.length];
  const goldDef = goldVariants[i % goldVariants.length];
  
  const goldName = goldDef === warmGold ? "Warm Gold" : goldDef === paleGold ? "Pale Gold" : "Rose Gold";
  const bgName = ["Rich Black", "Material Dark", "Charcoal", "Slate", "Stone", "Gray"][i % darkBackgrounds.length];

  THEMES.push({
    name: `${bgName} + ${goldName}`,
    background: bgDef.bg,
    foreground: bgDef.fg,
    footerBg: bgDef.fb,
    footerText: bgDef.ft,
    wellness: goldDef,
    earth: ["#1c1917", "#292524", "#44403c", "#57534e", "#78716c", "#a8a29e"], // Neutral warm accent
  });
}
