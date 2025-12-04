
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ExportPillars from './components/ExportPillars';
import TestimonialSection from './components/TestimonialSection';
import { LegalityPage } from './components/LegalityPage';
import { 
    CollectionPage, 
    PartnersPage, 
    ImpactPage, 
    GalaPage, 
    RegisterPage,
    SKKemenkumhamPage,
    IzinEksporPage,
    ISOPage,
    ProductDetailPage,
    PartnerDetailPage
} from './components/ContentPages';
import { FileText, ArrowRight } from 'lucide-react';

type ViewState = 'home' | 'legality' | 'collection' | 'product-detail' | 'partners' | 'partner-detail' | 'impact' | 'gala' | 'register' | 'doc-sk' | 'doc-iue' | 'doc-iso';

const App: React.FC = () => {
  // State untuk mengatur halaman mana yang tampil
  const [currentView, setCurrentView] = useState<ViewState>('home');
  
  // State untuk menyimpan item yang dipilih
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  // Fungsi navigasi utama
  const navigateTo = (page: string) => {
      window.scrollTo(0, 0);
      setCurrentView(page as ViewState);
  };

  const navigateToHome = () => {
    window.scrollTo(0, 0);
    setCurrentView('home');
  };

  // Handler untuk memilih produk
  const handleProductSelect = (product: any) => {
      setSelectedProduct(product);
      window.scrollTo(0, 0);
      setCurrentView('product-detail');
  };

  // Handler untuk memilih partner
  const handlePartnerSelect = (partner: any) => {
      setSelectedPartner(partner);
      window.scrollTo(0, 0);
      setCurrentView('partner-detail');
  };

  // Fungsi WhatsApp Sentral
  const openWhatsAppRegistration = () => {
    const phoneNumber = "6282130903916";
    const message = "Hallo , saya ingin mendaftar menjadi mitra bisnis GUCCI";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const renderContent = () => {
      switch (currentView) {
          case 'legality':
              return <LegalityPage onBack={navigateToHome} onNavigate={navigateTo} />;
          case 'doc-sk':
              return <SKKemenkumhamPage onBack={() => navigateTo('legality')} />;
          case 'doc-iue':
              return <IzinEksporPage onBack={() => navigateTo('legality')} />;
          case 'doc-iso':
              return <ISOPage onBack={() => navigateTo('legality')} />;
          
          case 'collection':
              return <CollectionPage onBack={navigateToHome} onProductSelect={handleProductSelect} />;
          case 'product-detail':
              return <ProductDetailPage product={selectedProduct} onBack={() => navigateTo('collection')} />;
          
          case 'partners':
              return <PartnersPage onBack={navigateToHome} onPartnerSelect={handlePartnerSelect} />;
          case 'partner-detail':
              return <PartnerDetailPage partner={selectedPartner} onBack={() => navigateTo('partners')} />;
              
          case 'impact':
              return <ImpactPage onBack={navigateToHome} />;
          case 'gala':
              return <GalaPage onBack={navigateToHome} />;
          case 'register':
              return <RegisterPage onBack={navigateToHome} />;
          case 'home':
          default:
              return (
                <>
                    <HeroCarousel onNavigate={navigateTo} />
                    
                    {/* Info Strip - Gucci Holiday Red */}
                    <div className="bg-[#8B1D1D] py-14 border-b-4 border-[#BFA36F]">
                        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
                            <div className="p-4 relative">
                                <div className="text-5xl md:text-6xl font-serif italic text-[#BFA36F] mb-3 font-bold">500+</div>
                                <div className="text-xs uppercase tracking-[0.25em] font-bold">Butik Tersertifikasi</div>
                                <div className="hidden md:block absolute right-0 top-1/4 h-1/2 w-[2px] bg-[#BFA36F]/30"></div>
                            </div>
                            <div className="p-4 relative">
                                <div className="text-5xl md:text-6xl font-serif italic text-[#BFA36F] mb-3 font-bold">120K</div>
                                <div className="text-xs uppercase tracking-[0.25em] font-bold">Yard Batik Diekspor</div>
                                <div className="hidden md:block absolute right-0 top-1/4 h-1/2 w-[2px] bg-[#BFA36F]/30"></div>
                            </div>
                            <div className="p-4">
                                <div className="text-5xl md:text-6xl font-serif italic text-[#BFA36F] mb-3 font-bold">Global</div>
                                <div className="text-xs uppercase tracking-[0.25em] font-bold">Jangkauan Pasar</div>
                            </div>
                        </div>
                    </div>

                    {/* New Section: Ruang Kurasi Digital (Legalitas, Pasar, Budaya) */}
                    <ExportPillars onNavigateToLegality={() => navigateTo('legality')} />

                    {/* Feature Section - Batik & Boutique Focus */}
                    <section className="py-24 bg-white border-y border-gray-100">
                        <div className="container mx-auto px-6 lg:px-12">
                            <div className="flex flex-col md:flex-row items-center gap-16">
                                <div className="w-full md:w-1/2 relative">
                                    <div className="absolute top-4 left-4 w-full h-full border-2 border-[#8B1D1D] z-0"></div>
                                    {/* Image: Pinterest image requested by user */}
                                    <img 
                                        src="https://i.pinimg.com/1200x/12/69/25/126925d65a43ce73e1871b1fb57e27ba.jpg" 
                                        alt="Interior Butik Mitra Gucci" 
                                        referrerPolicy="no-referrer"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop";
                                        }}
                                        className="relative z-10 w-full grayscale contrast-125 hover:grayscale-0 transition-all duration-700 shadow-2xl object-cover h-[550px]"
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <span className="text-[#8B1D1D] text-xs font-black uppercase tracking-[0.3em] mb-4 block">
                                        Kemitraan Budaya
                                    </span>
                                    <h2 className="text-5xl font-serif text-black mb-8 leading-tight font-bold">
                                        Mengangkat Batik <br/><span className="italic text-[#8B1D1D]">ke Fashion Mewah</span>
                                    </h2>
                                    <p className="text-gray-900 mb-6 leading-relaxed font-medium text-lg md:text-xl">
                                        Melalui program <strong>"Gucci x Batik Boutique"</strong>, kami mengkurasi butik-butik terbaik di Solo, Pekalongan, dan Yogyakarta untuk berkolaborasi langsung dengan desainer Italia. 
                                    </p>
                                    <p className="text-gray-900 mb-10 leading-relaxed font-medium text-lg md:text-xl">
                                        Tujuannya bukan hanya ekspor kain, tetapi membangun branding internasional bahwa Batik dan Kebaya adalah simbol kemewahan yang setara dengan sutra Eropa. Setiap helai kain membawa cerita, tradisi, dan standar kualitas dunia.
                                    </p>
                                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                        <button 
                                            onClick={() => navigateTo('partners')}
                                            className="bg-[#8B1D1D] text-white px-10 py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-[#5e1414] transition-colors border-2 border-[#8B1D1D] hover:border-[#8B1D1D] shadow-lg"
                                        >
                                            Temui Para Pengrajin
                                        </button>
                                        <button 
                                            onClick={() => navigateTo('impact')}
                                            className="bg-transparent text-[#8B1D1D] px-10 py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-[#8B1D1D] hover:text-white transition-colors border-2 border-[#8B1D1D]"
                                        >
                                            Laporan Ekspor
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* New Section: Testimoni Mitra */}
                    <TestimonialSection onRegisterClick={() => navigateTo('register')} />

                    <NewsSection onReadMore={() => navigateTo('impact')} />

                    {/* FLOATING ACTION BUTTON - REGISTER NOW */}
                    <div className="fixed bottom-8 left-8 z-40 animate-fadeIn">
                        <button
                            onClick={openWhatsAppRegistration}
                            className="bg-[#BFA36F] hover:bg-[#a38b55] text-[#0F2420] px-8 py-4 rounded-full font-serif font-bold text-sm uppercase tracking-[0.15em] shadow-[0_4px_20px_rgba(191,163,111,0.4)] border-2 border-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center group"
                        >
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping"></span>
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
                            <FileText className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                            Daftar Sekarang
                            <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                </>
              );
      }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar onNavigate={navigateTo} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;