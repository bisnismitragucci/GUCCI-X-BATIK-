
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag, MapPin, Activity, User, Truck, Globe, List, Map as MapIcon, ChevronRight, CheckCircle, Info, Feather, Ruler, Clock, Award, ShieldCheck } from 'lucide-react';

interface PageProps {
    onBack: () => void;
}

interface CollectionPageProps extends PageProps {
    onProductSelect?: (product: any) => void;
}

interface PartnersPageProps extends PageProps {
    onPartnerSelect?: (partner: any) => void;
}

interface PartnerDetailPageProps extends PageProps {
    partner: any;
}

const openWhatsAppRegistration = () => {
    const phoneNumber = "6282130903916";
    const message = "Hallo , saya ingin mendaftar menjadi mitra bisnis GUCCI";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};

// ----------------------------------------------------------------------
// 1. COLLECTION PAGE
// ----------------------------------------------------------------------
export const CollectionPage: React.FC<CollectionPageProps> = ({ onBack, onProductSelect }) => {
    const collectionItems = [
        {
            url: "https://i.pinimg.com/736x/87/10/b9/8710b974ba8778bfa36a85f737993d2e.jpg",
            title: "The Cloud Garden Blazer",
            material: "Sutra Organik & Pewarna Indigo Alami",
            description: "Harmonisasi motif Mega Mendung Cirebon yang melambangkan kesejukan, berpadu dengan rambatan bunga Gucci Flora.",
            philosophy: "Awan Mega Mendung melambangkan pembawa hujan sebagai sumber kehidupan.",
            process: "Batik Tulis 7 Lapis",
            time: "3 Bulan",
            origin: "Cirebon, Jawa Barat"
        },
        {
            url: "https://i.pinimg.com/736x/78/41/18/7841188562b57ef75bde432e44675d29.jpg",
            title: "Noir Kebaya Tailored Jacket",
            material: "Italian Wool & Laser-Cut Cotton",
            description: "Interpretasi kontemporer dari Kebaya Kutubaru. Wol hitam pekat dengan detail 'laser-cut' bermotif Kawung.",
            philosophy: "Motif Kawung terinspirasi dari buah aren yang dibelah, melambangkan kesucian hati.",
            process: "Laser-cut & Hand Stitching",
            time: "4 Minggu",
            origin: "Florence x Yogyakarta"
        },
        {
            url: "https://i.pinimg.com/736x/26/a3/9a/26a39a4a63579719a1507fcd2f244611.jpg",
            title: "Monochrome Tenun Kimono",
            material: "Tenun Ikat Troso Handwoven",
            description: "Outer oversized dengan inspirasi Tenun Ikat. Benang katun monokromatik ditenun manual dengan teknik ikat ganda.",
            philosophy: "Tenun ikat melambangkan ikatan persaudaraan yang kuat.",
            process: "Tenun ATBM",
            time: "6 Minggu",
            origin: "Jepara, Jawa Tengah"
        }
    ];

    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-28 md:pt-32 pb-12 animate-fadeIn">
            <div className="container mx-auto px-4 md:px-6 lg:px-12">
                <button onClick={onBack} className="text-[#8B1D1D] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-8 flex items-center hover:underline sticky top-24 md:static bg-[#FAF9F6] py-2 z-10 w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
                </button>
                
                <div className="mb-8 md:mb-16 border-b border-gray-200 pb-8">
                    <span className="text-[#BFA36F] font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3 md:mb-4 block">Kapsul Eksklusif 2025</span>
                    <h1 className="text-3xl md:text-6xl font-serif font-bold text-black mb-4 md:mb-6">The Batik Renaissance</h1>
                    <p className="text-sm md:text-xl text-gray-600 max-w-3xl leading-relaxed">
                        Koleksi kapsul eksklusif yang memadukan motif Flora ikonik Gucci dengan warisan wastra nusantara. Sebuah dialog visual antara Florence dan Jawa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-12">
                    {collectionItems.map((item, index) => (
                        <div 
                            key={index} 
                            onClick={() => onProductSelect && onProductSelect(item)}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <div className="relative overflow-hidden aspect-[3/4] mb-4 md:mb-6 bg-gray-200 shadow-lg">
                                 <img 
                                    src={item.url} 
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-0 left-0 w-full bg-[#8B1D1D] text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out hidden md:block">
                                    <span className="uppercase text-[10px] font-bold tracking-[0.2em] flex items-center justify-between">
                                        Lihat Detail <ChevronRight className="w-4 h-4"/>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <span className="text-[#BFA36F] text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2 line-clamp-1">
                                    {item.material}
                                </span>
                                <h3 className="font-serif font-bold text-lg md:text-2xl text-black mb-2 md:mb-3 group-hover:text-[#8B1D1D] transition-colors leading-tight">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const ProductDetailPage: React.FC<{ product: any; onBack: () => void }> = ({ onBack, product }) => {
    if (!product) return null;

    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-28 md:pt-28 pb-20 animate-fadeIn font-sans">
             <div className="container mx-auto px-4 md:px-12">
                <nav className="flex items-center text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-12 text-gray-500 overflow-x-auto whitespace-nowrap py-2">
                    <button onClick={onBack} className="hover:text-[#8B1D1D] transition-colors flex items-center shrink-0">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Koleksi
                    </button>
                    <span className="mx-2 md:mx-4">/</span>
                    <span className="text-[#8B1D1D]">{product.title}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-start">
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-32 self-start">
                        <div className="relative aspect-[3/4] overflow-hidden shadow-2xl rounded-sm group">
                             <img src={product.url} alt={product.title} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="border-b border-[#BFA36F] pb-6 md:pb-8 mb-6 md:mb-8">
                            <span className="text-[#BFA36F] text-[10px] md:text-xs font-black uppercase tracking-[0.25em] mb-3 md:mb-4 block flex items-center">
                                <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2" /> {product.origin}
                            </span>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-black mb-3 md:mb-4 leading-tight">
                                {product.title}
                            </h1>
                            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">{product.material}</p>
                        </div>
                        <div className="mb-8 md:mb-10">
                            <h3 className="text-[#8B1D1D] font-bold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4 flex items-center">
                                <Info className="w-4 h-4 mr-2" /> Narasi Produk
                            </h3>
                            <p className="text-gray-800 leading-7 md:leading-8 text-sm md:text-lg font-medium font-serif text-left md:text-justify">{product.description}</p>
                        </div>
                        <div className="bg-white p-5 md:p-8 border-l-4 border-[#BFA36F] shadow-sm mb-8 md:mb-10 relative rounded-r-lg">
                             <Feather className="w-5 h-5 md:w-6 md:h-6 text-[#BFA36F]/20 absolute top-4 right-4" />
                            <h3 className="text-[#988053] font-bold text-[10px] md:text-xs uppercase tracking-wider mb-3 md:mb-4">Filosofi</h3>
                            <p className="text-gray-600 leading-relaxed italic text-sm md:text-lg">"{product.philosophy}"</p>
                        </div>

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-y-6 md:gap-y-8 gap-x-4 border-t border-gray-200 pt-8 mb-8 md:mb-12">
                             <div><h4 className="text-gray-400 font-bold text-[9px] uppercase tracking-widest mb-1"><Ruler className="w-3 h-3 inline mr-1" /> Teknik</h4><p className="font-bold text-black text-xs">{product.process}</p></div>
                             <div><h4 className="text-gray-400 font-bold text-[9px] uppercase tracking-widest mb-1"><Clock className="w-3 h-3 inline mr-1" /> Durasi</h4><p className="font-bold text-black text-xs">{product.time}</p></div>
                             <div><h4 className="text-gray-400 font-bold text-[9px] uppercase tracking-widest mb-1"><ShoppingBag className="w-3 h-3 inline mr-1" /> Status</h4><p className="font-bold text-[#8B1D1D] text-xs">Pre-Order</p></div>
                             <div><h4 className="text-gray-400 font-bold text-[9px] uppercase tracking-widest mb-1"><Award className="w-3 h-3 inline mr-1" /> Sertifikasi</h4><p className="font-bold text-black text-xs flex items-center"><ShieldCheck className="w-3 h-3 mr-1 text-green-600" /> Tier 1</p></div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// 2. IMPACT PAGE
// ----------------------------------------------------------------------

export const ImpactPage: React.FC<PageProps> = ({ onBack }) => {
    // MOCK DATA
    const ALL_COUNTRIES = [
        { code: "IT", name: "ITALIA (Milan)", flagUrl: "https://flagcdn.com/w80/it.png", share: "45.2%", income: "Rp 213.180.000.000", change: "+12.4%" },
        { code: "FR", name: "PERANCIS (Paris)", flagUrl: "https://flagcdn.com/w80/fr.png", share: "28.5%", income: "Rp 139.570.000.000", change: "+8.1%" },
        { code: "US", name: "USA (New York)", flagUrl: "https://flagcdn.com/w80/us.png", share: "15.1%", income: "Rp 70.550.000.000", change: "+5.3%" },
        { code: "JP", name: "JEPANG (Tokyo)", flagUrl: "https://flagcdn.com/w80/jp.png", share: "12.0%", income: "Rp 59.500.000.000", change: "+2.1%" },
    ];

    const ARTISAN_LOGS = [
        { id: "WS-SOLO-01", name: "Keraton Royal Atelier", task: "Batik Tulis Halus", progress: 85, status: "Finishing" },
        { id: "WS-PKL-04", name: "Pesisir Vibrant Studio", task: "Pewarnaan Indigo", progress: 40, status: "Proses" },
    ];

    const SHIPMENTS = [
        { awb: "8821-EX-IT", dest: "Milan, IT", items: "250 yds Sutra", status: "OK", time: "10:42 AM" },
        { awb: "8824-EX-FR", dest: "Paris, FR", items: "120 yds Beludru", status: "Transit", time: "09:15 AM" },
    ];

    const [startIndex, setStartIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setStartIndex((prev) => (prev + 1) % ALL_COUNTRIES.length);
        }, 3000); 
        return () => clearInterval(interval);
    }, []);

    const visibleCountries = [];
    for (let i = 0; i < 4; i++) {
        visibleCountries.push(ALL_COUNTRIES[(startIndex + i) % ALL_COUNTRIES.length]);
    }

    const ImpactTickerContent = () => (
        <>
            <span className="mr-8">USD/IDR: 15.450 (+0.2%)  •  EUR/IDR: 16.820 (+0.1%)  •  BERJANGKA KATUN: $82.40  •  VOL EKSPOR: 128K YDS (YTD)  • </span>
        </>
    );

    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-28 md:pt-32 pb-12 animate-fadeIn font-sans">
             <div className="fixed top-[88px] md:top-24 left-0 w-full bg-black text-[#BFA36F] z-30 overflow-hidden py-2 border-b border-[#8B1D1D] hidden md:flex">
                 <div className="whitespace-nowrap animate-ticker flex-shrink-0 flex items-center font-mono text-xs font-bold tracking-widest">
                     <ImpactTickerContent />
                 </div>
                 <div className="whitespace-nowrap animate-ticker flex-shrink-0 flex items-center font-mono text-xs font-bold tracking-widest">
                     <ImpactTickerContent />
                 </div>
             </div>

             <div className="container mx-auto px-4 md:px-12 mt-8 md:mt-12">
                 <button onClick={onBack} className="text-[#8B1D1D] font-bold uppercase tracking-widest text-xs mb-8 flex items-center hover:underline sticky top-24 md:static bg-[#FAF9F6] py-2 z-10 w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
                </button>

                <div className="mb-12">
                     <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-4">Laporan Dampak Ekspor</h1>
                     <p className="text-sm md:text-lg text-gray-600 max-w-3xl">Dashboard real-time logistik, performa artisan, dan nilai pasar global.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    {/* LEFT COL: GLOBAL MARKET */}
                    <div className="lg:col-span-2 bg-[#0A0A0A] rounded-2xl p-6 md:p-8 border border-gray-800 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20"><Globe className="w-24 h-24 text-[#BFA36F]" /></div>
                        <h3 className="text-[#BFA36F] font-mono text-xs font-bold uppercase tracking-widest mb-6 flex items-center">
                            <Activity className="w-4 h-4 mr-2 animate-pulse" /> LIVE MARKET DATA
                        </h3>

                        <div className="space-y-4">
                            {visibleCountries.map((c, i) => (
                                <div key={i} className="flex justify-between items-center md:grid md:grid-cols-12 bg-[#151515] p-3 rounded border-l-2 border-[#BFA36F] hover:bg-[#222] transition-colors">
                                    <div className="flex items-center md:contents">
                                        <div className="font-mono text-xs text-gray-400 w-10 md:w-auto md:col-span-2">{c.code}</div>
                                        <div className="font-bold text-sm flex items-center md:col-span-4"><img src={c.flagUrl} className="w-4 h-3 mr-2 rounded-sm" alt="flag" /> <span className="truncate">{c.name.split('(')[0]}</span></div>
                                    </div>
                                    <div className="flex flex-col items-end md:contents">
                                        <div className="md:col-span-3 text-right font-mono text-[#BFA36F] text-[10px] md:text-xs whitespace-nowrap">{c.income}</div>
                                        <div className="md:col-span-3 text-right font-bold text-[10px] md:text-xs text-green-500 whitespace-nowrap">{c.change}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-8 pt-6 border-t border-gray-800">
                            <div className="flex flex-col justify-center">
                                <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wider mb-1">TOTAL EKSPOR</span>
                                <div className="text-sm md:text-xl font-bold text-white whitespace-nowrap">Rp 768 Miliar</div>
                            </div>
                            <div className="flex flex-col justify-center border-l border-gray-800 pl-2 md:pl-4">
                                <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wider mb-1">ACTIVE ROUTES</span>
                                <div className="text-sm md:text-xl font-bold text-white whitespace-nowrap">14 Negara</div>
                            </div>
                             <div className="flex flex-col justify-center border-l border-gray-800 pl-2 md:pl-4">
                                <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wider mb-1">ARTISAN PAID</span>
                                <div className="text-sm md:text-xl font-bold text-[#BFA36F] whitespace-nowrap">100%</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COL: LOGISTICS */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg">
                        <h3 className="text-[#8B1D1D] font-bold text-xs uppercase tracking-widest mb-6 flex items-center">
                            <Truck className="w-4 h-4 mr-2" /> MANIFEST PENGIRIMAN
                        </h3>
                        <div className="space-y-6 relative">
                            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-100"></div>
                            {SHIPMENTS.map((s, i) => (
                                <div key={i} className="relative pl-8">
                                    <div className="absolute left-0 top-1 w-4 h-4 bg-white border-2 border-[#8B1D1D] rounded-full z-10"></div>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-mono text-xs font-bold text-gray-400">{s.awb}</span>
                                        <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600">{s.time}</span>
                                    </div>
                                    <h4 className="font-bold text-sm text-black">{s.dest}</h4>
                                    <p className="text-xs text-gray-500 mb-1">{s.items}</p>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${s.status.includes('OK') ? 'text-green-600' : 'text-blue-600'}`}>
                                        ● {s.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-2xl font-serif font-bold text-black mb-6 flex items-center">
                         <User className="w-6 h-6 mr-3 text-[#8B1D1D]" /> PERFORMA & CATATAN PENGRAJIN
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {ARTISAN_LOGS.map((log, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="font-mono text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500">{log.id}</span>
                                    <div className={`w-2 h-2 rounded-full ${log.progress > 80 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                </div>
                                <h4 className="font-serif font-bold text-lg mb-1 line-clamp-1">{log.name}</h4>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">{log.task}</p>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                                    <div className="bg-[#8B1D1D] h-1.5 rounded-full" style={{ width: `${log.progress}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const PartnersPage: React.FC<PartnersPageProps> = ({ onBack, onPartnerSelect }) => {
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [currentMapUrl, setCurrentMapUrl] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3265057.863158025!2d109.43572886470397!3d-7.39803529341492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65561a06734d6f%3A0x3f5c9d2f66453990!2sJava!5e0!3m2!1sen!2sid!4v1709228000000!5m2!1sen!2sid");

    const partners = [
        { id: 1, loc: "Yogyakarta", name: "Keraton Royal Atelier", spec: "Batik Tulis Klasik", desc: "Spesialis motif larangan keraton dengan teknik canting 0.5mm.", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126492.36531388656!2d110.36443425!3d-7.801368199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6bc5%3A0x21723fd4d3684f71!2sYogyakarta!5e0!3m2!1sen!2sid!4v1709228000001", img: "https://i.pinimg.com/736x/db/6a/c8/db6ac8bf7bed3718fd0833cbedd8250d.jpg" },
        { id: 2, loc: "Pekalongan", name: "Pesisir Vibrant Studio", spec: "Batik Warna Alam", desc: "Pewarnaan indigo alami dengan motif buketan pengaruh Eropa-Cina.", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126727.56708785718!2d109.6105809!3d-6.8946761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e702454058d7287%3A0x4027a76e352e4e0!2sPekalongan!5e0!3m2!1sen!2sid!4v1709228000002", img: "https://i.pinimg.com/736x/40/90/32/409032882a7247f4e5025c5fdf6517db.jpg" },
        { id: 3, loc: "Solo", name: "Sogan Imperial House", spec: "Batik Sogan Klasik", desc: "Pelestari pakem batik keraton Surakarta dengan pewarnaan soga alam fermentasi 6 bulan.", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126569.25920786963!2d110.74317664999999!3d-7.5592083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16627ad11ab1%3A0x3027a76e352bb40!2sSurakarta%2C%20Surakarta%20City%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1709228000003", img: "https://i.pinimg.com/736x/79/d3/61/79d361f296f89d189a5c75aab70a4563.jpg" },
        { id: 4, loc: "Bali", name: "Ubud Sacred Threads", spec: "Tenun Endek & Songket", desc: "Pengrajin tekstil upacara adat dengan benang emas dan sutra alam untuk koleksi Resort.", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126214.36398901846!2d115.20452335!3d-8.5068538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d739f22c9c3%3A0x54a38afd6b5774c9!2sUbud%2C%20Gianyar%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1709228000004", img: "https://i.pinimg.com/1200x/48/c3/4b/48c34bdc7073d1d1ffb23ee110d5c799.jpg" }
    ];

    return (
        <div className="bg-white min-h-screen pt-28 md:pt-32 pb-12 animate-fadeIn">
            <div className="container mx-auto px-4 md:px-6 lg:px-12">
                <button onClick={onBack} className="text-[#8B1D1D] font-bold uppercase tracking-widest text-xs mb-6 md:mb-8 flex items-center hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
                </button>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-gray-100 pb-8">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center space-x-3 mb-2">
                             <span className="text-[#BFA36F] uppercase tracking-[0.2em] font-bold text-xs block">Kurasi Lokal</span>
                             <span className="bg-[#BFA36F] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm">Gucci Artisan Tier 1</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-4">Jaringan Mitra Artisan</h1>
                    </div>
                    
                    <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto">
                        <button onClick={() => setViewMode('list')} className={`flex-1 md:flex-none px-4 py-3 uppercase text-xs font-bold tracking-widest rounded-md ${viewMode === 'list' ? 'bg-white text-[#8B1D1D] shadow-md' : 'text-gray-400'}`}>
                            <List className="w-4 h-4 mr-2 inline" /> Daftar
                        </button>
                        <button onClick={() => setViewMode('map')} className={`flex-1 md:flex-none px-4 py-3 uppercase text-xs font-bold tracking-widest rounded-md ${viewMode === 'map' ? 'bg-[#0F2420] text-[#BFA36F] shadow-md' : 'text-gray-400'}`}>
                            <MapIcon className="w-4 h-4 mr-2 inline" /> Peta
                        </button>
                    </div>
                </div>

                {viewMode === 'list' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 md:gap-y-12 animate-fadeIn">
                        {partners.map((partner) => (
                            <div key={partner.id} onClick={() => onPartnerSelect && onPartnerSelect(partner)} className="group border border-gray-100 pb-6 cursor-pointer hover:bg-gray-50 p-4 rounded-xl">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-[#8B1D1D] font-bold text-[10px] md:text-xs uppercase tracking-widest mb-1 block">{partner.loc}</span>
                                        <h3 className="text-xl md:text-2xl font-serif font-bold mb-2 text-black group-hover:text-[#BFA36F]">{partner.name}</h3>
                                        <p className="text-gray-500 text-xs md:text-sm line-clamp-2">{partner.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {viewMode === 'map' && (
                    <div className="flex flex-col lg:flex-row gap-6 h-[500px] md:h-[600px] animate-fadeIn">
                         <div className="lg:w-1/3 bg-[#FAF9F6] p-4 rounded-2xl border border-gray-200 overflow-y-auto">
                            <h3 className="font-serif font-bold text-lg mb-4 flex items-center"><MapPin className="w-5 h-5 mr-2 text-[#8B1D1D]" /> Lokasi Artisan</h3>
                            <div className="space-y-3">
                                {partners.map((partner) => (
                                    <button key={partner.id} onClick={() => setCurrentMapUrl(partner.mapUrl)} className="w-full text-left p-4 bg-white hover:bg-[#8B1D1D] hover:text-white transition-all rounded-lg shadow-sm border border-gray-100">
                                        <span className="font-serif font-bold text-sm">{partner.name}</span>
                                    </button>
                                ))}
                            </div>
                         </div>
                         <div className="flex-1 bg-gray-200 rounded-2xl overflow-hidden shadow-inner relative">
                            <iframe src={currentMapUrl} width="100%" height="100%" style={{border:0}} loading="lazy"></iframe>
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const PartnerDetailPage: React.FC<PartnerDetailPageProps> = ({ onBack, partner }) => {
    if (!partner) return null;
    return (
         <div className="bg-white min-h-screen pt-28 md:pt-32 pb-12 animate-fadeIn">
            <div className="container mx-auto px-4 md:px-12">
                <button onClick={onBack} className="text-[#8B1D1D] font-bold uppercase tracking-widest text-xs mb-8 flex items-center hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
                </button>
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="w-full md:w-1/2">
                        <img src={partner.img} alt={partner.name} className="w-full rounded-lg shadow-2xl mb-8 object-cover aspect-video" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{partner.name}</h1>
                        <p className="text-gray-600 mb-6 leading-relaxed text-justify">{partner.desc}</p>
                    </div>
                </div>
            </div>
         </div>
    );
};

export const GalaPage: React.FC<PageProps> = ({ onBack }) => {
    return (
        <div className="bg-black min-h-screen text-white relative">
            <button onClick={onBack} className="absolute top-6 left-6 z-50 text-white font-bold uppercase tracking-widest text-xs flex items-center hover:text-[#BFA36F] transition-colors bg-black/50 p-2 rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
            </button>
            <div className="h-screen w-full relative">
                 <img src="https://i.pinimg.com/1200x/ff/bb/64/ffbb64e0b998a23f6396a6a4c8cf97b2.jpg" alt="Gucci Gala" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-24 text-center">
                    <span className="text-[#BFA36F] uppercase tracking-[0.5em] font-bold text-[10px] md:text-xs mb-4 md:mb-6 block animate-fadeIn">Exclusive Invitation</span>
                    <h1 className="text-4xl md:text-8xl font-serif font-bold italic mb-6 animate-fadeIn delay-100 leading-tight">The Equinox Gala</h1>
                    <button className="border border-[#BFA36F] text-[#BFA36F] px-8 py-3 md:px-12 md:py-4 text-xs font-black uppercase tracking-[0.25em] hover:bg-[#BFA36F] hover:text-black transition-all animate-fadeIn delay-300 w-full md:w-auto">RSVP</button>
                </div>
            </div>
        </div>
    );
};

export const RegisterPage: React.FC<PageProps> = ({ onBack }) => {
    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-24 md:pt-32 pb-12 animate-fadeIn flex items-center justify-center">
            <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
                 <button onClick={onBack} className="text-[#8B1D1D] font-bold uppercase tracking-widest text-xs mb-8 flex items-center hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
                </button>
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 bg-[#0F2420] text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 relative z-10">Daftar Mitra</h2>
                    </div>
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <button onClick={openWhatsAppRegistration} className="w-full bg-[#8B1D1D] text-white py-4 mt-4 text-sm font-black uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-lg">Lanjut ke WhatsApp</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SKKemenkumhamPage: React.FC<PageProps> = ({ onBack }) => <div className="pt-32 px-10"><button onClick={onBack} className="mb-4">Kembali</button><h1>Dokumen SK</h1></div>;
export const IzinEksporPage: React.FC<PageProps> = ({ onBack }) => <div className="pt-32 px-10"><button onClick={onBack} className="mb-4">Kembali</button><h1>Dokumen Izin</h1></div>;
export const ISOPage: React.FC<PageProps> = ({ onBack }) => <div className="pt-32 px-10"><button onClick={onBack} className="mb-4">Kembali</button><h1>Dokumen ISO</h1></div>;
