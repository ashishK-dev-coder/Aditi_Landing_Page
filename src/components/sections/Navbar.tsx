import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  return (
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
  );
}
