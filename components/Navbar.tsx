
import React, { useState } from 'react';
import { Menu, X, Search, ChevronDown, Gift, Globe } from 'lucide-react';
import { NAV_ITEMS, LANGUAGES } from '../constants';

interface NavbarProps {
    onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('ID');

  const handleNavClick = (label: string) => {
      // Map label text to view IDs
      if (label.includes('RENAISSANCE')) onNavigate('collection');
      else if (label.includes('BUTIK')) onNavigate('partners');
      else if (label.includes('EKSPOR')) onNavigate('impact');
      else if (label.includes('GALA')) onNavigate('gala');
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
          
          {/* Expanded Language Selection */}
          <div className="flex items-center">
            <span className="mr-4 text-white/70">PILIH BAHASA :</span>
            <div className="flex items-center space-x-4 border-l border-white/20 pl-4">
              {LANGUAGES.map((lang) => (
                <button 
                    key={lang.code}
                    onClick={() => setActiveLang(lang.code)}
                    className={`cursor-pointer transition-colors font-bold hover:text-[#BFA36F] ${activeLang === lang.code ? 'text-[#BFA36F]' : 'text-white'}`}
                    title={lang.label}
                >
                    {lang.code}
                </button>
              ))}
            </div>
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
            {/* Adjusted logo text size for mobile (text-3xl) vs desktop (text-5xl) to prevent overlap */}
            <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.15em] text-[#8B1D1D] leading-none">
              GUCCI
            </h1>
            <span className="text-[8px] md:text-[9px] mt-1 font-bold text-black tracking-[0.2em] uppercase whitespace-nowrap">
              PT. Graha Citra Prima
            </span>
          </div>

          {/* Icons - Right */}
          <div className="flex items-center justify-end w-1/4 space-x-6">
             {/* ShoppingBag icon removed */}
             <div className="hidden lg:block">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#BFA36F]">
                    {LANGUAGES.find(l => l.code === activeLang)?.label}
                </span>
             </div>
          </div>
        </div>
      </div>

      {/* Navigation Links - Centered below logo */}
      <nav className="hidden lg:flex justify-center items-center py-4 bg-white">
        <div className="flex space-x-10">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="group relative">
                <button 
                  onClick={() => handleNavClick(item.label)}
                  className="text-xs font-bold text-gray-800 group-hover:text-[#8B1D1D] uppercase tracking-[0.15em] transition-colors flex items-center bg-transparent border-none cursor-pointer"
                >
                  {item.label}
                </button>
                <div className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#8B1D1D] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></div>
              </div>
            ))}
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl h-screen z-50">
          <div className="flex flex-col p-8 space-y-6 text-center">
             {NAV_ITEMS.map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item.label)} 
                className="text-lg font-serif text-black hover:text-[#8B1D1D] italic bg-transparent border-none cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="h-px bg-gray-100 w-1/2 mx-auto my-4"></div>
            
            {/* Mobile Language Selection */}
            <div className="grid grid-cols-3 gap-4 px-8">
                {LANGUAGES.map((lang) => (
                    <button 
                        key={lang.code}
                        onClick={() => setActiveLang(lang.code)}
                        className={`text-xs uppercase tracking-widest py-2 border border-gray-200 rounded-sm ${activeLang === lang.code ? 'bg-[#8B1D1D] text-white' : 'text-gray-500'}`}
                    >
                        {lang.code}
                    </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
