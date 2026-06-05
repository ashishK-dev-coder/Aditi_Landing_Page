"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { EditableSection, EditableText, EditableImage, useEditableCardList, DraggableItem, CardRemoveButton, useDragReorder, useEditMode } from "@/components/visual-editor";
import { useVisualContent } from "@/components/ContentProvider";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  thumbnail: string;
  videoUrl?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sneha Gupta",
    location: "Mumbai",
    quote: "Lost 12kg in 3 months — my energy is through the roof!",
    thumbnail: "/images/screenshots/testimonial_1_1780074444196.png",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Delhi",
    quote: "No more bloating. I finally feel comfortable in my own skin.",
    thumbnail: "/images/screenshots/before_after_1780074487458.png",
  },
  {
    id: 3,
    name: "Priya Nair",
    location: "Bangalore",
    quote: "The gut wellness plan changed my relationship with food.",
    thumbnail: "/images/screenshots/testimonial_2_1780074466194.png",
  },
  {
    id: 4,
    name: "Amit Sharma",
    location: "Pune",
    quote: "Better sleep, better digestion, better life!",
    thumbnail: "/images/hero/lifestyle_wellness_1780074407043.png",
  },
  {
    id: 5,
    name: "Kavita Reddy",
    location: "Hyderabad",
    quote: "I wish I had found AditiWellness sooner. Truly life-changing.",
    thumbnail: "/images/hero/gut_health_1780074429411.png",
  },
];

