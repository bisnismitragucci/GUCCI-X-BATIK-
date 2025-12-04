
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, ArrowUp, Gift } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t-[6px] border-[#8B1D1D]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center mb-20">
            <h2 className="text-6xl md:text-7xl font-serif font-bold tracking-[0.05em] mb-6 text-[#8B1D1D]">GUCCI</h2>
            <span className="text-xs tracking-[0.5em] text-[#BFA36F] uppercase font-bold text-center">PT. GRAHA CITRA PRIMA – GUCCI</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-t border-gray-800 pt-16">
          {/* Col 1 */}
          <div className="col-span-1">
             <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-[#BFA36F]">Semangat Liburan</h4>
            <p className="text-gray-300 text-base leading-relaxed mb-8 font-medium">
              Musim ini, kami merayakan kehangatan kerajinan Indonesia. Menghadirkan sukacita, kemewahan, dan warisan berkelanjutan ke setiap sudut dunia untuk Natal.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#8B1D1D] transition-colors"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-[#8B1D1D] transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-[#8B1D1D] transition-colors"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-[#8B1D1D] transition-colors"><Linkedin className="w-6 h-6" /></a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-[#BFA36F]">Korporat</h4>
            <ul className="space-y-5 text-base text-gray-300 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Tinjauan Kemitraan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Laporan Keberlanjutan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Karir & Magang</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hubungan Investor</a></li>
            </ul>
          </div>

           {/* Col 3 */}
           <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-[#BFA36F]">Layanan</h4>
            <ul className="space-y-5 text-base text-gray-300 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Registrasi Pemasok</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kemasan Hadiah</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sertifikasi Kualitas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pengiriman Liburan</a></li>
            </ul>
          </div>

           {/* Col 4 */}
           <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-[#BFA36F]">Kontak</h4>
            <ul className="space-y-6 text-base text-gray-300 font-medium">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-4 text-[#BFA36F] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">JL. Cikini Raya No. 89, Gedung Optik Tunggal, Kecamatan Menteng, Kota Jakarta Pusat, DKI Jakarta, 10330, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs uppercase tracking-wider text-center md:text-left font-bold">
            &copy; 2025 PT. GRAHA CITRA PRIMA – GUCCI. Seluruh Hak Cipta Dilindungi.
          </p>
          <div className="flex space-x-10 mt-6 md:mt-0 text-xs uppercase tracking-wider text-gray-500 font-bold">
            <a href="#" className="hover:text-[#BFA36F]">Kebijakan Privasi</a>
            <a href="#" className="hover:text-[#BFA36F]">Syarat Layanan</a>
            <a href="#" className="hover:text-[#BFA36F]">Peta Situs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
