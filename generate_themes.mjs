import fs from 'fs';
import path from 'path';

const pureSilver = {
  "50": "#f8f9fa", "100": "#f1f3f5", "200": "#e9ecef", "300": "#dee2e6", "400": "#ced4da", 
  "500": "#adb5bd", "600": "#868e96", "700": "#495057", "800": "#343a40", "900": "#212529"
};
const warmGold = {
  "50": "#fff8e1", "100": "#ffecb3", "200": "#ffe082", "300": "#ffd54f", "400": "#ffca28", 
  "500": "#ffc107", "600": "#ffb300", "700": "#ffa000", "800": "#ff8f00", "900": "#ff6f00"
};
const paleGold = {
  "50": "#fdfcf0", "100": "#fbf8da", "200": "#f6f1ba", "300": "#efe694", "400": "#e4d668", 
  "500": "#d6c141", "600": "#ba9f2a", "700": "#957c24", "800": "#7b6323", "900": "#685221"
};
const roseGold = {
  "50": "#fff5f5", "100": "#ffe3e3", "200": "#ffc9c9", "300": "#ffa8a8", "400": "#ff8787", 
  "500": "#ff6b6b", "600": "#fa5252", "700": "#f03e3e", "800": "#e03131", "900": "#c92a2a"
};

const darkBackgrounds = [
  { bg: "#0a0a0a", fg: "#fafafa" }, // Rich Black
  { bg: "#121212", fg: "#ffffff" }, // Material Dark
  { bg: "#1a1a1a", fg: "#f3f4f6" }, // Charcoal
  { bg: "#0f172a", fg: "#f8fafc" }, // Slate
  { bg: "#1c1917", fg: "#fafaf9" }, // Stone
  { bg: "#111827", fg: "#f9fafb" }, // Gray
];

const goldVariants = [warmGold, paleGold, roseGold];

const themes = [
  {
    "id": "0",
    "name": "0. Original Greens",
    "background": "#faf7f2",
    "foreground": "#253d37",
    "wellness": {
      "50": "#f2f7f5", "100": "#e0eee8", "200": "#c2ddd2", "300": "#9bc6b5", "400": "#71ab96",
      "500": "#518e78", "600": "#3f7060", "700": "#345a4e", "800": "#2b4941", "900": "#253d37"
    },
    "earth": {
      "50": "#faf7f2", "100": "#f2ebe0", "200": "#e5d5c0", "300": "#d4ba9b", "400": "#c49d76", "500": "#b48157"
    }
  },
  {
    "id": "1",
    "name": "1. Pure Dark Silver",
    "background": "#000000",
    "foreground": "#e5e5e5",
    "wellness": pureSilver,
    "earth": {
      "50": "#171717", "100": "#262626", "200": "#404040", "300": "#525252", "400": "#737373", "500": "#a3a3a3"
    }
  }
];

const goldNames = ["Warm Gold", "Pale Gold", "Rose Gold"];
const bgNames = ["Rich Black", "Material Dark", "Charcoal", "Slate", "Stone", "Gray"];

for (let i = 0; i < 18; i++) {
  const bgDef = darkBackgrounds[i % darkBackgrounds.length];
  const goldDef = goldVariants[i % goldVariants.length];
  const goldName = goldNames[i % goldVariants.length];
  const bgName = bgNames[i % darkBackgrounds.length];

  themes.push({
    "id": (i + 2).toString(),
    "name": `${i + 2}. ${bgName} + ${goldName}`,
    "background": bgDef.bg,
    "foreground": bgDef.fg,
    "wellness": goldDef,
    "earth": {
      "50": "#1c1917", "100": "#292524", "200": "#44403c", "300": "#57534e", "400": "#78716c", "500": "#a8a29e"
    }
  });
}

const outPath = path.join(process.cwd(), 'src', 'visual-data', 'themes.json');
fs.writeFileSync(outPath, JSON.stringify(themes, null, 2));
console.log('Successfully generated 20 themes!');
