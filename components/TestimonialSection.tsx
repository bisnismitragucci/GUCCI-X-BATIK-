
import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

interface TestimonialSectionProps {
    onRegisterClick: () => void;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-[#8B1D1D] to-black"></div>
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <span className="text-[#BFA36F] text-xs font-black uppercase tracking-[0.3em] mb-4 block">
            Suara Mitra Kami
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Dari Sanggar Lokal ke Panggung Dunia
          </h2>
          <div className="w-24 h-[2px] bg-[#8B1D1D] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="relative group">
              {/* Card Container */}
              <div className="border border-gray-800 bg-[#111111] p-8 md:p-10 h-full transition-transform duration-500 hover:-translate-y-2 hover:border-[#BFA36F]/50">
                {/* Quote Icon */}
                <div className="mb-8 text-[#8B1D1D]">
                  <Quote size={40} className="transform rotate-180" />
                </div>

                {/* Quote Text */}
                <p className="font-serif text-lg md:text-xl text-gray-200 italic leading-relaxed mb-10 min-h-[120px]">
                  "{item.quote}"
                </p>

                {/* Profile */}
                <div className="flex items-center mt-auto border-t border-gray-800 pt-6">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#BFA36F] mr-4 grayscale group-hover:grayscale-0 transition-all"
                  />
                  <div>
                    <h4 className="text-[#BFA36F] font-bold text-sm uppercase tracking-wider mb-1">
                      {item.name}
                    </h4>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                      {item.role}
                    </p>
                    <p className="text-gray-600 text-[10px] uppercase">
                      {item.location}
                    </p>
                  </div>
                </div>

                {/* Impact Badge */}
                <div className="absolute -top-4 -right-4 bg-[#8B1D1D] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 shadow-xl">
                  {item.impact}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <p className="text-gray-400 text-sm mb-6">Bergabunglah dengan 500+ UMKM yang telah mendunia.</p>
            <button 
                onClick={onRegisterClick}
                className="bg-transparent border border-[#BFA36F] text-[#BFA36F] px-10 py-4 text-xs font-black uppercase tracking-[0.25em] hover:bg-[#BFA36F] hover:text-black transition-all"
            >
                Daftar Program Kemitraan
            </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;