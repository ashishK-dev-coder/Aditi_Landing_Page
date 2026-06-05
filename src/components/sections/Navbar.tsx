"use client";

import { EditableSection, EditableText, EditableImage, useEditMode } from "@/components/visual-editor";
import { useVisualContent } from "@/components/ContentProvider";

export default function Navbar({ bookHref = "#consultation" }: { bookHref?: string }) {
  const n = useVisualContent().navbar ?? {};
  const { isEditMode } = useEditMode();

  const logoScale = n.logoScale ?? 100;
  const setScale = async (scale: number) => {
    const newScale = Math.min(300, Math.max(50, scale));
    if (newScale === logoScale) return;
    await fetch("/api/admin/visual-content", {
      method: "POST",
      body: JSON.stringify({ path: "navbar.logoScale", value: newScale }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const heightPx = Math.round(40 * (logoScale / 100));
  const widthPx = Math.round(120 * (logoScale / 100));

  return (
    <EditableSection as="nav" sectionId="navbar" label="Navbar" className="fixed w-full z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-wellness-200/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 relative group">
          <div className="relative flex-shrink-0">
            {isEditMode && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background border border-border shadow-xl rounded-lg p-1.5 flex items-center gap-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setScale(logoScale - 10)} className="w-6 h-6 flex items-center justify-center rounded-md text-foreground/70 hover:text-foreground hover:bg-foreground/5 font-bold">-</button>
                <span className="text-xs font-bold w-10 text-center">{logoScale}%</span>
                <button onClick={() => setScale(logoScale + 10)} className="w-6 h-6 flex items-center justify-center rounded-md text-foreground/70 hover:text-foreground hover:bg-foreground/5 font-bold">+</button>
              </div>
            )}
            <EditableImage
              sectionId="logo"
              path="navbar.logoUrl"
              src={n.logoUrl}
              fallback=""
              alt="Brand Logo"
              className="w-auto object-contain relative transition-all duration-300"
              style={{ height: `${heightPx}px` }}
              width={widthPx}
              height={heightPx}
            />
          </div>
          <div className="font-heading font-bold text-2xl tracking-tighter text-wellness-800 flex gap-1">
            <EditableText path="navbar.brandPrimary" fallback={n.brandPrimary ?? "Aditi"} />
            <EditableText path="navbar.brandAccent" fallback={n.brandAccent ?? "Wellness"} className="text-earth-500" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={bookHref}
            className="hidden md:inline-block bg-wellness-600 hover:bg-wellness-700 text-background px-6 py-2 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-wellness-600/20"
          >
            <EditableText path="navbar.ctaText" fallback={n.ctaText ?? "Book Consultation"} />
          </a>
        </div>
      </div>
    </EditableSection>
  );
}
