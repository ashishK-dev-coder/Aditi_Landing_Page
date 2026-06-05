"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Camera, Loader2, Check, X, Maximize, Minimize } from "lucide-react";
import Image, { type ImageProps } from "next/image";
import { useEditMode } from "./EditModeContext";

type Props = Omit<ImageProps, "src" | "alt"> & {
  sectionId?: string;
  field?: string;
  jsonPath?: string;
  path?: string;
  src?: string | null | undefined;
  fallback?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};

type UploadStatus = "idle" | "uploading" | "done" | "error";

export function EditableImage({ sectionId, field, jsonPath, path, src, fallback, alt, className = "", fill, width, height, sizes, priority, style }: Props) {
  const actualSectionId = sectionId ?? (path ? path.split(".")[0] : "");
  const { isEditMode, activeSection, applyPatch, visualContent } = useEditMode();
  const isActive = activeSection === actualSectionId;

  const fitPath = path ? (path.endsWith("Url") ? path.replace("Url", "Fit") : `${path}Fit`) : undefined;
  
  function getNestedValue(obj: any, pathStr: string) {
    if (!obj || !pathStr) return undefined;
    const parts = pathStr.split(/[\.\[\]]+/).filter(Boolean);
    let current = obj;
    for (const part of parts) {
      if (current === undefined || current === null) return undefined;
      current = current[part];
    }
    return current;
  }

  const savedFit = fitPath ? getNestedValue(visualContent, fitPath) : undefined;
  const defaultFit = className.includes("object-contain") ? "contain" : "cover";
  const currentFit = savedFit === "contain" ? "contain" : (savedFit === "cover" ? "cover" : defaultFit);
  const fitStyle = { objectFit: currentFit as any };
  const mergedStyle = { ...style, ...fitStyle };

  const [currentSrc, setCurrentSrc] = useState(src ?? fallback);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setCurrentSrc(src ?? fallback); }, [src, fallback]);

  if (!isEditMode || !isActive) {
    return currentSrc ? (
      <Image alt={alt} className={className} src={currentSrc} fill={fill} width={fill ? undefined : width} height={fill ? undefined : height} sizes={sizes} priority={priority} style={mergedStyle} />
    ) : null;
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setStatus("idle");
    setErrorMsg("");
  }

  async function upload() {
    if (!selectedFile) return;
    setStatus("uploading");
    setErrorMsg("");
    try {
      const formData = new FormData();
      formData.set("file", selectedFile);
      formData.set("sectionType", actualSectionId);
      if (field) formData.set("field", field);
      if (jsonPath || path) formData.set("jsonPath", jsonPath ?? path!);

      const res = await fetch("/api/admin/upload-image", { method: "POST", body: formData });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.message || "Upload failed");

      setCurrentSrc(payload.url);
      applyPatch(jsonPath ?? path ?? `${actualSectionId}.${field}`, payload.url);
      setStatus("done");
      setTimeout(() => { setShowModal(false); setStatus("idle"); setPreview(null); setSelectedFile(null); }, 1000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Upload failed");
    }
  }

  function cancel() { setShowModal(false); setPreview(null); setSelectedFile(null); setStatus("idle"); setErrorMsg(""); }

  return (
    <>
      {/* Image with edit overlay */}
      <div className="group/img relative">
        {currentSrc ? (
          <Image alt={alt} className={className} src={currentSrc} fill={fill} width={fill ? undefined : width} height={fill ? undefined : height} sizes={sizes} priority={priority} style={mergedStyle} />
        ) : (
          <div className={`flex items-center justify-center bg-slate-200/50 rounded-md text-xs font-medium text-slate-400 ${className}`} style={{ width: width || '100%', height: height || '100%' }}>
            No Logo
          </div>
        )}

        <div className="absolute right-2 top-2 z-10 flex items-center gap-1">
          {fitPath && (
            <button
              aria-label="Toggle Image Fit"
              className="flex items-center gap-1 rounded-full bg-slate-800/80 px-2.5 py-1.5 text-xs font-black text-white shadow-lg backdrop-blur-md hover:bg-slate-700"
              onClick={async () => {
                const nextFit = currentFit === "cover" ? "contain" : "cover";
                if (fitPath) applyPatch(fitPath, nextFit);
                await fetch("/api/admin/visual-content", {
                  method: "POST",
                  body: JSON.stringify({ path: fitPath, value: nextFit }),
                  headers: { "Content-Type": "application/json" },
                });
              }}
              type="button"
            >
              {currentFit === "cover" ? <Maximize className="h-3.5 w-3.5" /> : <Minimize className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{currentFit === "cover" ? "Cover" : "Contain"}</span>
            </button>
          )}
          <button
            aria-label={`Replace ${alt} image`}
            className="flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1.5 text-xs font-black text-white shadow-lg hover:bg-blue-500"
            onClick={() => setShowModal(true)}
            type="button"
          >
            <Camera className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Replace</span>
          </button>
        </div>
      </div>

      {/* Upload modal — bottom sheet on mobile, centered on desktop */}
      {showModal && mounted && createPortal(
        <div
          className="fixed inset-0 z-[300] flex items-end justify-center bg-slate-950/70 backdrop-blur-sm sm:items-center sm:px-4"
          onClick={(e) => { if (e.target === e.currentTarget) cancel(); }}
        >
          <div
            className="w-full max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-md sm:rounded-[1.5rem]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 sm:hidden">
              <div className="h-1 w-10 rounded-full bg-slate-300" />
            </div>

            <div className="p-5 sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-950">Replace Image</h3>
                  <p className="mt-0.5 text-sm text-slate-500">
                    Uploading for: <strong>{alt}</strong>
                  </p>
                </div>
                <button
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 active:bg-slate-200"
                  onClick={cancel}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Drop zone / tap zone */}
              <div
                className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 transition-colors active:bg-blue-50"
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <img alt="Preview" className="max-h-48 w-full rounded-xl object-contain" src={preview} />
                ) : (
                  <>
                    <Camera className="mb-2 h-10 w-10 text-slate-400" />
                    <p className="text-sm font-bold text-slate-600">Tap to choose image</p>
                    <p className="mt-1 text-xs text-slate-400">PNG, JPG, WEBP · max 5MB</p>
                  </>
                )}
                <input accept="image/*" className="hidden" onChange={onFileChange} ref={fileInputRef} type="file" />
              </div>

              {errorMsg && (
                <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{errorMsg}</p>
              )}

              {/* Actions */}
              <div className="mt-4 flex gap-3 pb-safe">
                <button
                  className="flex-1 rounded-2xl border border-slate-200 bg-white py-3 font-black text-slate-700 active:bg-slate-50"
                  onClick={cancel}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 font-black text-white active:bg-blue-700 disabled:opacity-60"
                  disabled={!selectedFile || status === "uploading" || status === "done"}
                  onClick={upload}
                  type="button"
                >
                  {status === "uploading" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {status === "done" && <Check className="h-4 w-4" />}
                  {status === "uploading" ? "Uploading…" : status === "done" ? "Saved!" : "Upload & Save"}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
