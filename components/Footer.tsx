
import React from 'react';
import { MapPin } from 'lucide-react';

interface FooterProps {
    onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
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
              Musim ini, kami merayakan kehangatan kerajinan Indonesia. Menghadirkan sukacita, kemewahan, dan warisan berkelanjutan ke setiap sudut dunia.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-[#BFA36F]">Korporat</h4>
            <ul className="space-y-5 text-base text-gray-300 font-medium">
              <li><button onClick={() => onNavigate('partners')} className="hover:text-white transition-colors text-left">Tinjauan Kemitraan</button></li>
              <li><button onClick={() => onNavigate('sustainability')} className="hover:text-white transition-colors text-left">Keberlanjutan</button></li>
              <li><button onClick={() => onNavigate('careers')} className="hover:text-white transition-colors text-left">Karir</button></li>
              <li><button onClick={() => onNavigate('investors')} className="hover:text-white transition-colors text-left">Hubungan Investor</button></li>
            </ul>
          </div>

           {/* Col 3 */}
           <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-[#BFA36F]">Layanan</h4>
            <ul className="space-y-5 text-base text-gray-300 font-medium">
              <li><button onClick={() => onNavigate('register')} className="hover:text-white transition-colors text-left">Registrasi Supplier</button></li>
              <li><button onClick={() => onNavigate('gift-packaging')} className="hover:text-white transition-colors text-left">Gift Packaging</button></li>
              <li><button onClick={() => onNavigate('legality')} className="hover:text-white transition-colors text-left">Sertifikasi Mutu</button></li>
              <li><button onClick={() => onNavigate('shipping')} className="hover:text-white transition-colors text-left">Pengiriman Liburan</button></li>
            </ul>
          </div>

           {/* Col 4 */}
           <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-8 text-[#BFA36F]">ALAMAT</h4>
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
            <button onClick={() => onNavigate('privacy')} className="hover:text-[#BFA36F] text-left">Kebijakan Privasi</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-[#BFA36F] text-left">Syarat Layanan</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
