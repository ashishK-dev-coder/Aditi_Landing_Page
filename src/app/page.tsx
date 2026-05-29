import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-wellness-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-heading font-bold text-2xl tracking-tighter text-wellness-800">
            Aditi<span className="text-earth-500">Wellness</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="#consultation"
              className="hidden md:inline-block bg-wellness-600 hover:bg-wellness-700 text-background px-6 py-2 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-wellness-600/20"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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

      {/* VSL Video Section */}
      <section className="bg-wellness-50 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Discover The <span className="text-gradient">Real Reason</span> Behind<br/> Stubborn Weight & Gut Issues
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
              Watch & Book Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground">Real Client Transformations</h2>
          <p className="text-lg text-wellness-800/80">See how fixing the gut changes everything.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-background rounded-3xl p-6 shadow-xl shadow-wellness-100 border border-wellness-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="aspect-square relative rounded-2xl overflow-hidden mb-6">
              <Image src="/images/testimonial_1_1780074444196.png" alt="Client" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="flex gap-1 text-earth-500 mb-4">
              {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
            </div>
            <p className="italic text-lg font-medium text-wellness-900">&quot;Feeling lighter, healthier, and more confident.&quot;</p>
          </div>

          {/* Card 2 - Before/After */}
          <div className="bg-background rounded-3xl p-6 shadow-xl shadow-wellness-100 border border-wellness-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="aspect-square relative rounded-2xl overflow-hidden mb-6 group">
              <Image src="/images/before_after_1780074487458.png" alt="Before and After" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">Before</div>
              <div className="absolute top-2 right-2 bg-wellness-600/90 text-background text-xs px-2 py-1 rounded">After</div>
            </div>
            <div className="flex gap-1 text-earth-500 mb-4">
              {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
            </div>
            <p className="italic text-lg font-medium text-wellness-900">&quot;Better digestion and improved daily energy.&quot;</p>
          </div>

          {/* Card 3 - Video Testimonial */}
          <div className="bg-background rounded-3xl p-6 shadow-xl shadow-wellness-100 border border-wellness-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="aspect-square relative rounded-2xl overflow-hidden mb-6 cursor-pointer group">
              <Image src="/images/testimonial_2_1780074466194.png" alt="Video Testimonial" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                 <div className="w-14 h-14 bg-background/90 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                   <svg className="w-6 h-6 text-wellness-600 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                 </div>
              </div>
            </div>
            <div className="flex gap-1 text-earth-500 mb-4">
              {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
            </div>
            <p className="italic text-lg font-medium text-wellness-900">&quot;Finally found a wellness routine that feels sustainable.&quot;</p>
          </div>
        </div>
      </section>

      {/* Weight Loss Kit Section */}
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

      {/* How It Works Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-16 text-foreground">Simple 3-Step Process</h2>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-wellness-200 z-0"></div>
          
          {[
            { step: '1', title: 'Book Consultation', desc: 'Speak with our wellness expert.' },
            { step: '2', title: 'Personalized Assessment', desc: 'Understand your gut & lifestyle challenges.' },
            { step: '3', title: 'Start Your Journey', desc: 'Get expert guidance and personalized support.' }
          ].map((item, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-background shadow-xl border-4 border-wellness-50 flex items-center justify-center text-3xl font-heading font-bold text-wellness-600 transition-transform hover:scale-110">
                {item.step}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-wellness-800/80">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
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

      {/* Footer */}
      <footer className="bg-wellness-950 text-wellness-100/60 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Aditi Wellness. All rights reserved.</p>
      </footer>
    </main>
  );
}
