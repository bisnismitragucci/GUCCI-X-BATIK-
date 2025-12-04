
import React, { useState } from 'react';
import { Menu, X, Search, ChevronDown, Gift } from 'lucide-react';

interface NavbarProps {
    onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (key: string) => {
      if (key === 'collection') onNavigate('collection');
      else if (key === 'partners') onNavigate('partners');
      else if (key === 'impact') onNavigate('impact');
      else if (key === 'gala') onNavigate('gala');
      else onNavigate('home');
      
      setIsOpen(false);
  };

  return (
    <header className="w-full z-50 relative bg-white font-sans sticky top-0 transition-all duration-300">
      {/* Top Bar - Gucci Holiday Red */}
      <div className="bg-[#8B1D1D] text-white hidden md:block">
        <div className="container mx-auto px-6 h-9 flex justify-between items-center text-[10px] tracking-widest uppercase font-medium">
          <div className="flex space-x-6">
            <span className="flex items-center"><Gift className="w-3 h-3 mr-2" /> PT. Graha Citra Prima – GUCCI</span>
          </div>
          
          <div className="flex items-center space-x-6">
             <a href="#" className="hover:text-[#BFA36F] transition-colors">Customer Service</a>
             <a href="#" className="hover:text-[#BFA36F] transition-colors">Newsletter</a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="bg-white h-24 border-b border-gray-100">
        <div className="container mx-auto px-6 h-full flex justify-between items-center relative">
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-black hover:text-[#8B1D1D]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Search - Left */}
          <div className="hidden lg:flex items-center w-1/4">
            <Search className="w-5 h-5 cursor-pointer hover:text-[#8B1D1D] transition-colors" />
            <span className="ml-2 text-xs uppercase tracking-widest cursor-pointer hover:text-[#8B1D1D]">CARI</span>
          </div>

          {/* Logo - Center */}
          <div className="flex flex-col items-center justify-center absolute left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={() => onNavigate('home')}>
            <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.15em] text-[#8B1D1D] leading-none">
              GUCCI
            </h1>
            <span className="text-[8px] md:text-[9px] mt-1 font-bold text-black tracking-[0.2em] uppercase whitespace-nowrap">
              PT. Graha Citra Prima
            </span>
          </div>

          {/* Icons - Right */}
          <div className="flex items-center justify-end w-1/4 space-x-6">
             <div className="hidden lg:block">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#BFA36F]">
                    INDONESIA (ID)
                </span>
             </div>
          </div>
        </div>
      </div>

      {/* Navigation Links - Centered below logo */}
      <nav className="hidden lg:flex justify-center items-center py-4 bg-white">
        <div className="flex space-x-10">
            {/* Static Navigation Items */}
            <div className="group relative">
                <button onClick={() => handleNavClick('collection')} className="text-xs font-bold text-gray-800 group-hover:text-[#8B1D1D] uppercase tracking-[0.15em] transition-colors flex items-center bg-transparent border-none cursor-pointer">
                    RENAISSANCE BATIK
                </button>
                <div className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#8B1D1D] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></div>
            </div>
            <div className="group relative">
                <button onClick={() => handleNavClick('partners')} className="text-xs font-bold text-gray-800 group-hover:text-[#8B1D1D] uppercase tracking-[0.15em] transition-colors flex items-center bg-transparent border-none cursor-pointer">
                    MITRA BUTIK
                </button>
                <div className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#8B1D1D] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></div>
            </div>
            <div className="group relative">
                <button onClick={() => handleNavClick('impact')} className="text-xs font-bold text-gray-800 group-hover:text-[#8B1D1D] uppercase tracking-[0.15em] transition-colors flex items-center bg-transparent border-none cursor-pointer">
                    EKSPOR GLOBAL
                </button>
                <div className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#8B1D1D] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></div>
            </div>
            <div className="group relative">
                <button onClick={() => handleNavClick('gala')} className="text-xs font-bold text-gray-800 group-hover:text-[#8B1D1D] uppercase tracking-[0.15em] transition-colors flex items-center bg-transparent border-none cursor-pointer">
                    GALA NATAL
                </button>
                <div className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#8B1D1D] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></div>
            </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl h-screen z-50">
          <div className="flex flex-col p-8 space-y-6 text-center">
            <button onClick={() => handleNavClick('collection')} className="text-lg font-serif text-black hover:text-[#8B1D1D] italic bg-transparent border-none cursor-pointer">RENAISSANCE BATIK</button>
            <button onClick={() => handleNavClick('partners')} className="text-lg font-serif text-black hover:text-[#8B1D1D] italic bg-transparent border-none cursor-pointer">MITRA BUTIK</button>
            <button onClick={() => handleNavClick('impact')} className="text-lg font-serif text-black hover:text-[#8B1D1D] italic bg-transparent border-none cursor-pointer">EKSPOR GLOBAL</button>
            <button onClick={() => handleNavClick('gala')} className="text-lg font-serif text-black hover:text-[#8B1D1D] italic bg-transparent border-none cursor-pointer">GALA NATAL</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
