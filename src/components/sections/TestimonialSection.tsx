"use client";

import { EditableSection, EditableText, EditableImage, useEditableCardList, DraggableItem, CardRemoveButton, useDragReorder, useEditMode } from "@/components/visual-editor";
import { useVisualContent } from "@/components/ContentProvider";

const StarRating = () => (
  <div className="flex gap-1 text-earth-500 mb-4">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const DEFAULT_ITEMS = [
  {
    imageUrl: "/images/testimonial_1_1780074444196.png",
    imageAlt: "Client",
    quote: "Feeling lighter, healthier, and more confident.",
    showBeforeAfter: false,
    showPlayButton: false,
  },
  {
    imageUrl: "/images/before_after_1780074487458.png",
    imageAlt: "Before and After",
    quote: "Better digestion and improved daily energy.",
    showBeforeAfter: true,
    beforeLabel: "Before",
    afterLabel: "After",
    showPlayButton: false,
  },
  {
    imageUrl: "/images/testimonial_2_1780074466194.png",
    imageAlt: "Video Testimonial",
    quote: "Finally found a wellness routine that feels sustainable.",
    showBeforeAfter: false,
    showPlayButton: true,
  },
];

export default function TestimonialSection() {
  const t = useVisualContent().testimonials ?? {};

  const {
    items: editableItems,
    addCard,
    removeAt,
    reorderAt,
  } = useEditableCardList({
    path: "testimonials.items",
    sourceItems: t.items,
    defaultItems: DEFAULT_ITEMS,
    createItem: () => ({
      imageUrl: "/images/testimonial_1_1780074444196.png",
      imageAlt: "Client",
      quote: "New testimonial quote",
      showBeforeAfter: false,
      showPlayButton: false,
    }),
  });

  const { isEditMode } = useEditMode();
  const { dragIndex, dropIndex, startDrag, setDropTarget, finishDrag } = useDragReorder(reorderAt);

  const isHorizontal = t.imageOrientation === "horizontal";
  const aspectRatioClass = isHorizontal ? "aspect-video" : "aspect-square";

  const setOrientation = async (orientation: "vertical" | "horizontal") => {
    await fetch("/api/admin/visual-content", {
      method: "POST",
      body: JSON.stringify({ path: "testimonials.imageOrientation", value: orientation }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
  };

  const imageScale = t.imageScale ?? 100;
  const setScale = async (scale: number) => {
    const newScale = Math.min(200, Math.max(50, scale));
    if (newScale === imageScale) return;
    await fetch("/api/admin/visual-content", {
      method: "POST",
      body: JSON.stringify({ path: "testimonials.imageScale", value: newScale }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
  };

  return (
    <EditableSection sectionId="testimonials" label="Testimonials Section" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="relative text-center mb-16 space-y-4">
        {isEditMode && (
          <div className="absolute -top-12 right-0 z-50 flex items-center gap-2 bg-background/80 p-1.5 rounded-xl backdrop-blur-md border border-foreground/10 shadow-lg">
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
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          <EditableText path="testimonials.heading" fallback={t.heading ?? "Real Client Transformations"} />
        </h2>
        <EditableText
          path="testimonials.subheading"
          fallback={t.subheading ?? "See how fixing the gut changes everything."}
          className="text-lg text-wellness-800/80 block"
          multiline
        />
      </div>

      <div style={{ width: `${imageScale}%`, transition: 'width 0.3s ease' }} className="mx-auto flex-shrink-0">
        <div className="grid md:grid-cols-3 gap-8">
        {editableItems.map((card, i) => (
          <DraggableItem
            key={i}
            index={i}
            total={editableItems.length}
            enabled={isEditMode}
            isDragging={dragIndex === i}
            isDropTarget={dropIndex === i}
            onDragStart={() => startDrag(i)}
            onDragOver={() => setDropTarget(i)}
            onDragEnd={finishDrag}
            onDrop={finishDrag}
            onMoveEarlier={() => reorderAt(i, i - 1)}
            onMoveLater={() => reorderAt(i, i + 1)}
            className="bg-background rounded-3xl p-6 shadow-xl shadow-wellness-100 border border-wellness-100 hover:-translate-y-2 transition-transform duration-300 relative group/card"
          >
            {isEditMode && <CardRemoveButton onRemove={() => removeAt(i)} className="absolute top-3 right-3 z-10" />}
            <div className={`${aspectRatioClass} relative rounded-2xl overflow-hidden mb-6${card.showPlayButton ? " cursor-pointer group" : ""}`}>
              <EditableImage
                path={`testimonials.items.${i}.imageUrl`}
                fallback={card.imageUrl ?? ""}
                alt={card.imageAlt ?? "Client"}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className={`object-cover${card.showBeforeAfter ? " transition-transform duration-700 group-hover:scale-110" : ""}`}
              />
              {card.showBeforeAfter && (
                <>
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    <EditableText path={`testimonials.items.${i}.beforeLabel`} fallback={card.beforeLabel ?? "Before"} />
                  </div>
                  <div className="absolute top-2 right-2 bg-wellness-600/90 text-background text-xs px-2 py-1 rounded">
                    <EditableText path={`testimonials.items.${i}.afterLabel`} fallback={card.afterLabel ?? "After"} />
                  </div>
                </>
              )}
              {card.showPlayButton && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-14 h-14 bg-background/90 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <svg className="w-6 h-6 text-wellness-600 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <StarRating />
            <div className="italic text-lg font-medium text-wellness-900 flex">
              &quot;<EditableText path={`testimonials.items.${i}.quote`} fallback={card.quote ?? ""} className="flex-1" />&quot;
            </div>
          </DraggableItem>
        ))}
        {isEditMode && (
          <div className="flex justify-center mt-12">
            <button onClick={() => addCard()} className="editor-btn">
              + Add Testimonial
            </button>
          </div>
        )}
      </div>
      </div>
    </EditableSection>
  );
}
