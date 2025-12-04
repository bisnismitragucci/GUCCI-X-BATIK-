
import React from 'react';
import { ShieldCheck, Globe, Gem, ArrowRight } from 'lucide-react';

interface ExportPillarsProps {
  onNavigateToLegality: () => void;
}

const ExportPillars: React.FC<ExportPillarsProps> = ({ onNavigateToLegality }) => {
  return (
    <section className="py-24 bg-[#FAF9F6]">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-6 border-b border-gray-200">
            <div className="max-w-2xl">
                <span className="text-[#8B1D1D] text-xs font-black uppercase tracking-[0.3em] mb-4 block">
                    Ruang Kurasi Digital
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-black leading-tight">
                    Ekosistem Ekspor Terintegrasi
                </h2>
            </div>
            <div className="mt-6 md:mt-0">
                <p className="text-gray-600 font-medium text-sm md:text-right max-w-md ml-auto">
                    Kami memfasilitasi setiap langkah perjalanan produk Anda. Dari meja pengrajin, legalitas dokumen, hingga etalase butik global.
                </p>
            </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Legalitas - CLICKABLE */}
            <div 
                onClick={onNavigateToLegality}
                className="bg-white p-10 border-l-4 border-[#8B1D1D] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer relative"
            >
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-[#8B1D1D]" />
                </div>

                <div className="w-14 h-14 bg-[#8B1D1D]/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-[#8B1D1D] transition-colors">
                    <ShieldCheck className="w-8 h-8 text-[#8B1D1D] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-black mb-4 group-hover:text-[#8B1D1D] transition-colors">
                    Legalitas & Sertifikasi
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                    Bantuan penuh pengurusan izin ekspor, sertifikasi indikasi geografis (IG), dan label "Gucci Approved Artisan".
                </p>
                <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#BFA36F] mr-2"></span> Izin Ekspor Prioritas</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#BFA36F] mr-2"></span> Perlindungan Hak Cipta</li>
                </ul>
                <span className="text-[#8B1D1D] text-xs font-black uppercase tracking-widest border-b border-[#8B1D1D] pb-1">
                    Lihat Persyaratan Lengkap
                </span>
            </div>

            {/* Pillar 2: Pasar Global */}
            <div className="bg-white p-10 border-l-4 border-black shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-14 h-14 bg-black/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-black transition-colors">
                    <Globe className="w-8 h-8 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-black mb-4 group-hover:text-[#BFA36F] transition-colors">
                    Akses Pasar Global
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                    Jalur distribusi langsung ke jaringan butik Gucci di 40 negara. Produk Anda dipamerkan sebagai mahakarya seni.
                </p>
                <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#BFA36F] mr-2"></span> Logistik Terintegrasi</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#BFA36F] mr-2"></span> Pameran Milan & Paris</li>
                </ul>
            </div>

            {/* Pillar 3: Budaya & Kerajinan */}
            <div className="bg-white p-10 border-l-4 border-[#BFA36F] shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-14 h-14 bg-[#BFA36F]/20 rounded-full flex items-center justify-center mb-8 group-hover:bg-[#BFA36F] transition-colors">
                    <Gem className="w-8 h-8 text-[#988053] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-black mb-4 group-hover:text-[#988053] transition-colors">
                    Kurasi Seni & Budaya
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                    Kolaborasi desain yang menghormati filosofi tradisional. Narasi budaya setiap motif batik tersampaikan kepada dunia.
                </p>
                <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#BFA36F] mr-2"></span> Workshop Desain</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#BFA36F] mr-2"></span> Pelestarian Motif Langka</li>
                </ul>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ExportPillars;
