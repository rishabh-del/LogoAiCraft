import { Palette } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Palette className="text-2xl text-primary" />
            <h1 className="text-xl font-bold gradient-text">LogoCraft Pro</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-600 hover:text-primary transition-colors">Home</a>
            <a href="#services" className="text-gray-600 hover:text-primary transition-colors">Services</a>
            <a href="#portfolio" className="text-gray-600 hover:text-primary transition-colors">Portfolio</a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
