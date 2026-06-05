"use client";

import { Trash2 } from "lucide-react";

type Props = {
  saving: boolean;
  addLabel: string;
  onAdd: () => void;
  className?: string;
};

export function CardListEditorBar({ saving, addLabel, onAdd, className = "" }: Props) {
  return (
    <div className={`card-list-editor-bar ${className}`.trim()}>
      <button type="button" className="card-list-editor-add" disabled={saving} onClick={onAdd}>
        {saving ? "Saving..." : addLabel}
      </button>
    </div>
  );
}

type RemoveProps = {
  label?: string;
  disabled?: boolean;
  onRemove: () => void;
  className?: string;
};

export function CardRemoveButton({ label = "Remove", disabled, onRemove, className = "" }: RemoveProps) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center p-1.5 bg-red-100/90 backdrop-blur-sm text-red-600 rounded-full shadow-sm hover:bg-red-200 hover:text-red-700 transition-colors ${className}`.trim()}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
