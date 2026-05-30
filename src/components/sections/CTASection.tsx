export default function CTASection() {
  return (
    <section id="consultation" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-wellness-900 text-background">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-wellness-800 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
        <h2 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-background">
          Start Your Gut Wellness <br className="hidden md:block"/> Journey Today
        </h2>
        <p className="text-xl text-wellness-100 max-w-2xl mx-auto leading-relaxed">
          Take the first step toward feeling lighter, healthier, and more confident.
        </p>
        
        <div className="bg-background/10 p-8 rounded-3xl backdrop-blur-md border border-background/20 max-w-md mx-auto">
          <form className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-wellness-100 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-background/90 text-wellness-900 placeholder-wellness-900/50 focus:ring-2 focus:ring-earth-400 outline-none transition-all" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-wellness-100 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl bg-background/90 text-wellness-900 placeholder-wellness-900/50 focus:ring-2 focus:ring-earth-400 outline-none transition-all" placeholder="you@example.com" />
            </div>
            <button type="button" className="w-full bg-earth-500 hover:bg-earth-600 text-background py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-earth-500/30">
              Book Consultation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
