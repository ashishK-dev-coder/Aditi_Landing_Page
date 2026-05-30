import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--color-wellness-200)_0%,_transparent_50%)] opacity-50"></div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight tracking-tight text-balance">
            <span className="text-gradient">Fix Your Gut.</span> <br />
            Transform Your Weight.
          </h1>
          <p className="text-lg md:text-xl text-wellness-800/80 max-w-lg leading-relaxed">
            Support your body naturally with a personalized gut wellness and
            weight management approach.
          </p>
          <ul className="space-y-4 font-medium text-wellness-900">
            {[
              "Reduce Bloating",
              "Improve Digestion",
              "Support Healthy Weight Loss",
              "Feel More Active & Confident",
            ].map((benefit, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-earth-200 flex items-center justify-center text-earth-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {benefit}
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <a
              href="#consultation"
              className="inline-block bg-wellness-600 hover:bg-wellness-700 text-background text-lg px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-wellness-600/30 hover:-translate-y-1"
            >
              Book Consultation Now
            </a>
          </div>
        </div>
        <div className="relative animate-fade-in-up delay-200 group mx-auto w-full max-w-[300px] md:max-w-[340px] lg:max-w-[380px] -mt-6 md:-mt-12 lg:-mt-24">
          <div className="absolute inset-0 bg-wellness-300 rounded-[2.5rem] rotate-3 scale-105 transition-transform group-hover:rotate-6 opacity-20"></div>
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5]">
            <Image
              src="/images/lifestyle_wellness_1780074407043.png"
              alt="Healthy Lifestyle"
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 340px, 300px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: "3s" }}>
               <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image src="/images/gut_health_1780074429411.png" alt="Gut Health" fill sizes="48px" className="object-cover" />
               </div>
               <div>
                 <p className="text-white font-medium text-sm">Natural Healing</p>
                 <p className="text-white/80 text-xs">Targeting the root cause</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
