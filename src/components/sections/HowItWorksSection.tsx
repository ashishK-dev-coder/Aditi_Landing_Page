"use client";

import { EditableSection, EditableText, useEditableCardList, DraggableItem, CardRemoveButton, useDragReorder, useEditMode } from "@/components/visual-editor";
import { useVisualContent } from "@/components/ContentProvider";

const DEFAULT_STEPS = [
  { step: "1", title: "Book Consultation", desc: "Speak with our wellness expert." },
  { step: "2", title: "Personalized Assessment", desc: "Understand your gut & lifestyle challenges." },
  { step: "3", title: "Start Your Journey", desc: "Get expert guidance and personalized support." },
];

export default function HowItWorksSection() {
  const h = useVisualContent().howItWorks ?? {};

  const {
    items: editableSteps,
    addCard,
    removeAt,
    reorderAt,
  } = useEditableCardList({
    path: "howItWorks.steps",
    sourceItems: h.steps,
    defaultItems: DEFAULT_STEPS,
    createItem: () => ({ step: "?", title: "New Step", desc: "Description" }),
  });

  const { isEditMode } = useEditMode();
  const { dragIndex, dropIndex, startDrag, setDropTarget, finishDrag } = useDragReorder(reorderAt);

  return (
    <EditableSection sectionId="howItWorks" label="How It Works Section" className="py-24 px-6 max-w-5xl mx-auto text-center">
      <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-16 text-foreground">
        <EditableText path="howItWorks.heading" fallback={h.heading ?? "Simple 3-Step Process"} />
      </h2>

      <div className="grid md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-wellness-200 z-0"></div>

        {editableSteps.map((item, i) => (
          <DraggableItem
            key={i}
            index={i}
            total={editableSteps.length}
            enabled={isEditMode}
            isDragging={dragIndex === i}
            isDropTarget={dropIndex === i}
            onDragStart={() => startDrag(i)}
            onDragOver={() => setDropTarget(i)}
            onDragEnd={finishDrag}
            onDrop={finishDrag}
            onMoveEarlier={() => reorderAt(i, i - 1)}
            onMoveLater={() => reorderAt(i, i + 1)}
            className="relative z-10 flex flex-col items-center space-y-6 group/card"
          >
            {isEditMode && <CardRemoveButton onRemove={() => removeAt(i)} className="absolute top-0 right-4 md:right-0 z-10" />}
            <div className="w-24 h-24 rounded-full bg-background shadow-xl border-4 border-wellness-50 flex items-center justify-center text-3xl font-heading font-bold text-wellness-600 transition-transform hover:scale-110">
              <EditableText path={`howItWorks.steps.${i}.step`} fallback={item.step ?? ""} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-foreground"><EditableText path={`howItWorks.steps.${i}.title`} fallback={item.title ?? ""} className="block" /></h3>
              <EditableText path={`howItWorks.steps.${i}.desc`} fallback={item.desc ?? ""} className="text-wellness-800/80 block" multiline />
            </div>
          </DraggableItem>
        ))}
      </div>
        {isEditMode && (
          <div className="flex justify-center mt-12">
            <button onClick={() => addCard()} className="editor-btn">
              + Add Step
            </button>
          </div>
        )}
    </EditableSection>
  );
}
