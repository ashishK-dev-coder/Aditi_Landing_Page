import { EditableSection, EditableText } from "@/components/visual-editor";
import { loadVisualContent } from "@/lib/visual-data/loadContent";

export default function Footer() {
  const f = loadVisualContent().footer ?? {};
  const brand = f.brand ?? "Aditi Wellness";

  return (
    <EditableSection as="footer" sectionId="footer" label="Footer" className="bg-footer-bg text-footer-text/70 py-8 text-center text-sm">
      <p className="flex justify-center items-center gap-1">
        &copy; {new Date().getFullYear()} <EditableText path="footer.brand" fallback={brand} />. <EditableText path="footer.copyrightSuffix" fallback={f.copyrightSuffix ?? "All rights reserved."} />
      </p>
    </EditableSection>
  );
}
