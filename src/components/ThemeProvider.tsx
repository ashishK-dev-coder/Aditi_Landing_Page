"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import themes from "../visual-data/themes.json";

type Theme = typeof themes[0];

interface ThemeContextType {
  activeTheme: Theme;
  setActiveTheme: (id: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveThemeState] = useState<Theme>(themes[0]);
  const [mounted, setMounted] = useState(false);

  // Defer theme hydration to avoid SSR/client mismatch from localStorage.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional mount gate for client-only theme
    setMounted(true);
    const saved = localStorage.getItem("aditi-theme-id");
    if (saved) {
      const found = themes.find((t) => t.id === saved);
      if (found) setActiveThemeState(found);
    }
  }, []);

  const setActiveTheme = (id: string) => {
    const found = themes.find((t) => t.id === id);
    if (found) {
      setActiveThemeState(found);
      localStorage.setItem("aditi-theme-id", id);
    }
  };

  const cssVariables = mounted
    ? `
    :root {
      --background: ${activeTheme.background};
      --foreground: ${activeTheme.foreground};
      --tw-wellness-50: ${activeTheme.wellness["50"]};
      --tw-wellness-100: ${activeTheme.wellness["100"]};
      --tw-wellness-200: ${activeTheme.wellness["200"]};
      --tw-wellness-300: ${activeTheme.wellness["300"]};
      --tw-wellness-400: ${activeTheme.wellness["400"]};
      --tw-wellness-500: ${activeTheme.wellness["500"]};
      --tw-wellness-600: ${activeTheme.wellness["600"]};
      --tw-wellness-700: ${activeTheme.wellness["700"]};
      --tw-wellness-800: ${activeTheme.wellness["800"]};
      --tw-wellness-900: ${activeTheme.wellness["900"]};
      --tw-earth-50: ${activeTheme.earth["50"]};
      --tw-earth-100: ${activeTheme.earth["100"]};
      --tw-earth-200: ${activeTheme.earth["200"]};
      --tw-earth-300: ${activeTheme.earth["300"]};
      --tw-earth-400: ${activeTheme.earth["400"]};
      --tw-earth-500: ${activeTheme.earth["500"]};
    }
  `
    : "";

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme, themes }}>
      {mounted && <style>{cssVariables}</style>}
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
