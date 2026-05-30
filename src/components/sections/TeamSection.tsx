import Image from "next/image";

export default function TeamSection() {
  return (
    <section className="bg-wellness-50 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Meet Our Team</h2>
        <p className="text-wellness-800/70 text-lg mb-14 max-w-xl mx-auto">The experts behind your wellness transformation.</p>

        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { name: "Dr. Aditi Sharma", role: "Founder & Wellness Expert", img: "/images/team_founder.png" },
            { name: "Rahul Mehra", role: "Senior Nutritionist", img: "/images/team_nutritionist.png" },
            { name: "Priya Kapoor", role: "Lifestyle & Fitness Coach", img: "/images/team_coach.png" },
          ].map((member, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden shadow-lg border-4 border-background transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <Image src={member.img} alt={member.name} fill sizes="160px" className="object-cover" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
              <p className="text-sm text-wellness-600 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
