"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { VisualContent } from "@/lib/visual-data/types";

const VisualContentContext = createContext<VisualContent>({});

export function ContentProvider({
  content,
  children,
}: {
  content: VisualContent;
  children: ReactNode;
}) {
  return (
    <VisualContentContext.Provider value={content}>
      {children}
    </VisualContentContext.Provider>
  );
}

export function useVisualContent(): VisualContent {
  return useContext(VisualContentContext);
}
