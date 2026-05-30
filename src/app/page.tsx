import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import VSLVideoSection from "@/components/sections/VSLVideoSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import VideoTestimonialSection from "@/components/sections/VideoTestimonialSection";
import WellnessKitSection from "@/components/sections/WellnessKitSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TeamSection from "@/components/sections/TeamSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen font-sans overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <VSLVideoSection />
      <TestimonialSection />
      <VideoTestimonialSection />
      <WellnessKitSection />
      <HowItWorksSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </main>
  );
}
