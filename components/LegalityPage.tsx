
import React from 'react';
import { ArrowLeft, CheckCircle, ChevronRight, Landmark, Award, MapPin } from 'lucide-react';

interface LegalityPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const LegalityPage: React.FC<LegalityPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="bg-gray-100 min-h-screen animate-fadeIn font-['Roboto'] font-medium text-gray-800">
      {/* Hero Header */}
      <div className="bg-[#0F2420] text-white pt-24 pb-12 relative overflow-hidden border-b-8 border-[#BFA36F]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#BFA36F 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
            <button onClick={onBack} className="absolute left-6 top-0 text-[#BFA36F] text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
            </button>
            
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-wide">LEGALITAS & OTORITAS RESMI</h1>
            <p className="text-sm md:text-base text-[#BFA36F] uppercase tracking-[0.25em] font-bold">Transparansi Publik & Landasan Hukum Operasional</p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12 -mt-10 relative z-20">
        {/* Main Certificate Card */}
        <div className="bg-white p-8 md:p-12 shadow-2xl border-t-4 border-[#8B1D1D] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#BFA36F]/10 rounded-bl-full"></div>
            
            {/* Header Details with Aligned Colons */}
            <div className="mb-12 border-b border-gray-200 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div className="w-full">
                         <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-4">Entitas Terdaftar</span>
                         <h2 className="text-3xl font-serif font-bold text-black mb-6">PT. GRAHA CITRA PRIMA – GUCCI</h2>
                         
                         {/* Grid for alignment */}
                         <div className="grid grid-cols-[140px_20px_1fr] md:grid-cols-[180px_20px_1fr] gap-y-3 text-sm md:text-base text-gray-700 font-medium">
                             <div>ALAMAT</div>
                             <div className="text-center">:</div>
                             <div>JL. Cikini Raya No. 89, Gedung Optik Tunggal, Kecamatan Menteng, Kota Jakarta Pusat, DKI Jakarta, 10330, Indonesia</div>

                             <div>STATUS</div>
                             <div className="text-center">:</div>
                             <div className="flex items-center text-green-700 font-bold">
                                 <CheckCircle className="w-4 h-4 mr-2" /> AKTIF & TERVERIFIKASI
                             </div>

                             <div>NIB</div>
                             <div className="text-center">:</div>
                             <div className="font-mono font-bold tracking-wider text-black">9120114281905</div>

                             <div>JENIS USAHA</div>
                             <div className="text-center">:</div>
                             <div>PERDAGANGAN BESAR TEKSTIL DAN PAKAIAN JADI</div>
                         </div>
                    </div>
                </div>
            </div>

            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Left Column: Official Decrees */}
                <div>
                    <h3 className="text-[#8B1D1D] font-bold text-sm uppercase tracking-[0.2em] mb-6 flex items-center">
                        <Landmark className="w-5 h-5 mr-2" /> Keputusan Pemerintah
                    </h3>
                    <div className="space-y-4">
                        <div onClick={() => onNavigate('doc-sk')} className="group flex items-center justify-between p-4 border border-gray-200 hover:border-[#8B1D1D] hover:bg-gray-50 cursor-pointer transition-all">
                            <div className="flex items-center">
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_the_Ministry_of_Law_and_Human_Rights_of_the_Republic_of_Indonesia.png/1200px-Flag_of_the_Ministry_of_Law_and_Human_Rights_of_the_Republic_of_Indonesia.png"
                                    alt="Kemenkumham"
                                    className="w-12 h-12 object-contain mr-4 shadow-sm rounded-sm"
                                />
                                <div>
                                    <h4 className="font-bold text-black text-sm uppercase">SK Kemenkumham</h4>
                                    <p className="text-xs text-gray-500">AHU-0058932.AH.01.01.Tahun 2025</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#8B1D1D]" />
                        </div>

                        <div onClick={() => onNavigate('doc-iue')} className="group flex items-center justify-between p-4 border border-gray-200 hover:border-[#8B1D1D] hover:bg-gray-50 cursor-pointer transition-all">
                            <div className="flex items-center">
                                <img 
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs_y2_ZAnPzgZY1YEOtij6ARLJWdo78h8vGA&s"
                                    alt="Kemendag"
                                    className="w-10 h-10 object-contain mr-4 mix-blend-multiply filter contrast-110"
                                />
                                <div>
                                    <h4 className="font-bold text-black text-sm uppercase">Izin Usaha Ekspor</h4>
                                    <p className="text-xs text-gray-500">Kementerian Perdagangan RI</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#8B1D1D]" />
                        </div>
                    </div>
                </div>

                {/* Right Column: Certifications */}
                <div>
                     <h3 className="text-[#8B1D1D] font-bold text-sm uppercase tracking-[0.2em] mb-6 flex items-center">
                        <Award className="w-5 h-5 mr-2" /> Sertifikasi Internasional
                    </h3>
                    <div className="space-y-4">
                         <div onClick={() => onNavigate('doc-iso')} className="group flex items-center justify-between p-4 border border-gray-200 hover:border-[#BFA36F] hover:bg-gray-50 cursor-pointer transition-all">
                            <div className="flex items-center">
                                <img 
                                    src="https://i0.wp.com/rhodesprojects.com/wp-content/uploads/2020/02/ISO_9001-2015.jpg?fit=1763%2C1800&ssl=1"
                                    alt="ISO 9001"
                                    className="w-12 h-12 object-contain mr-4 mix-blend-multiply filter contrast-110"
                                />
                                <div>
                                    <h4 className="font-bold text-black text-sm uppercase">ISO 9001:2015</h4>
                                    <p className="text-xs text-gray-500">Quality Management System</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#BFA36F]" />
                        </div>

                         <div onClick={() => onNavigate('partners')} className="group flex items-center justify-between p-4 border border-gray-200 hover:border-[#BFA36F] hover:bg-gray-50 cursor-pointer transition-all">
                            <div className="flex items-center">
                                <MapPin className="w-8 h-8 text-[#BFA36F] mr-4" />
                                <div>
                                    <h4 className="font-bold text-black text-sm uppercase">Gucci Artisan Tier 1</h4>
                                    <p className="text-xs text-gray-500">Akses Peta Lokasi Mitra</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold uppercase bg-[#BFA36F] text-[#0F2420] px-2 py-1">Verified</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Signature Section */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="text-xs text-gray-500 font-medium max-w-md mb-2 md:mb-0">
                    <p className="italic leading-relaxed">Dokumen ini diterbitkan secara elektronik oleh Sistem Administrasi Badan Usaha (SABU). Tanda tangan elektronik memiliki kekuatan hukum yang sah sesuai UU ITE.</p>
                </div>
                
                {/* Fixed Signature Layout */}
                <div className="flex flex-col items-center relative flex-shrink-0">
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">Disahkan Oleh</span>
                    
                    {/* Stamp Effect */}
                    <div className="absolute top-10 right-0 w-24 h-24 border-4 border-[#8B1D1D]/20 rounded-full flex items-center justify-center rotate-[-15deg] pointer-events-none z-0">
                        <div className="w-20 h-20 border border-[#8B1D1D]/30 rounded-full flex items-center justify-center">
                             <span className="text-[8px] font-black text-[#8B1D1D]/30 uppercase text-center leading-none">Menteri<br/>Hukum<br/>& HAM</span>
                        </div>
                    </div>

                    <img 
                        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkUivnct3ZzTlwcEXkmRBACsnkL2UTPXZ8dCGoNjsFMWyf8OKVhyphenhyphenaoA44X8isr8gwWtdi5os_X04gj2mSiC0U5MQC7ANfWo7fBYf-QMCbtJ0Zf0n-zcwmA8l4q4UDRjsE0nKZkVxYpby4T/w1200-h630-p-k-no-nu/hasil+scan+1+-+cara+scan+tanda+tangan.jpg" 
                        alt="Tanda Tangan Menteri" 
                        className="h-24 object-contain mix-blend-multiply filter contrast-125 z-10 relative mb-2"
                    />
                    
                    <div className="text-center z-10 relative">
                        <h5 className="font-bold text-sm text-black border-b border-black pb-1 mb-1 inline-block uppercase">YASONNA H. LAOLY</h5>
                        <p className="text-[10px] uppercase font-bold text-gray-500">Menteri Hukum dan HAM RI</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};