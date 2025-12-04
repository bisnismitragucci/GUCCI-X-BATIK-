
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants';

interface HeroCarouselProps {
    onNavigate: (page: string) => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleCtaClick = (ctaText: string) => {
      if (ctaText.includes('KOLEKSI')) onNavigate('collection');
      else if (ctaText.includes('MITRA')) onNavigate('partners');
      else if (ctaText.includes('DAMPAK')) onNavigate('impact');
      else onNavigate('register');
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000); // Slower for luxury feel
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[600px] md:h-[750px] overflow-hidden bg-black group">
      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Image Layer - Using img tag for better compatibility with Pinterest/External links */}
          <div className="w-full h-full relative overflow-hidden">
             <img 
                src={slide.imageUrl}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform transition-transform duration-[10000ms] ease-linear"
                style={{
                    transform: index === currentSlide ? 'scale(1.0)' : 'scale(1.1)'
                }}
                onError={(e) => {
                    // Safety Fallback if the specific Pinterest link fails perfectly
                    e.currentTarget.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop";
                }}
             />
             {/* Dark gradient overlay - Enhanced for better text visibility (Darker) */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          {/* Content - Centered Bottom */}
          <div className="absolute inset-0 flex items-end justify-center pb-20 md:pb-28 text-center px-4 pointer-events-none">
            <div className="max-w-5xl mx-auto text-white pointer-events-auto">
              <h2 className="text-sm md:text-base font-black tracking-[0.3em] uppercase text-[#BFA36F] mb-6 animate-fadeIn flex items-center justify-center gap-4 drop-shadow-xl">
                 <span className="w-12 h-[2px] bg-[#BFA36F]"></span> 
                 GUCCI & BATIK
                 <span className="w-12 h-[2px] bg-[#BFA36F]"></span>
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold italic mb-8 leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] text-white">
                {slide.title}
              </h1>
              <p className="text-base md:text-xl mb-12 font-semibold text-white tracking-wide max-w-4xl mx-auto drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-relaxed">
                {slide.subtitle}
              </p>
              
              <button 
                onClick={() => handleCtaClick(slide.cta)}
                className="bg-[#8B1D1D] border-2 border-[#8B1D1D] text-white hover:bg-black hover:border-white px-12 py-5 text-sm font-black uppercase tracking-[0.25em] transition-all duration-300 min-w-[240px] shadow-2xl backdrop-blur-sm"
              >
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Minimalist Controls */}
      <button 
        onClick={prevSlide}
        className="hidden md:block absolute top-1/2 left-8 -translate-y-1/2 z-30 text-white hover:text-[#BFA36F] transition-colors drop-shadow-2xl"
      >
        <ChevronLeft className="w-12 h-12 font-bold" strokeWidth={2} />
      </button>
      <button 
        onClick={nextSlide}
        className="hidden md:block absolute top-1/2 right-8 -translate-y-1/2 z-30 text-white hover:text-[#BFA36F] transition-colors drop-shadow-2xl"
      >
        <ChevronRight className="w-12 h-12 font-bold" strokeWidth={2} />
      </button>

      {/* Pagination Lines */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-4">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-[3px] transition-all duration-500 shadow-md ${
              index === currentSlide ? 'w-16 bg-[#8B1D1D]' : 'w-8 bg-white/80 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;