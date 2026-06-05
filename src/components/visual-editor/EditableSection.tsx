"use client";

import { type ReactNode, type ElementType, useState, useRef, useEffect } from "react";
import { Pencil, X, ArrowUp, ArrowDown, GripVertical } from "lucide-react";
import { useEditMode } from "./EditModeContext";

type Props = {
  sectionId: string;
  label: string;
  children: ReactNode;
  className?: string;
  as?: ElementType;
  style?: React.CSSProperties;
  id?: string;
};

export function EditableSection({ sectionId, label, children, className = "", as: Tag = "div", style, id }: Props) {
  const { isEditMode, activeSection, openSection, closeSection, visualContent } = useEditMode();
  const isActive = activeSection === sectionId;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isActive) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isActive]);

  if (!isEditMode) return <Tag className={className} style={style} id={id}>{children}</Tag>;

  const defaultOrder = ["hero", "vsl", "testimonials", "videoTestimonials", "screenshots", "wellnessKit", "howItWorks", "team", "cta"];
  const currentOrder = visualContent?.site?.sectionOrder || defaultOrder;
  const currentIndex = currentOrder.indexOf(sectionId);
  const isReorderable = currentIndex !== -1;

  const moveSection = async (direction: -1 | 1) => {
    if (!isReorderable) return;
    const newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex >= currentOrder.length) return;
    
    const newOrder = [...currentOrder];
    [newOrder[currentIndex], newOrder[newIndex]] = [newOrder[newIndex], newOrder[currentIndex]];
    
    await fetch("/api/admin/visual-content", {
      method: "POST",
      body: JSON.stringify({ path: "site.sectionOrder", value: newOrder }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <Tag
      id={id}
      style={style}
      className={`group/section relative transition-all duration-200 ${className} ${
        isActive
          ? "outline outline-2 outline-offset-2 outline-blue-500"
          : "outline outline-1 outline-offset-2 outline-transparent hover:outline-blue-300"
      }`}
    >
      <div 
        className={`absolute right-2 top-2 z-[100] flex flex-row-reverse items-center gap-1.5 flex-wrap max-w-[calc(100%-1rem)] transition-transform ${isDragging ? "duration-0" : "duration-200"}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        {isActive && (
          <div 
            className="flex items-center justify-center h-8 w-8 cursor-grab active:cursor-grabbing bg-white/95 rounded-full text-gray-500 shadow-lg ring-1 ring-gray-200 hover:text-blue-600 transition-colors"
            title="Drag to move toolbar"
            style={{ touchAction: "none" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <GripVertical className="h-4 w-4" />
          </div>
        )}
        <span className="hidden rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-lg sm:inline pointer-events-none">
          {label}
        </span>

        <button
          aria-label={isActive ? `Close ${label} editor` : `Edit ${label}`}
          className={`flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-all active:scale-95 sm:h-8 sm:w-8 ${
            isActive
              ? "bg-blue-600 text-white"
              : "bg-white/95 text-blue-600 ring-1 ring-blue-200"
          }`}
          onClick={() => (isActive ? closeSection() : openSection(sectionId))}
          type="button"
        >
          {isActive ? (
            <X className="h-4 w-4" />
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </button>

        {isReorderable && !isActive && (
          <>
            <button
              onClick={() => moveSection(-1)}
              disabled={currentIndex === 0}
              className={`flex h-8 w-8 items-center justify-center rounded-full shadow-lg transition-all ${currentIndex === 0 ? "opacity-50 cursor-not-allowed bg-white/50 text-gray-400" : "bg-white text-gray-700 hover:text-blue-600 active:scale-95 ring-1 ring-gray-200"}`}
              title="Move Section Up"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => moveSection(1)}
              disabled={currentIndex === currentOrder.length - 1}
              className={`flex h-8 w-8 items-center justify-center rounded-full shadow-lg transition-all ${currentIndex === currentOrder.length - 1 ? "opacity-50 cursor-not-allowed bg-white/50 text-gray-400" : "bg-white text-gray-700 hover:text-blue-600 active:scale-95 ring-1 ring-gray-200"}`}
              title="Move Section Down"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          </>
        )}

        {isActive && (
          <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-lg sm:hidden">
            {label}
          </span>
        )}
      </div>

      {children}
    </Tag>
  );
}
