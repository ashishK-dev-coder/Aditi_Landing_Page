"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { activeTheme, setActiveTheme, themes } = useTheme();

  const currentIndex = themes.findIndex((t) => t.id === activeTheme.id);

  const toggleNextTheme = () => {
    const nextIndex = (currentIndex + 1) % themes.length;
    setActiveTheme(themes[nextIndex].id);
  };

  return (
    <button
      onClick={toggleNextTheme}
      className="flex items-center gap-2 bg-background/50 hover:bg-foreground/10 px-5 py-2.5 rounded-full border border-foreground/20 backdrop-blur-md transition-all text-sm font-bold text-foreground shadow-sm hover:scale-105 active:scale-95"
    >
      <span 
        className="w-4 h-4 rounded-full border border-foreground/10 shadow-inner" 
        style={{ backgroundColor: activeTheme.wellness["500"] }}
      ></span>
      <span>Theme {currentIndex}</span>
      <svg className="w-4 h-4 text-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  );
}
