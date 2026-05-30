import Image from "next/image";

export default function WellnessKitSection() {
  return (
    <section className="bg-earth-50 py-24 px-6 relative overflow-hidden">
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-wellness-200 rounded-full blur-[100px] opacity-50"></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative group">
          <div className="absolute inset-0 bg-earth-200 rounded-[3rem] -rotate-3 transition-transform group-hover:-rotate-6"></div>
          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image 
              src="/images/product_kit_1780074391931.png" 
              alt="Wellness Support Kit" 
              fill 
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        </div>
        
        <div className="space-y-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground">Wellness Support Kit</h2>
          <p className="text-xl text-wellness-800/80">
            Everything you need to support your gut, manage weight, and feel your best every single day.
          </p>
          
          <ul className="space-y-5">
            {[
              "Gut Health Support",
              "Lifestyle Wellness Support",
              "Daily Routine Friendly",
              "Designed For Wellness Journey"
            ].map((highlight, i) => (
              <li key={i} className="flex items-center gap-4 p-4 bg-background rounded-2xl shadow-sm border border-transparent hover:border-wellness-200 transition-colors text-foreground">
                <div className="w-8 h-8 rounded-full bg-wellness-100 flex items-center justify-center text-wellness-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-semibold text-lg">{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="pt-6">
            <a
              href="#consultation"
              className="inline-block bg-wellness-900 text-background px-8 py-4 rounded-full font-semibold transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              Talk To Expert
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
