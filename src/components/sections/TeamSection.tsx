"use client";

import { EditableSection, EditableText, EditableImage, useEditableCardList, DraggableItem, CardRemoveButton, useDragReorder, useEditMode } from "@/components/visual-editor";
import { useVisualContent } from "@/components/ContentProvider";

const DEFAULT_MEMBERS = [
  { name: "Dr. Aditi Sharma", role: "Founder & Wellness Expert", imageUrl: "/images/team_founder.png" },
  { name: "Rahul Mehra", role: "Senior Nutritionist", imageUrl: "/images/team_nutritionist.png" },
  { name: "Priya Kapoor", role: "Lifestyle & Fitness Coach", imageUrl: "/images/team_coach.png" },
];

export default function TeamSection() {
  const t = useVisualContent().team ?? {};

  const {
    items: editableMembers,
    addCard,
    removeAt,
    reorderAt,
  } = useEditableCardList({
    path: "team.members",
    sourceItems: t.members,
    defaultItems: DEFAULT_MEMBERS,
    createItem: () => ({ name: "New Member", role: "Role", imageUrl: "/images/team_coach.png" }),
  });

  const { isEditMode } = useEditMode();
  const { dragIndex, dropIndex, startDrag, setDropTarget, finishDrag } = useDragReorder(reorderAt);

  return (
    <EditableSection sectionId="team" label="Team Section" className="bg-wellness-50 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          <EditableText path="team.heading" fallback={t.heading ?? "Meet Our Team"} />
        </h2>
        <EditableText
          path="team.subheading"
          fallback={t.subheading ?? "The experts behind your wellness transformation."}
          className="text-wellness-800/70 text-lg mb-14 max-w-xl mx-auto block"
          multiline
        />

        <div className="grid sm:grid-cols-3 gap-8">
          {editableMembers.map((member, i) => (
            <DraggableItem
              key={i}
              index={i}
              total={editableMembers.length}
              enabled={isEditMode}
              isDragging={dragIndex === i}
              isDropTarget={dropIndex === i}
              onDragStart={() => startDrag(i)}
              onDragOver={() => setDropTarget(i)}
              onDragEnd={finishDrag}
              onDrop={finishDrag}
              onMoveEarlier={() => reorderAt(i, i - 1)}
              onMoveLater={() => reorderAt(i, i + 1)}
              className="group cursor-pointer relative group/card"
            >
              {isEditMode && <CardRemoveButton onRemove={() => removeAt(i)} className="absolute top-2 right-2 z-10" />}
              <div className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden shadow-lg border-4 border-background transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <EditableImage path={`team.members.${i}.imageUrl`} fallback={member.imageUrl} alt={member.name} fill sizes="160px" className="object-cover" />
              </div>
              <h3 className="text-lg font-bold text-foreground"><EditableText path={`team.members.${i}.name`} fallback={member.name ?? ""} className="block" /></h3>
              <EditableText path={`team.members.${i}.role`} fallback={member.role ?? ""} className="text-sm text-wellness-600 font-medium block" />
            </DraggableItem>
          ))}
        </div>
        {isEditMode && (
          <div className="flex justify-center mt-12">
            <button onClick={() => addCard()} className="editor-btn">
              + Add Team Member
            </button>
          </div>
        )}
      </div>
    </EditableSection>
  );
}
