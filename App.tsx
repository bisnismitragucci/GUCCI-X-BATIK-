
import React, { useState, useEffect } from 'react';
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
import { FileText, ArrowRight, Bell, Gift } from 'lucide-react';

type ViewState = 'home' | 'legality' | 'collection' | 'product-detail' | 'partners' | 'partner-detail' | 'impact' | 'gala' | 'register' | 'doc-sk' | 'doc-iue' | 'doc-iso';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Preloader Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 Detik intro
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (page: string) => {
      window.scrollTo(0, 0);
      setCurrentView(page as ViewState);
  };

  const navigateToHome = () => {
    window.scrollTo(0, 0);
    setCurrentView('home');
  };

  const handleProductSelect = (product: any) => {
      setSelectedProduct(product);
      window.scrollTo(0, 0);
      setCurrentView('product-detail');
  };

  const handlePartnerSelect = (partner: any) => {
      setSelectedPartner(partner);
      window.scrollTo(0, 0);
      setCurrentView('partner-detail');
  };

  const openWhatsAppRegistration = () => {
    const phoneNumber = "6282130903916";
    const message = "Hallo , saya ingin mendaftar menjadi mitra bisnis GUCCI";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const TickerContent = () => (
    <>
        <span className="mx-8 flex items-center inline-flex">
            <Bell className="w-3 h-3 text-[#BFA36F] mr-2 animate-pulse" />
            <span className="text-[#BFA36F] font-bold mr-1">INFO MITRA:</span> Agung (Solo) telah bergabung menjadi Mitra Butik
        </span>
        <span className="mx-2 text-[#BFA36F]">•</span>
        <span className="mx-8">
            <span className="text-[#BFA36F] font-bold mr-1">PENCAIRAN:</span> Komisi Rp 45.000.000 sukses ditransfer
        </span>
        <span className="mx-2 text-[#BFA36F]">•</span>
        <span className="mx-8">
            <span className="text-[#BFA36F] font-bold mr-1">LOGISTIK:</span> Kontainer #8821 (Sutra) Tiba di Milan
        </span>
        <span className="mx-2 text-[#BFA36F]">•</span>
        <span className="mx-8">
            <span className="text-[#BFA36F] font-bold mr-1">VERIFIKASI:</span> Rina (Bali) lolos sertifikasi Gucci Tier 1
        </span>
        <span className="mx-2 text-[#BFA36F]">•</span>
        <span className="mx-8">
            <span className="text-[#BFA36F] font-bold mr-1">EKSPOR:</span> Volume perdagangan naik +12% minggu ini
        </span>
        <span className="mx-2 text-[#BFA36F]">•</span>
    </>
  );

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
                <div className="animate-fadeIn">
                    <HeroCarousel onNavigate={navigateTo} />
                    
                    {/* RUNNING NOTIFICATION TICKER (SEAMLESS LOOP) */}
                    <div className="bg-black py-3 overflow-hidden border-b border-[#BFA36F] relative z-20 shadow-lg flex">
                        <div className="whitespace-nowrap animate-ticker flex-shrink-0 flex items-center text-white font-sans text-xs md:text-sm tracking-widest font-medium">
                            <TickerContent />
                        </div>
                        <div className="whitespace-nowrap animate-ticker flex-shrink-0 flex items-center text-white font-sans text-xs md:text-sm tracking-widest font-medium">
                            <TickerContent />
                        </div>
                    </div>

                    {/* Info Strip */}
                    <div className="bg-[#8B1D1D] py-8 md:py-14 border-b-4 border-[#BFA36F] relative overflow-hidden">
                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        
                        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center text-white relative z-10">
                            <div className="p-2 md:p-4 relative border-b border-[#BFA36F]/20 md:border-b-0 pb-4 md:pb-0 group hover:-translate-y-1 transition-transform duration-300">
                                <div className="text-3xl md:text-6xl font-serif italic text-[#BFA36F] mb-1 md:mb-3 font-bold drop-shadow-md">500+</div>
                                <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-white/80 group-hover:text-white transition-colors">Butik Tersertifikasi</div>
                                <div className="hidden md:block absolute right-0 top-1/4 h-1/2 w-[2px] bg-[#BFA36F]/30"></div>
                            </div>
                            <div className="p-2 md:p-4 relative border-b border-[#BFA36F]/20 md:border-b-0 pb-4 md:pb-0 group hover:-translate-y-1 transition-transform duration-300">
                                <div className="text-3xl md:text-6xl font-serif italic text-[#BFA36F] mb-1 md:mb-3 font-bold drop-shadow-md">120K</div>
                                <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-white/80 group-hover:text-white transition-colors">Yard Batik Diekspor</div>
                                <div className="hidden md:block absolute right-0 top-1/4 h-1/2 w-[2px] bg-[#BFA36F]/30"></div>
                            </div>
                            <div className="p-2 md:p-4 group hover:-translate-y-1 transition-transform duration-300">
                                <div className="text-3xl md:text-6xl font-serif italic text-[#BFA36F] mb-1 md:mb-3 font-bold drop-shadow-md">Global</div>
                                <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-white/80 group-hover:text-white transition-colors">Jangkauan Pasar</div>
                            </div>
                        </div>
                    </div>

                    <ExportPillars onNavigateToLegality={() => navigateTo('legality')} />

                    {/* Feature Section */}
                    <section className="py-12 md:py-24 bg-white border-y border-gray-100">
                        <div className="container mx-auto px-6 lg:px-12">
                            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                                <div className="w-full md:w-1/2 relative group">
                                    <div className="absolute top-4 left-4 w-full h-full border-2 border-[#8B1D1D] z-0 hidden md:block transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                                    <div className="overflow-hidden relative z-10 shadow-2xl">
                                         <img 
                                            src="https://i.pinimg.com/1200x/12/69/25/126925d65a43ce73e1871b1fb57e27ba.jpg" 
                                            alt="Interior Butik" 
                                            referrerPolicy="no-referrer"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop";
                                            }}
                                            className="w-full grayscale contrast-125 hover:grayscale-0 transition-all duration-1000 object-cover h-[300px] md:h-[550px] transform hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 text-center md:text-left">
                                    <span className="text-[#8B1D1D] text-xs font-black uppercase tracking-[0.3em] mb-4 block animate-fadeIn">
                                        Gucci x Indonesia
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-serif text-black mb-6 md:mb-8 leading-tight font-bold">
                                        THE BATIK RENAISSANCE <br/><span className="italic text-[#8B1D1D]">Luxury & Heritage</span>
                                    </h2>
                                    <p className="text-gray-900 mb-6 leading-relaxed font-medium text-sm md:text-xl text-justify md:text-left">
                                        Kolaborasi eksklusif motif Flora ikonik Gucci dengan corak batik klasik dari pengrajin di seluruh INDONESIA. Kami mengangkat warisan lokal ke panggung fashion global.
                                    </p>
                                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                        <button 
                                            onClick={() => navigateTo('partners')}
                                            className="bg-[#8B1D1D] text-white px-8 py-4 md:px-10 md:py-5 text-xs md:text-sm font-black uppercase tracking-[0.2em] hover:bg-[#5e1414] transition-colors border-2 border-[#8B1D1D] hover:border-[#8B1D1D] shadow-lg w-full md:w-auto transform hover:-translate-y-1"
                                        >
                                            JELAJAHI MITRA
                                        </button>
                                        <button 
                                            onClick={() => navigateTo('impact')}
                                            className="bg-transparent text-[#8B1D1D] px-8 py-4 md:px-10 md:py-5 text-xs md:text-sm font-black uppercase tracking-[0.2em] hover:bg-[#8B1D1D] hover:text-white transition-colors border-2 border-[#8B1D1D] w-full md:w-auto transform hover:-translate-y-1"
                                        >
                                            PELAJARI DAMPAK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <TestimonialSection onRegisterClick={() => navigateTo('register')} />

                    <NewsSection onReadMore={() => navigateTo('impact')} />

                    <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-40 animate-fadeIn">
                        <button
                            onClick={openWhatsAppRegistration}
                            className="bg-[#BFA36F] hover:bg-[#a38b55] text-[#0F2420] px-5 py-3 md:px-8 md:py-4 rounded-full font-serif font-bold text-xs md:text-sm uppercase tracking-[0.15em] shadow-[0_4px_20px_rgba(191,163,111,0.4)] border-2 border-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center group overflow-hidden relative"
                        >
                            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping"></span>
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
                            <FileText className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 group-hover:rotate-12 transition-transform" />
                            Daftar Mitra
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                </div>
              );
      }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0F2420] z-[100] flex flex-col items-center justify-center text-white">
        <div className="relative">
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-widest text-[#BFA36F] animate-pulse">GUCCI</h1>
          <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-[#BFA36F]/30 overflow-hidden">
             <div className="h-full bg-[#BFA36F] w-1/3 animate-ticker"></div>
          </div>
        </div>
        <p className="mt-6 text-[10px] uppercase tracking-[0.4em] font-bold text-white/50 animate-fadeIn">Indonesia Export Hub</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] selection:bg-[#BFA36F] selection:text-black">
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
