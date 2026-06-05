import { EditableSection, EditableText } from "@/components/visual-editor";
import { loadVisualContent } from "@/lib/visual-data/loadContent";

export default function CTASection() {
  const content = loadVisualContent();
  const c = content.cta ?? {};
  const sectionId = (content.site?.consultationAnchor ?? "#consultation").replace(/^#/, "") || "consultation";

  return (
    <EditableSection as="section" id={sectionId} sectionId="cta" label="CTA Section" className="relative py-16 sm:py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-wellness-900 text-background">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-wellness-800 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
        <h2 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-background">
          <EditableText path="cta.headingLine1" fallback={c.headingLine1 ?? "Start Your Gut Wellness"} />{" "}
          <br className="hidden md:block"/><EditableText path="cta.headingLine2" fallback={c.headingLine2 ?? "Journey Today"} />
        </h2>
        <EditableText
          path="cta.subheading"
          fallback={c.subheading ?? "Take the first step toward feeling lighter, healthier, and more confident."}
          className="text-xl text-wellness-100 max-w-2xl mx-auto leading-relaxed block"
          multiline
        />

        <div className="bg-background/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md border border-background/20 max-w-md mx-auto w-full">
          <form className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-wellness-100 mb-1">
                <EditableText path="cta.nameLabel" fallback={c.nameLabel ?? "Name"} />
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-background/90 text-foreground placeholder-foreground/50 focus:ring-2 focus:ring-wellness-400 outline-none transition-all"
                placeholder={c.namePlaceholder ?? "Your name"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-wellness-100 mb-1">
                <EditableText path="cta.emailLabel" fallback={c.emailLabel ?? "Email"} />
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-background/90 text-foreground placeholder-foreground/50 focus:ring-2 focus:ring-wellness-400 outline-none transition-all"
                placeholder={c.emailPlaceholder ?? "you@example.com"}
              />
            </div>
            <button type="button" className="w-full bg-wellness-500 hover:bg-wellness-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-wellness-500/30">
              <EditableText path="cta.submitText" fallback={c.submitText ?? "Book Consultation"} />
            </button>
          </form>
        </div>
      </div>
    </EditableSection>
  );
}
