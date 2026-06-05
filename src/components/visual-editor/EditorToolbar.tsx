"use client";

import { Eye, LogOut, Settings, Download, Upload, ListOrdered, X, ArrowUp, ArrowDown } from "lucide-react";
import { useEditMode } from "./EditModeContext";
import { useState, useRef, useEffect } from "react";

export function EditorToolbar() {
  const { isEditMode, activeSection, visualContent } = useEditMode();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [showSectionManager, setShowSectionManager] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isEditMode) return null;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/";
  }

  async function handleExport() {
    setIsExporting(true);
    try {
      const res = await fetch("/api/admin/export");
      if (!res.ok) throw new Error("Export failed");
      
      const blob = await res.blob();
      const contentDisposition = res.headers.get("Content-Disposition");
      let filename = "aditi-wellness-export.zip";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) filename = match[1];
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      alert("Failed to export.");
    }
    setIsExporting(false);
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/import", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Import failed");
      }
      alert("Import successful! Reloading...");
      window.location.reload();
    } catch (err: any) {
      alert(`Failed to import: ${err.message}`);
    }
    setIsImporting(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const defaultOrder = ["hero", "vsl", "testimonials", "videoTestimonials", "screenshots", "wellnessKit", "howItWorks", "team", "cta"];
  const [currentOrder, setCurrentOrder] = useState<string[]>(defaultOrder);
  
  useEffect(() => {
    if (visualContent?.site?.sectionOrder) {
      setCurrentOrder(visualContent.site.sectionOrder);
    }
  }, [visualContent]);

  const moveSection = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= currentOrder.length) return;
    
    const newOrder = [...currentOrder];
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    setCurrentOrder(newOrder);
  };

  const saveSectionOrder = async () => {
    await fetch("/api/admin/visual-content", {
      method: "POST",
      body: JSON.stringify({ path: "site.sectionOrder", value: currentOrder }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[150] sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-auto sm:-translate-x-1/2">
      <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-slate-950/95 px-3 py-2 shadow-2xl backdrop-blur-md sm:justify-start sm:gap-3 sm:rounded-full sm:border sm:border-white/20 sm:px-5 sm:py-3">

        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
          </span>
          <span className="truncate text-xs font-black text-white">
            {activeSection ? (
              <span>
                Editing <span className="capitalize text-blue-400">{activeSection}</span>
              </span>
            ) : (
              <span className="text-slate-300">
                <span className="sm:hidden">Edit Mode</span>
                <span className="hidden sm:inline">Edit Mode — tap ✏️ on any section</span>
              </span>
            )}
          </span>
        </div>

        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Section Manager */}
          <button
            onClick={() => setShowSectionManager(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-300 transition-colors hover:bg-blue-500/30 active:scale-95 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
            title="Reorder Sections"
          >
            <ListOrdered className="h-3.5 w-3.5" />
            <span className="hidden text-xs font-bold sm:inline">Sections</span>
          </button>

          {/* Export */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 transition-colors hover:bg-emerald-500/30 active:scale-95 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5 disabled:opacity-50"
            title="Export State as ZIP"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden text-xs font-bold sm:inline">{isExporting ? "..." : "Export"}</span>
          </button>

          {/* Import */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 transition-colors hover:bg-amber-500/30 active:scale-95 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5 disabled:opacity-50"
            title="Import State from ZIP"
          >
            <Upload className="h-3.5 w-3.5" />
            <span className="hidden text-xs font-bold sm:inline">{isImporting ? "..." : "Import"}</span>
          </button>
          <input type="file" accept=".zip" className="hidden" ref={fileInputRef} onChange={handleImport} />

          <a
            aria-label="JSON Panel"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 transition-colors hover:bg-white/20 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
            href="/secret-admin-portal"
          >
            <Settings className="h-3.5 w-3.5" />
            <span className="hidden text-xs font-bold sm:inline">JSON</span>
          </a>

          <a
            aria-label="Preview site"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
            href="/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden text-xs font-bold sm:inline">Preview</span>
          </a>

          <button
            aria-label="Exit edit mode"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-300 transition-colors hover:bg-red-500/30 active:scale-95 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
            onClick={logout}
            type="button"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden text-xs font-bold sm:inline">Exit</span>
          </button>
        </div>

      </div>
      </div>

      {showSectionManager && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Reorder Sections</h3>
              <button 
                onClick={() => {
                  setShowSectionManager(false);
                  setCurrentOrder(visualContent?.site?.sectionOrder || defaultOrder);
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-2 mb-8">
              {currentOrder.map((sectionId, index) => (
                <div key={sectionId} className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                  <span className="text-slate-200 font-medium capitalize">
                    {index + 1}. {sectionId.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => moveSection(index, -1)}
                      disabled={index === 0}
                      className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => moveSection(index, 1)}
                      disabled={index === currentOrder.length - 1}
                      className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                saveSectionOrder();
                setShowSectionManager(false);
              }}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
            >
              Save Section Order
            </button>
          </div>
        </div>
      )}
    </>
  );
}
