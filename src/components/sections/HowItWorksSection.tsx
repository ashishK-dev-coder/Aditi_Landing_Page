export default function HowItWorksSection() {
  return (
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
  );
}