export default function ScreenshotSection() {
  const vt = useVisualContent().screenshots ?? {};
  
  const {
    items: editableTestimonials,
    addCard,
    removeAt,
    reorderAt,
  } = useEditableCardList({
    path: "screenshots.items",
    sourceItems: vt.items,
    defaultItems: DEFAULT_TESTIMONIALS,
    createItem: () => ({
      id: Date.now(),
      name: "New Client",
      location: "City",
      quote: "New testimonial quote",
      thumbnail: "/images/screenshots/testimonial_1_1780074444196.png",
    }),
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { isEditMode } = useEditMode();
  const { dragIndex, dropIndex, startDrag, setDropTarget, finishDrag } = useDragReorder(reorderAt);

  const cardWidth = 280;
  const cardGap = 24;

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!scrollRef.current) return;
      const scrollPos = index * (cardWidth + cardGap);
      scrollRef.current.scrollTo({ left: scrollPos, behavior: "smooth" });
    },
    [cardWidth, cardGap]
  );

  // Auto-carousel
  useEffect(() => {
    if (isHovered || editableTestimonials.length === 0) return;

    const timer = setTimeout(() => {
      const next = (currentIndex + 1) % editableTestimonials.length;
      setCurrentIndex(next);
      scrollToIndex(next);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isHovered, scrollToIndex, currentIndex, editableTestimonials.length]);

  // Sync scroll position to currentIndex
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / (cardWidth + cardGap));
    if (index !== currentIndex && index >= 0 && index < editableTestimonials.length) {
      setCurrentIndex(index);
    }
  };

  const scrollPrev = () => {
    const prev = Math.max(0, currentIndex - 1);
    setCurrentIndex(prev);
    scrollToIndex(prev);
  };

  const scrollNext = () => {
    const next = Math.min(editableTestimonials.length - 1, currentIndex + 1);
    setCurrentIndex(next);
    scrollToIndex(next);
  };

  return (
    <EditableSection sectionId="screenshots" label="Screenshot Section" className="py-24 px-6 overflow-hidden bg-gradient-to-b from-wellness-50/50 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wellness-100 text-wellness-700 text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <EditableText path="screenshots.badge" fallback={vt.badge ?? "Screenshot Section"} />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            <EditableText path="screenshots.headingLine1" fallback={vt.headingLine1 ?? "Hear It Straight from"} />{" "}
            <EditableText path="screenshots.headingGradient" fallback={vt.headingGradient ?? "Our Clients!"} className="text-gradient" />
          </h2>
          <EditableText
            path="screenshots.subheading"
            fallback={vt.subheading ?? "Real stories. Real results. Watch their transformation journeys."}
            className="text-lg text-wellness-800/70 max-w-xl mx-auto block"
            multiline
          />
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            aria-label="Previous screenshot"
            className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm shadow-xl border border-wellness-200 flex items-center justify-center text-wellness-700 hover:bg-wellness-50 hover:scale-110 transition-all disabled:opacity-30 disabled:pointer-events-none"
            disabled={currentIndex === 0}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next screenshot"
            className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-wellness-100 text-wellness-800 hover:bg-wellness-50 hover:-translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            disabled={currentIndex === editableTestimonials.length - 1}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {isEditMode && (
          <div className="flex justify-center mt-12 relative z-20">
            <button onClick={() => addCard()} className="editor-btn">
              + Add Screenshot
            </button>
          </div>
        )}
          
          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth px-4 md:px-12 pb-4 snap-x snap-mandatory hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {editableTestimonials.map((item, i) => (
              <DraggableItem
                key={item.id || i}
                index={i}
                total={editableTestimonials.length}
                enabled={isEditMode}
                isDragging={dragIndex === i}
                isDropTarget={dropIndex === i}
                onDragStart={() => startDrag(i)}
                onDragOver={() => setDropTarget(i)}
                onDragEnd={finishDrag}
                onDrop={finishDrag}
                onMoveEarlier={() => reorderAt(i, i - 1)}
                onMoveLater={() => reorderAt(i, i + 1)}
                className="flex-shrink-0 snap-center relative group/card"
                style={{ width: `${cardWidth}px` }}
              >
                {isEditMode && <CardRemoveButton onRemove={() => removeAt(i)} className="absolute top-3 right-3 z-40" />}
                <div
                  className="relative rounded-[1.75rem] overflow-hidden shadow-xl border-2 transition-all duration-500 border-wellness-100 hover:border-wellness-300 hover:shadow-2xl hover:-translate-y-2 group"
                  style={{ aspectRatio: "9/16" }}
                >
                  {/* AditiWellness Branding - Top */}
                  <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-wellness-500 flex items-center justify-center">
                        <span className="text-white font-heading font-bold text-xs">A</span>
                      </div>
                      <div>
                        <p className="text-white font-heading font-bold text-sm tracking-tight leading-none flex gap-1">
                          <EditableText path="screenshots.brandPrimary" fallback={vt.brandPrimary ?? "Aditi"} />
                          <EditableText path="screenshots.brandAccent" fallback={vt.brandAccent ?? "Wellness"} className="text-earth-500" />
                        </p>
                        <EditableText path="screenshots.sponsoredLabel" fallback={vt.sponsoredLabel ?? "Sponsored"} className="text-white/60 text-[10px] mt-0.5 block" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0">
                    <EditableImage
                      path={`screenshots.items.${i}.thumbnail`}
                      fallback={item.thumbnail}
                      alt={`${item.name} screenshot`}
                      fill
                      sizes="280px"
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom Gradient with Client Info */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-5 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    {/* Quote */}
                    <div className="text-white text-sm font-medium leading-snug mb-3 line-clamp-2 flex">
                      &quot;<EditableText path={`screenshots.items.${i}.quote`} fallback={item.quote ?? ""} className="flex-1" />&quot;
                    </div>
                    {/* Client Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/40 relative flex-shrink-0">
                        <EditableImage
                          path={`screenshots.items.${i}.thumbnail`}
                          fallback={item.thumbnail}
                          alt={item.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <EditableText path={`screenshots.items.${i}.name`} fallback={item.name ?? ""} className="text-white font-semibold text-sm leading-none block" />
                        <EditableText path={`screenshots.items.${i}.location`} fallback={item.location ?? ""} className="text-white/60 text-xs mt-0.5 block" />
                      </div>
                    </div>

                    {/* Engagement Icons (Reels style) */}
                    <div className="absolute right-4 bottom-20 flex flex-col items-center gap-5">
                      <button className="flex flex-col items-center gap-1 group/btn" aria-label="Like">
                        <svg className="w-7 h-7 text-white transition-colors group-hover/btn:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-white text-[10px] font-medium">2.4k</span>
                      </button>
                      <button className="flex flex-col items-center gap-1" aria-label="Share">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span className="text-white text-[10px] font-medium">Share</span>
                      </button>
                    </div>
                  </div>

                </div>
              </DraggableItem>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {editableTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  scrollToIndex(i);
                }}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-8 h-3 bg-wellness-600"
                    : "w-3 h-3 bg-wellness-300 hover:bg-wellness-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 15s linear forwards;
        }
      `}</style>
    </EditableSection>
  );
}
