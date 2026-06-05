"use client";

import { EditableSection, EditableText, EditableVideo, EditableImage, useEditableCardList, DraggableItem, CardRemoveButton, useDragReorder, useEditMode } from "@/components/visual-editor";
import { useVisualContent } from "@/components/ContentProvider";

export default function VSLVideoSection({ bookHref = "#consultation" }: { bookHref?: string }) {
  const v = useVisualContent().vsl ?? {};
  const {
    items: editableTags,
    addCard,
    removeAt,
    reorderAt,
  } = useEditableCardList({
    path: "vsl.tags",
    sourceItems: v.tags,
    defaultItems: ["Weight gain", "Low energy", "Digestion", "Cravings", "Bloating"],
    createItem: () => "New Tag",
  });

  const { isEditMode } = useEditMode();
  const { dragIndex, dropIndex, startDrag, setDropTarget, finishDrag } = useDragReorder(reorderAt);

  const isHorizontal = v.imageOrientation === "horizontal";
  const containerWidthClass = isHorizontal 
    ? "max-w-4xl" 
    : "max-w-[340px] md:max-w-[400px]";
  const aspectRatioClass = isHorizontal ? "aspect-video" : "aspect-[9/16]";

  const setOrientation = async (orientation: "vertical" | "horizontal") => {
    await fetch("/api/admin/visual-content", {
      method: "POST",
      body: JSON.stringify({ path: "vsl.imageOrientation", value: orientation }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
  };

  const imageScale = v.imageScale ?? 100;
  const setScale = async (scale: number) => {
    const newScale = Math.min(200, Math.max(50, scale));
    if (newScale === imageScale) return;
    await fetch("/api/admin/visual-content", {
      method: "POST",
      body: JSON.stringify({ path: "vsl.imageScale", value: newScale }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
  };

  return (
    <EditableSection sectionId="vsl" label="VSL Video Section" className="py-24 px-6 bg-earth-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          <EditableText path="vsl.headingLine1" fallback={v.headingLine1 ?? "Discover The"} />{" "}
          <EditableText path="vsl.headingGradient" fallback={v.headingGradient ?? "Real Reason"} className="text-gradient" /> Behind<br/>{" "}
          <EditableText path="vsl.headingLine2" fallback={v.headingLine2 ?? "Stubborn Weight & Gut Issues"} />
        </h2>
        <div className={`relative mx-auto w-full transition-all duration-500 flex flex-col items-center justify-center ${containerWidthClass}`}>
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
            <div className="absolute -inset-1 bg-gradient-to-tr from-wellness-200 to-earth-200 rounded-[2.5rem] rotate-2 opacity-50 blur-lg transition-all duration-500"></div>
            <div className={`relative bg-background rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-background flex flex-col group cursor-pointer transition-all duration-500 w-full ${aspectRatioClass}`}>
              <EditableVideo
                 sectionId="vsl"
                 save={{ type: "json", path: "vsl.videoUrl" }}
                 embedUrl={v.videoUrl ?? ""}
                 title="VSL Video"
              >
                <EditableImage
                   path="vsl.videoThumbnailUrl"
                   fallback={v.videoThumbnailUrl ?? "/images/gut_health_1780074429411.png"}
                   alt={v.videoThumbnailAlt ?? "Video Thumbnail"}
                   fill
                   sizes="(min-width: 1024px) 896px, 100vw"
                   className="object-cover opacity-60 transition-opacity group-hover:opacity-40 mix-blend-overlay"
                />
              </EditableVideo>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto glass p-8 rounded-2xl bg-background/30 text-foreground">
          <EditableText path="vsl.tagsLabel" fallback={v.tagsLabel ?? "Learn how gut imbalance may affect:"} className="text-lg font-medium mb-6 block" />
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {editableTags.map((tag, i) => (
              <DraggableItem
                key={i}
                index={i}
                total={editableTags.length}
                enabled={isEditMode}
                isDragging={dragIndex === i}
                isDropTarget={dropIndex === i}
                onDragStart={() => startDrag(i)}
                onDragOver={() => setDropTarget(i)}
                onDragEnd={finishDrag}
                onDrop={finishDrag}
                onMoveEarlier={() => reorderAt(i, i - 1)}
                onMoveLater={() => reorderAt(i, i + 1)}
                className={`relative group/card flex items-center ${isEditMode ? 'pr-8 pl-4' : 'px-4'} py-2 rounded-full bg-background shadow-sm border border-wellness-200`}
              >
                {isEditMode && <CardRemoveButton onRemove={() => removeAt(i)} className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 scale-75 origin-right" />}
                <EditableText
                  path={`vsl.tags.${i}`}
                  fallback={tag}
                  className="text-wellness-800 text-sm font-medium block"
                />
              </DraggableItem>
            ))}
            {isEditMode && (
              <button onClick={() => addCard()} className="editor-btn text-xs shrink-0">+ Add Tag</button>
            )}
          </div>
          <EditableText
            path="vsl.subtext"
            fallback={v.subtext ?? "And discover a wellness-focused approach designed to support your body naturally."}
            className="text-foreground/80 mb-8 block"
            multiline
          />
          <a
            href={bookHref}
            className="inline-block bg-earth-500 hover:bg-earth-600 text-background px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <EditableText path="vsl.ctaText" fallback={v.ctaText ?? "Watch & Book Consultation"} />
          </a>
        </div>
      </div>
    </EditableSection>
  );
}
