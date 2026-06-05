"use client";

import { EditableSection, EditableText, EditableImage, useEditableCardList, DraggableItem, CardRemoveButton, useDragReorder, useEditMode } from "@/components/visual-editor";
import { useVisualContent } from "@/components/ContentProvider";

export default function WellnessKitSection({ bookHref = "#consultation" }: { bookHref?: string }) {
  const w = useVisualContent().wellnessKit ?? {};

  const {
    items: editableHighlights,
    addCard,
    removeAt,
    reorderAt,
  } = useEditableCardList({
    path: "wellnessKit.highlights",
    sourceItems: w.highlights,
    defaultItems: [
      "Gut Health Support",
      "Lifestyle Wellness Support",
      "Daily Routine Friendly",
      "Designed For Wellness Journey",
    ],
    createItem: () => "New Highlight",
  });

  const { isEditMode } = useEditMode();
  const { dragIndex, dropIndex, startDrag, setDropTarget, finishDrag } = useDragReorder(reorderAt);

  const isHorizontal = w.imageOrientation === "horizontal";
  const aspectRatioClass = isHorizontal ? "aspect-[4/3]" : "aspect-square lg:aspect-[4/5]";

  const setOrientation = async (orientation: "vertical" | "horizontal") => {
    await fetch("/api/admin/visual-content", {
      method: "POST",
      body: JSON.stringify({ path: "wellnessKit.imageOrientation", value: orientation }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
  };

  const imageScale = w.imageScale ?? 100;
  const setScale = async (scale: number) => {
    const newScale = Math.min(200, Math.max(50, scale));
    if (newScale === imageScale) return;
    await fetch("/api/admin/visual-content", {
      method: "POST",
      body: JSON.stringify({ path: "wellnessKit.imageScale", value: newScale }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
  };

  return (
    <EditableSection sectionId="wellnessKit" label="Wellness Kit Section" className="bg-earth-50 py-24 px-6 relative overflow-hidden">
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-wellness-200 rounded-full blur-[100px] opacity-50"></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative animate-fade-in-up delay-200 group mx-auto w-full transition-all duration-500 flex flex-col items-center justify-center">
          {isEditMode && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-background/80 p-1.5 rounded-xl backdrop-blur-md border border-foreground/10 shadow-lg">
              <div className="flex gap-1">
                <button 
                  onClick={() => setOrientation("vertical")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${!isHorizontal ? 'bg-wellness-600 text-white shadow-md' : 'text-foreground/70 hover:text-foreground'}`}
                >
                  Vertical
                </button>
                <button 
                  onClick={() => setOrientation("horizontal")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${isHorizontal ? 'bg-wellness-600 text-white shadow-md' : 'text-foreground/70 hover:text-foreground'}`}
                >
                  Horizontal
                </button>
              </div>
              <div className="h-6 w-px bg-foreground/10 mx-1"></div>
              <div className="flex items-center gap-1 px-1">
                <button onClick={() => setScale(imageScale - 10)} className="w-6 h-6 flex items-center justify-center rounded-md text-foreground/70 hover:text-foreground hover:bg-foreground/5 font-bold">-</button>
                <span className="text-xs font-bold w-10 text-center">{imageScale}%</span>
                <button onClick={() => setScale(imageScale + 10)} className="w-6 h-6 flex items-center justify-center rounded-md text-foreground/70 hover:text-foreground hover:bg-foreground/5 font-bold">+</button>
              </div>
            </div>
          )}
          <div style={{ width: `${imageScale}%`, transition: 'width 0.3s ease' }} className="relative flex-shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-tr from-earth-200 to-wellness-200 rounded-[2.5rem] rotate-2 opacity-50 blur-lg transition-transform group-hover:rotate-4"></div>
            <div className={`relative rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 w-full ${aspectRatioClass}`}>
              <EditableImage
                path="wellnessKit.imageUrl"
                fallback={w.imageUrl ?? "/images/wellness_kit_1780074526557.png"}
                alt={w.imageAlt ?? "Wellness Kit"}
                fill
                sizes="(min-width: 1024px) 450px, (min-width: 768px) 340px, 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="glass px-4 py-2 rounded-lg">
                  <span className="text-white font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4 text-wellness-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Premium Quality
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            <EditableText path="wellnessKit.heading" fallback={w.heading ?? "Wellness Support Kit"} />
          </h2>
          <EditableText
            path="wellnessKit.subheading"
            fallback={w.subheading ?? "Everything you need to support your gut, manage weight, and feel your best every single day."}
            className="text-xl text-wellness-800/80 block"
            multiline
          />

          <ul className="space-y-5">
            {editableHighlights.map((highlight, i) => (
              <DraggableItem
                key={i}
                index={i}
                total={editableHighlights.length}
                enabled={isEditMode}
                isDragging={dragIndex === i}
                isDropTarget={dropIndex === i}
                onDragStart={() => startDrag(i)}
                onDragOver={() => setDropTarget(i)}
                onDragEnd={finishDrag}
                onDrop={finishDrag}
                onMoveEarlier={() => reorderAt(i, i - 1)}
                onMoveLater={() => reorderAt(i, i + 1)}
                className="flex items-center gap-4 p-4 pr-12 bg-background rounded-2xl shadow-sm border border-transparent hover:border-wellness-200 transition-colors text-foreground relative group/card"
              >
                {isEditMode && <CardRemoveButton onRemove={() => removeAt(i)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10" />}
                <div className="w-8 h-8 rounded-full bg-wellness-100 flex items-center justify-center text-wellness-600 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <EditableText path={`wellnessKit.highlights.${i}`} fallback={highlight} className="font-semibold text-lg flex-1" />
              </DraggableItem>
            ))}
            {isEditMode && (
              <li className="pt-4">
                <button onClick={() => addCard()} className="editor-btn text-xs">+ Add Highlight</button>
              </li>
            )}
          </ul>

          <div className="pt-6">
            <a
              href={bookHref}
              className="inline-block bg-wellness-900 text-background px-8 py-4 rounded-full font-semibold transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <EditableText path="wellnessKit.ctaText" fallback={w.ctaText ?? "Talk To Expert"} />
            </a>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
