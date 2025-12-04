
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants';

interface HeroCarouselProps {
    onNavigate: (page: string) => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = HERO_SLIDES;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCtaClick = (slideId: number) => {
      if (slideId === 1) onNavigate('collection');
      else if (slideId === 2) onNavigate('partners');
      else if (slideId === 3) onNavigate('impact');
      else onNavigate('register');
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000); // 8 Detik agar lebih santai
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[600px] md:h-[800px] overflow-hidden bg-black group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Image Layer with Ken Burns Effect */}
          <div className="w-full h-full relative overflow-hidden">
             <img 
                src={slide.imageUrl}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transform transition-transform duration-[12000ms] ease-out ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
                onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop";
                }}
             />
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>
          </div>

          {/* Content - Centered Bottom with Staggered Animation */}
          <div className="absolute inset-0 flex items-center md:items-end justify-center pb-0 md:pb-32 text-center px-6 md:px-6 pointer-events-none">
            <div className="max-w-6xl mx-auto text-white pointer-events-auto flex flex-col items-center justify-center h-full md:h-auto md:block pt-10 md:pt-0">
              
              {/* Animated Top Line */}
              <div className={`overflow-hidden transition-all duration-1000 delay-300 ${index === currentSlide ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <h2 className="text-[10px] md:text-sm font-black tracking-[0.3em] uppercase text-[#BFA36F] mb-4 md:mb-6 flex items-center justify-center gap-4 drop-shadow-xl">
                     <span className="w-8 md:w-16 h-[1px] bg-[#BFA36F]"></span> 
                     GUCCI & BATIK
                     <span className="w-8 md:w-16 h-[1px] bg-[#BFA36F]"></span>
                  </h2>
              </div>
              
              {/* Main Title - Slide Up */}
              <h1 className={`text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-serif font-bold italic mb-6 md:mb-8 leading-none drop-shadow-2xl text-white px-2 transition-all duration-1000 delay-500 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {slide.title}
              </h1>
              
              {/* Subtitle - Fade In */}
              <p className={`text-sm sm:text-base md:text-xl mb-10 md:mb-14 font-medium text-gray-200 tracking-wide max-w-3xl mx-auto drop-shadow-md leading-relaxed px-4 transition-all duration-1000 delay-700 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {slide.subtitle}
              </p>
              
              {/* CTA Button - Scale In */}
              <div className={`transition-all duration-1000 delay-1000 transform ${index === currentSlide ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                  <button 
                    onClick={() => handleCtaClick(slide.id)}
                    className="relative overflow-hidden bg-transparent border border-white text-white px-8 py-4 md:px-12 md:py-5 text-xs md:text-sm font-black uppercase tracking-[0.25em] transition-all duration-500 group hover:border-[#BFA36F] hover:text-[#0F2420]"
                  >
                    <span className="absolute inset-0 w-full h-full bg-[#BFA36F] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                    <span className="relative z-10">{slide.cta}</span>
                  </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Minimalist Controls */}
      <button 
        onClick={prevSlide}
        className="hidden md:flex absolute top-1/2 left-8 -translate-y-1/2 z-30 w-14 h-14 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="hidden md:flex absolute top-1/2 right-8 -translate-y-1/2 z-30 w-14 h-14 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Modern Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800 z-30">
          <div 
            className="h-full bg-[#BFA36F] transition-all duration-500 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
      </div>
    </div>
  );
};

export default HeroCarousel;
