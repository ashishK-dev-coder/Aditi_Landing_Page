import { ContentProvider } from "@/components/ContentProvider";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import VSLVideoSection from "@/components/sections/VSLVideoSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import VideoTestimonialSection from "@/components/sections/VideoTestimonialSection";
import ScreenshotSection from "@/components/sections/ScreenshotSection";
import WellnessKitSection from "@/components/sections/WellnessKitSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TeamSection from "@/components/sections/TeamSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import { loadVisualContent } from "@/lib/visual-data/loadContent";
import { SecretAdminLockButton } from "@/components/dev-cms/SecretAdminLockButton";
import { isAdminSession } from "@/lib/auth/session";
import { EditModeProvider } from "@/components/visual-editor/EditModeContext";
import { EditorToolbar } from "@/components/visual-editor/EditorToolbar";

export default async function Home() {
  const isAdmin = await isAdminSession();
  const content = loadVisualContent();
  const bookHref = content.site?.bookUrl ?? "#consultation";

  return (
    <ContentProvider content={content}>
      <EditModeProvider isEditMode={isAdmin} visualContent={content as any}>
        <main className="min-h-screen font-sans overflow-x-clip relative">
          {!isAdmin && <SecretAdminLockButton />}
          <EditorToolbar />
          <Navbar bookHref={bookHref} />
          
          {(content.site?.sectionOrder || [
            "hero", "vsl", "testimonials", "videoTestimonials", "screenshots", "wellnessKit", "howItWorks", "team", "cta"
          ]).map(sectionId => {
            switch (sectionId) {
              case "hero": return <HeroSection bookHref={bookHref} key="hero" />;
              case "vsl": return <VSLVideoSection bookHref={bookHref} key="vsl" />;
              case "testimonials": return <TestimonialSection key="testimonials" />;
              case "videoTestimonials": return <VideoTestimonialSection key="videoTestimonials" />;
              case "screenshots": return <ScreenshotSection key="screenshots" />;
              case "wellnessKit": return <WellnessKitSection bookHref={bookHref} key="wellnessKit" />;
              case "howItWorks": return <HowItWorksSection key="howItWorks" />;
              case "team": return <TeamSection key="team" />;
              case "cta": return <CTASection key="cta" />;
              default: return null;
            }
          })}

          <Footer />
        </main>
      </EditModeProvider>
    </ContentProvider>
  );
}
