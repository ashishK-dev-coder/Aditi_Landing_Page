import Image from "next/image";

const StarRating = () => (
  <div className="flex gap-1 text-earth-500 mb-4">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function TestimonialSection() {
  return (
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
          <StarRating />
          <p className="italic text-lg font-medium text-wellness-900">&quot;Feeling lighter, healthier, and more confident.&quot;</p>
        </div>

        {/* Card 2 - Before/After */}
        <div className="bg-background rounded-3xl p-6 shadow-xl shadow-wellness-100 border border-wellness-100 hover:-translate-y-2 transition-transform duration-300">
          <div className="aspect-square relative rounded-2xl overflow-hidden mb-6 group">
            <Image src="/images/before_after_1780074487458.png" alt="Before and After" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">Before</div>
            <div className="absolute top-2 right-2 bg-wellness-600/90 text-background text-xs px-2 py-1 rounded">After</div>
          </div>
          <StarRating />
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
          <StarRating />
          <p className="italic text-lg font-medium text-wellness-900">&quot;Finally found a wellness routine that feels sustainable.&quot;</p>
        </div>
      </div>
    </section>
  );
}
