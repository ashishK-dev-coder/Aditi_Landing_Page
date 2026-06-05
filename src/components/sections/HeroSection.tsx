"use client";

import { EditableSection, EditableText, EditableImage, useEditableCardList, DraggableItem, CardRemoveButton, useDragReorder, useEditMode } from "@/components/visual-editor";
import { useVisualContent } from "@/components/ContentProvider";

export default function HeroSection({ bookHref = "#consultation" }: { bookHref?: string }) {
  const h = useVisualContent().hero ?? {};
  const {
    items: editableBenefits,
    addCard,
    removeAt,
    reorderAt,
  } = useEditableCardList({
    path: "hero.benefits",
    sourceItems: h.benefits,
    defaultItems: [
      "Reduce Bloating",
      "Improve Digestion",
      "Support Healthy Weight Loss",
      "Feel More Active & Confident",
    ],
    createItem: () => "New Benefit",
  });

  const { isEditMode } = useEditMode();
  const { dragIndex, dropIndex, startDrag, setDropTarget, finishDrag } = useDragReorder(reorderAt);

  const isHorizontal = h.imageOrientation === "horizontal";
  const containerWidthClass = isHorizontal 
    ? "max-w-[500px] md:max-w-[600px] lg:max-w-[700px] mt-8 md:mt-0 lg:ml-auto" 
    : "max-w-[300px] md:max-w-[340px] lg:max-w-[380px] -mt-6 md:-mt-12 lg:-mt-24";
  const aspectRatioClass = isHorizontal ? "aspect-[16/9]" : "aspect-[4/5]";

  const setOrientation = async (orientation: "vertical" | "horizontal") => {
    await fetch("/api/admin/visual-content", {
      method: "POST",
      body: JSON.stringify({ path: "hero.imageOrientation", value: orientation }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
  };

  const imageScale = h.imageScale ?? 100;
  const setScale = async (scale: number) => {
    const newScale = Math.min(200, Math.max(50, scale));
    if (newScale === imageScale) return;
    await fetch("/api/admin/visual-content", {
      method: "POST",
      body: JSON.stringify({ path: "hero.imageScale", value: newScale }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
  };

  return (
    <EditableSection sectionId="hero" label="Hero Section" className="relative pt-24 pb-12 md:pt-48 md:pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--color-wellness-200)_0%,_transparent_50%)] opacity-50"></div>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight tracking-tight text-balance">
            <EditableText path="hero.headingGradient" fallback={h.headingGradient ?? "Fix Your Gut."} className="text-gradient" /> <br />
            <EditableText path="hero.headingRest" fallback={h.headingRest ?? "Transform Your Weight."} />
          </h1>
          <EditableText
            path="hero.subheading"
            fallback={h.subheading ?? "Support your body naturally with a personalized gut wellness and weight management approach."}
            className="text-lg md:text-xl text-wellness-800/80 max-w-lg leading-relaxed block"
            multiline
          />
          <ul className="space-y-4 font-medium text-wellness-900">
            {editableBenefits.map((benefit, i) => (
              <DraggableItem
                key={i}
                index={i}
                total={editableBenefits.length}
                enabled={isEditMode}
                isDragging={dragIndex === i}
                isDropTarget={dropIndex === i}
                onDragStart={() => startDrag(i)}
                onDragOver={() => setDropTarget(i)}
                onDragEnd={finishDrag}
                onDrop={finishDrag}
                onMoveEarlier={() => reorderAt(i, i - 1)}
                onMoveLater={() => reorderAt(i, i + 1)}
                className="flex items-center gap-4 p-4 pr-12 rounded-2xl bg-wellness-50/50 relative group/card"
              >
                {isEditMode && <CardRemoveButton onRemove={() => removeAt(i)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10" />}
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-earth-200 flex items-center justify-center text-earth-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <EditableText path={`hero.benefits.${i}`} fallback={benefit} className="flex-1" />
              </DraggableItem>
            ))}
            {isEditMode && (
              <li className="pt-2">
                 <button onClick={() => addCard()} className="editor-btn text-xs">+ Add Benefit</button>
              </li>
            )}
          </ul>
          <div className="pt-4">
            <a
              href={bookHref}
              className="inline-block bg-wellness-600 hover:bg-wellness-700 text-background text-lg px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-wellness-600/30 hover:-translate-y-1"
            >
              <EditableText path="hero.ctaText" fallback={h.ctaText ?? "Book Consultation Now"} />
            </a>
          </div>
        </div>
        <div className={`relative animate-fade-in-up delay-200 group mx-auto w-full transition-all duration-500 flex flex-col items-center justify-center ${containerWidthClass}`}>
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
          <div style={{ width: `${imageScale}%`, transition: 'width 0.3s ease' }} className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-wellness-300 rounded-[2.5rem] rotate-3 scale-105 transition-transform group-hover:rotate-6 opacity-20"></div>
            <div className={`relative rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 w-full ${aspectRatioClass}`}>
              <EditableImage
                path="hero.imageUrl"
                fallback={h.imageUrl ?? "/images/lifestyle_wellness_1780074407043.png"}
                alt={h.imageAlt ?? "Healthy Lifestyle"}
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 340px, 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: "3s" }}>
                 <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0">
                    <EditableImage
                      path="hero.badgeImageUrl"
                      fallback={h.badgeImageUrl ?? "/images/gut_health_1780074429411.png"}
                      alt={h.badgeImageAlt ?? "Gut Health"}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                 </div>
                 <div>
                   <EditableText path="hero.badgeTitle" fallback={h.badgeTitle ?? "Natural Healing"} className="text-white font-medium text-sm block" />
                   <EditableText path="hero.badgeSubtitle" fallback={h.badgeSubtitle ?? "Targeting the root cause"} className="text-white/80 text-xs block" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
