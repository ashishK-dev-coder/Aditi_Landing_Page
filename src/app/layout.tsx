import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { readFileSync } from "fs";
import { join } from "path";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditi Wellness | Fix Your Gut, Transform Your Weight",
  description: "Support your body naturally with a personalized gut wellness and weight management approach.",
};

function getInitialThemeId() {
  try {
    const file = join(process.cwd(), "visual-data", "content.json");
    const content = JSON.parse(readFileSync(file, "utf8"));
    return content?.site?.themeId || null;
  } catch {
    return null;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialThemeId = getInitialThemeId();
  
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col relative">
        <ThemeProvider initialThemeId={initialThemeId}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
