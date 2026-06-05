"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { activeTheme, setActiveTheme, themes } = useTheme();

  return (
    <div className="relative">
      <select
        value={activeTheme.id}
        onChange={(e) => setActiveTheme(e.target.value)}
        className="appearance-none flex items-center gap-2 bg-background/80 hover:bg-foreground/10 pl-5 pr-10 py-2.5 rounded-full border border-foreground/20 backdrop-blur-md transition-all text-sm font-bold text-foreground shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-wellness-500"
        style={{
          color: "var(--foreground)",
          backgroundColor: "var(--background)",
        }}
      >
        {themes.map((theme, index) => (
          <option key={theme.id} value={theme.id} style={{ background: theme.background, color: theme.foreground }}>
            {theme.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground/50">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
