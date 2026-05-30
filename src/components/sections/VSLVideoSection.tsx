import Image from "next/image";

export default function VSLVideoSection() {
  return (
    <section className="bg-wellness-50 py-24 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          Discover The <span className="text-gradient">Real Reason</span> Behind<br/> Stubborn Weight &amp; Gut Issues
        </h2>
        
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-foreground group cursor-pointer border border-wellness-200">
          <div className="absolute inset-0 flex items-center justify-center z-10 transition-transform group-hover:scale-110">
            <div className="w-20 h-20 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-wellness-600 translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* Video Placeholder Background */}
          <Image 
             src="/images/gut_health_1780074429411.png" 
             alt="Video Thumbnail" 
             fill 
             sizes="(min-width: 1024px) 896px, 100vw"
             className="object-cover opacity-60 transition-opacity group-hover:opacity-40 mix-blend-overlay" 
          />
        </div>

        <div className="max-w-2xl mx-auto glass p-8 rounded-2xl bg-background/30 text-foreground">
          <p className="text-lg font-medium mb-6">Learn how gut imbalance may affect:</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Weight gain', 'Low energy', 'Digestion', 'Cravings', 'Bloating'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full bg-background text-wellness-800 shadow-sm border border-wellness-200 text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-foreground/80 mb-8">
            And discover a wellness-focused approach designed to support your body naturally.
          </p>
          <a
            href="#consultation"
            className="inline-block bg-earth-500 hover:bg-earth-600 text-background px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-1"
          >
            Watch &amp; Book Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
