
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { NEWS_ITEMS } from '../constants';

interface NewsSectionProps {
    onReadMore: () => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ onReadMore }) => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Editorial Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-black tracking-[0.3em] text-[#8B1D1D] uppercase block mb-4">
            Kronik Butik
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-black mb-8 font-bold">
            Berita Pengrajin & Ekspor
          </h2>
          <div className="w-[2px] h-20 bg-[#BFA36F] mx-auto"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-10">
          {NEWS_ITEMS.map((item) => (
            <div key={item.id} className="group cursor-pointer" onClick={onReadMore}>
              <div className="relative overflow-hidden mb-8 aspect-[4/5] shadow-lg">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
                />
                <div className="absolute top-0 left-0">
                    <span className="bg-[#8B1D1D] text-white text-xs font-black uppercase px-4 py-2 tracking-widest inline-block">
                        {item.date}
                    </span>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center px-4">
                <span className="text-[#BFA36F] text-[10px] font-black uppercase tracking-[0.25em] mb-4">
                    Kolaborasi
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-black mb-5 leading-tight font-bold group-hover:text-[#8B1D1D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-800 text-base leading-relaxed mb-8 font-medium line-clamp-3">
                  {item.description}
                </p>
                
                <span className="inline-flex items-center text-xs font-black uppercase tracking-[0.25em] border-b-2 border-transparent group-hover:border-[#8B1D1D] text-black group-hover:text-[#8B1D1D] pb-1 transition-all">
                  Baca Selengkapnya <ArrowRight className="ml-2 w-4 h-4 font-bold" />
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
            <button 
                onClick={onReadMore}
                className="border-2 border-black text-black px-10 py-4 text-xs font-black uppercase tracking-[0.25em] hover:bg-[#8B1D1D] hover:border-[#8B1D1D] hover:text-white transition-colors"
            >
                Lihat Arsip Lengkap
            </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;