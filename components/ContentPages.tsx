
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, ShoppingBag, MapPin, Activity, User, Truck, Globe, List, Map as MapIcon, ChevronRight, CheckCircle, Info, Feather, Ruler, Clock, Award, ShieldCheck, Plane, Package, Anchor, Printer, Share2, Download, FileText, Calendar, Zap, ArrowRight as ArrowRightIcon, TrendingUp, TrendingDown } from 'lucide-react';

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
// 3. IMPACT PAGE (ENHANCED REAL-TIME & SCALED DOWN VALUES)
// ----------------------------------------------------------------------

export const ImpactPage: React.FC<PageProps> = ({ onBack }) => {
    // 1. Initial Data for Countries (Base values in Billions IDR - Scaled to Tens/Units)
    // Range: 2 Miliar - 80 Miliar
    const INITIAL_MARKET_NODES = [
        { code: "IT", name: "ITALIA (Milan)", flagUrl: "https://flagcdn.com/w80/it.png", baseIncome: 45.2, currency: "EUR" },
        { code: "FR", name: "PERANCIS (Paris)", flagUrl: "https://flagcdn.com/w80/fr.png", baseIncome: 28.5, currency: "EUR" },
        { code: "US", name: "USA (New York)", flagUrl: "https://flagcdn.com/w80/us.png", baseIncome: 18.1, currency: "USD" },
        { code: "JP", name: "JEPANG (Tokyo)", flagUrl: "https://flagcdn.com/w80/jp.png", baseIncome: 12.4, currency: "JPY" },
        { code: "CN", name: "CHINA (Shanghai)", flagUrl: "https://flagcdn.com/w80/cn.png", baseIncome: 9.8, currency: "CNY" },
        { code: "AE", name: "UAE (Dubai)", flagUrl: "https://flagcdn.com/w80/ae.png", baseIncome: 7.2, currency: "AED" },
    ];

    // State for live market data
    const [marketNodes, setMarketNodes] = useState(INITIAL_MARKET_NODES.map(n => ({
        ...n,
        currentIncome: n.baseIncome, // In Billions (Miliar)
        change: 0.5, // Percent
        trend: 'up' as 'up' | 'down'
    })));

    // State for Ticker Data
    const [currencyData, setCurrencyData] = useState({
        usd: 15450,
        eur: 16820,
        exportVol: 128
    });

    // 2. Simulation Logic (Effect)
    useEffect(() => {
        const interval = setInterval(() => {
            // A. Update Market Nodes (Fluctuate values)
            setMarketNodes(prevNodes => prevNodes.map(node => {
                // Fluctuate income by small random amount (-0.2 to +0.3 Miliar)
                const fluctuation = (Math.random() * 0.5) - 0.2;
                let newIncome = node.currentIncome + fluctuation;
                
                // Keep within realistic "Tens/Units" bounds (Min 1M, Max 99M)
                if (newIncome < 1) newIncome = 1.2;
                if (newIncome > 99) newIncome = 98.5;

                // Calculate Change % based on base vs new
                const diff = newIncome - node.baseIncome;
                const changePct = (diff / node.baseIncome) * 100;

                return {
                    ...node,
                    currentIncome: newIncome,
                    change: Math.abs(changePct),
                    trend: diff >= 0 ? 'up' : 'down'
                };
            }));

            // B. Update Currency/Ticker
            setCurrencyData(prev => ({
                usd: prev.usd + Math.floor((Math.random() * 10) - 5),
                eur: prev.eur + Math.floor((Math.random() * 10) - 5),
                exportVol: prev.exportVol + (Math.random() > 0.7 ? 1 : 0) // Slowly increment volume
            }));

        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    // 3. Calculate Total Realtime Export (Sum of displayed nodes)
    const totalExportValue = useMemo(() => {
        return marketNodes.reduce((acc, curr) => acc + curr.currentIncome, 0);
    }, [marketNodes]);

    // Format Helpers
    const formatMiliar = (val: number) => `Rp ${val.toFixed(1).replace('.', ',')} Miliar`;
    const formatCurrency = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

    // Visible Nodes Logic (Rotation)
    const [startIndex, setStartIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setStartIndex((prev) => (prev + 1) % marketNodes.length);
        }, 5000); // Rotate visible list every 5s
        return () => clearInterval(interval);
    }, [marketNodes.length]);

    const visibleCountries = [];
    for (let i = 0; i < 4; i++) {
        visibleCountries.push(marketNodes[(startIndex + i) % marketNodes.length]);
    }

    const ImpactTickerContent = () => (
        <>
            <span className="mr-8 flex items-center">
                <span className="text-gray-400 mr-2">USD/IDR:</span> 
                <span className="text-[#BFA36F] font-mono">{formatCurrency(currencyData.usd)}</span>
                <span className="ml-1 text-green-500 text-[10px] flex items-center"><TrendingUp className="w-3 h-3"/></span>
            </span>
            <span className="mr-8 flex items-center">
                <span className="text-gray-400 mr-2">EUR/IDR:</span> 
                <span className="text-[#BFA36F] font-mono">{formatCurrency(currencyData.eur)}</span>
                <span className="ml-1 text-green-500 text-[10px] flex items-center"><TrendingUp className="w-3 h-3"/></span>
            </span>
            <span className="mr-8 flex items-center">
                <span className="text-gray-400 mr-2">VOL EKSPOR (YTD):</span> 
                <span className="text-white font-mono">{currencyData.exportVol}K YDS</span>
            </span>
        </>
    );

    const ARTISAN_LOGS = [
        { id: "WS-SOLO-01", name: "Keraton Royal Atelier", task: "Batik Tulis Halus", progress: 85, status: "Finishing", color: "bg-green-500" },
        { id: "WS-PKL-04", name: "Pesisir Vibrant Studio", task: "Pewarnaan Indigo", progress: 40, status: "Proses", color: "bg-yellow-500" },
        { id: "WS-BALI-09", name: "Ubud Sacred Threads", task: "Tenun Ikat Ganda", progress: 65, status: "Weaving", color: "bg-blue-500" },
        { id: "WS-CJR-02", name: "Sogan Imperial House", task: "Quality Control", progress: 98, status: "Ready", color: "bg-green-600" },
        { id: "ART-MURNI", name: "Ibu Murni (Artisan)", task: "Canting Tulis Level 1", progress: 25, status: "Sketching", color: "bg-red-500" },
        { id: "LOG-JKT-A", name: "Hub Logistik Menteng", task: "Packaging & Labeling", progress: 100, status: "Shipped", color: "bg-green-700" },
        { id: "MAT-GRT-X", name: "Sentra Sutra Garut", task: "Pemintalan Benang", progress: 55, status: "Spinning", color: "bg-yellow-600" },
        { id: "RD-LAB-01", name: "Lab Warna Alami", task: "Uji Ketahanan Luntur", progress: 10, status: "Testing", color: "bg-gray-500" }
    ];

    const DETAILED_SHIPMENTS = [
        { 
            awb: "8821-EX-IT", 
            origin: "CGK",
            destCode: "MXP",
            destCity: "Milan, IT",
            carrier: "Garuda Cargo",
            flight: "GA-882",
            items: "Sutra Organik (Grade A)",
            weight: "450 Kg",
            status: "Tiba di Hub Logistik",
            progress: 85,
            statusColor: "text-green-600",
            time: "10:42 AM",
            type: "AIR"
        },
        { 
            awb: "8824-EX-FR", 
            origin: "CGK",
            destCode: "CDG",
            destCity: "Paris, FR",
            carrier: "DHL Express",
            flight: "DHL-901",
            items: "Beludru Sulam (Grade S)",
            weight: "120 Kg",
            status: "Transit - Singapore",
            progress: 45,
            statusColor: "text-blue-600",
            time: "09:15 AM",
            type: "AIR"
        },
        { 
            awb: "SEA-991-US", 
            origin: "SUB",
            destCode: "LAX",
            destCity: "Los Angeles, US",
            carrier: "Maersk Line",
            flight: "Vessel: Emma",
            items: "Tenun Ikat (Bulk)",
            weight: "2.5 Ton",
            status: "Loading Port Surabaya",
            progress: 15,
            statusColor: "text-yellow-600",
            time: "08:00 AM",
            type: "SEA"
        },
    ];

    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-28 md:pt-32 pb-12 animate-fadeIn font-sans">
             <div className="fixed top-[88px] md:top-24 left-0 w-full bg-black text-[#BFA36F] z-30 overflow-hidden py-2 border-b border-[#8B1D1D] hidden md:flex">
                 {/* Double Ticker Content for Seamless Loop */}
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
                    {/* LEFT COL: GLOBAL MARKET (Futuristic Terminal Look) */}
                    <div className="lg:col-span-2 bg-[#0A0A0A] rounded-2xl p-6 md:p-8 border border-gray-800 text-white shadow-2xl relative overflow-hidden group">
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#BFA36F]/5 to-transparent h-full w-full animate-[scan_3s_linear_infinite] pointer-events-none z-10"></div>
                        <div className="absolute top-0 right-0 p-4 opacity-20"><Globe className="w-24 h-24 text-[#BFA36F]" /></div>
                        
                        <div className="flex justify-between items-center mb-6 relative z-20">
                            <h3 className="text-[#BFA36F] font-mono text-xs font-bold uppercase tracking-widest flex items-center">
                                <Activity className="w-4 h-4 mr-2 animate-pulse" /> LIVE MARKET DATA
                            </h3>
                            <span className="text-[10px] font-mono text-gray-500 animate-pulse">● LIVE UPDATES</span>
                        </div>

                        <div className="space-y-4 relative z-20">
                            {visibleCountries.map((c, i) => (
                                <div key={i} className="flex justify-between items-center md:grid md:grid-cols-12 bg-[#151515] p-3 rounded border-l-2 border-[#BFA36F] hover:bg-[#222] transition-all hover:scale-[1.01] duration-500">
                                    <div className="flex items-center md:contents">
                                        <div className="font-mono text-xs text-gray-400 w-10 md:w-auto md:col-span-2">{c.code}</div>
                                        <div className="font-bold text-sm flex items-center md:col-span-4"><img src={c.flagUrl} className="w-4 h-3 mr-2 rounded-sm" alt="flag" /> <span className="truncate">{c.name.split('(')[0]}</span></div>
                                    </div>
                                    {/* Mobile Responsive Vertical Stack for Volume/Growth */}
                                    <div className="flex flex-col items-end md:contents">
                                        <div className="md:col-span-3 text-right font-mono text-[#BFA36F] text-[10px] md:text-xs whitespace-nowrap transition-all duration-300">
                                            {formatMiliar(c.currentIncome)}
                                        </div>
                                        <div className={`md:col-span-3 text-right font-bold text-[10px] md:text-xs whitespace-nowrap flex items-center justify-end ${c.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                            {c.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1"/> : <TrendingDown className="w-3 h-3 mr-1"/>}
                                            {c.change.toFixed(1)}%
                                            <span className="text-[9px] text-gray-600 ml-1 font-normal">vs Last Wk</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800 relative z-20">
                             <div className="flex flex-col">
                                <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wider mb-1">TOTAL NILAI EKSPOR</span>
                                <div className="text-sm md:text-2xl font-bold text-white whitespace-nowrap transition-all duration-500">
                                    {formatMiliar(totalExportValue)}
                                </div>
                            </div>
                            <div className="w-px h-8 bg-gray-800 mx-2"></div>
                            <div className="flex flex-col">
                                <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wider mb-1">ACTIVE ROUTES</span>
                                <div className="text-sm md:text-xl font-bold text-white whitespace-nowrap">14 Negara</div>
                            </div>
                            <div className="w-px h-8 bg-gray-800 mx-2"></div>
                             <div className="flex flex-col">
                                <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wider mb-1">ARTISAN PAID</span>
                                <div className="text-sm md:text-xl font-bold text-[#BFA36F] whitespace-nowrap">100%</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COL: DETAILED LOGISTICS */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg flex flex-col">
                        <h3 className="text-[#8B1D1D] font-bold text-xs uppercase tracking-widest mb-6 flex items-center justify-between">
                            <span className="flex items-center"><Truck className="w-4 h-4 mr-2" /> MANIFEST PENGIRIMAN</span>
                            <span className="text-[9px] bg-gray-100 px-2 py-1 rounded-full text-gray-500 flex items-center"><Zap className="w-3 h-3 mr-1 text-yellow-500"/> Live</span>
                        </h3>
                        
                        <div className="flex-1 space-y-5 overflow-y-auto max-h-[400px] pr-1 scrollbar-hide">
                            {DETAILED_SHIPMENTS.map((shipment, i) => (
                                <div key={i} className="border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow">
                                    {/* Header: Carrier & Route */}
                                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-50">
                                        <div className="flex items-center text-[10px] font-bold uppercase tracking-wider text-gray-600">
                                            {shipment.type === 'AIR' ? <Plane className="w-3 h-3 mr-1 text-[#8B1D1D]"/> : <Anchor className="w-3 h-3 mr-1 text-blue-600"/>}
                                            {shipment.carrier}
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-400">{shipment.flight}</span>
                                    </div>

                                    {/* Main Info */}
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-mono text-xs font-bold text-[#8B1D1D]">{shipment.origin}</span>
                                                <div className="w-8 h-px bg-gray-300 relative">
                                                    <div className="absolute -top-0.5 right-0 w-1 h-1 bg-gray-400 rounded-full"></div>
                                                </div>
                                                <span className="font-mono text-xs font-bold text-[#8B1D1D]">{shipment.destCode}</span>
                                            </div>
                                            <p className="text-[10px] font-bold text-black">{shipment.destCity}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="block font-bold text-xs text-black">{shipment.weight}</span>
                                            <span className="text-[9px] text-gray-500 block">Berat</span>
                                        </div>
                                    </div>

                                    {/* Item Desc */}
                                    <div className="flex items-center text-[10px] text-gray-500 mb-3 bg-gray-50 px-2 py-1 rounded">
                                        <Package className="w-3 h-3 mr-1"/> {shipment.items}
                                    </div>

                                    {/* Progress */}
                                    <div className="relative pt-1 mb-2">
                                        <div className="flex mb-1 items-center justify-between">
                                            <span className={`text-[9px] font-bold uppercase tracking-wider ${shipment.statusColor} flex items-center`}>
                                                {shipment.progress < 100 && <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse mr-1"></span>}
                                                {shipment.status}
                                            </span>
                                            <span className="text-[9px] font-bold text-gray-600">{shipment.progress}%</span>
                                        </div>
                                        <div className="overflow-hidden h-1.5 mb-1 text-xs flex rounded-full bg-gray-100">
                                            <div style={{ width: `${shipment.progress}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${shipment.progress === 100 ? 'bg-green-500' : 'bg-[#8B1D1D]'}`}></div>
                                        </div>
                                    </div>

                                    {/* Footer ID & Time */}
                                    <div className="flex justify-between items-center text-[9px] text-gray-400 font-mono">
                                        <span>AWB: {shipment.awb}</span>
                                        <span>ETA: {shipment.time}</span>
                                    </div>
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
                                    <div className={`w-2 h-2 rounded-full ${log.color}`}></div>
                                </div>
                                <h3 className="font-bold text-sm text-black mb-1 truncate">{log.name}</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-4">{log.task}</p>
                                
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                                    <div className={`h-1.5 rounded-full ${log.color === 'bg-yellow-500' ? 'bg-[#BFA36F]' : '#8B1D1D'}`} style={{ width: `${log.progress}%`, backgroundColor: log.progress === 100 ? 'green' : '#8B1D1D' }}></div>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-gray-400">{log.status}</span>
                                    <span className="text-black">{log.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// 4. PARTNERS PAGE (4 MITRA)
// ----------------------------------------------------------------------
export const PartnersPage: React.FC<PartnersPageProps> = ({ onBack, onPartnerSelect }) => {
    const partners = [
        {
            name: "Keraton Royal Atelier",
            location: "Yogyakarta",
            specialty: "Batik Tulis Halus (Royal Pattern)",
            description: "Spesialis motif larangan keraton dengan teknik canting 0.5mm. Mitra eksklusif untuk koleksi Haute Couture.",
            image: "https://i.pinimg.com/1200x/c0/f7/cc/c0f7ccfef225fa30f5def346a5083b53.jpg",
            tier: "TIER 1 - GUCCI ARTISAN",
            id: "YO-001"
        },
        {
            name: "Pesisir Vibrant Studio",
            location: "Pekalongan",
            specialty: "Pewarnaan Indigo & Flora",
            description: "Pewarnaan indigo alami dengan motif buketan pengaruh Eropa-Cina. Pemasok utama untuk koleksi Resort Wear.",
            image: "https://i.pinimg.com/736x/40/90/32/409032882a7247f4e5025c5fdf6517db.jpg",
            tier: "TIER 1 - GUCCI ARTISAN",
            id: "PK-004"
        },
        {
            name: "Sogan Imperial House",
            location: "Solo",
            specialty: "Batik Sogan Klasik",
            description: "Mempertahankan pakem warna coklat sogan alami. Fokus pada kemeja pria formal dan aksesoris interior.",
            image: "https://i.pinimg.com/736x/79/d3/61/79d361f296f89d189a5c75aab70a4563.jpg",
            tier: "TIER 2 - CERTIFIED",
            id: "SL-021"
        },
        {
            name: "Ubud Sacred Threads",
            location: "Bali",
            specialty: "Tenun Ikat & Prada",
            description: "Penggabungan teknik tenun ikat ganda dengan sentuhan emas prada. Digunakan untuk lini aksesoris Gucci Decor.",
            image: "https://i.pinimg.com/1200x/48/c3/4b/48c34bdc7073d1d1ffb23ee110d5c799.jpg",
            tier: "TIER 1 - GUCCI ARTISAN",
            id: "BL-099"
        }
    ];

    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-28 md:pt-32 pb-12 animate-fadeIn">
            <div className="container mx-auto px-4 md:px-12">
                 <button onClick={onBack} className="text-[#8B1D1D] font-bold uppercase tracking-widest text-xs mb-8 flex items-center hover:underline sticky top-24 md:static bg-[#FAF9F6] py-2 z-10 w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
                </button>

                <div className="mb-12 flex flex-col md:flex-row justify-between items-end">
                    <div>
                        <span className="text-[#BFA36F] font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">Kurasi Lokal</span>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-black">Jaringan Mitra Artisan</h1>
                    </div>
                     <div className="flex space-x-4 mt-6 md:mt-0">
                        <button className="bg-white border border-gray-200 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:border-[#8B1D1D] transition-colors flex items-center">
                            <List className="w-4 h-4 mr-2" /> Daftar
                        </button>
                        <button className="bg-gray-100 text-gray-400 px-4 py-2 text-xs font-bold uppercase tracking-widest cursor-not-allowed flex items-center">
                            <MapIcon className="w-4 h-4 mr-2" /> Peta
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {partners.map((p, i) => (
                        <div 
                            key={i} 
                            onClick={() => onPartnerSelect && onPartnerSelect(p)}
                            className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col md:flex-row h-full md:h-64"
                        >
                            <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden relative">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-0 left-0 bg-[#8B1D1D] text-white text-[9px] font-bold uppercase px-3 py-1">
                                    {p.location}
                                </div>
                            </div>
                            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-serif font-bold text-xl text-black group-hover:text-[#8B1D1D] transition-colors">{p.name}</h3>
                                        <ArrowRightIcon className="w-5 h-5 text-gray-300 group-hover:text-[#8B1D1D] opacity-0 group-hover:opacity-100 transition-all" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#BFA36F] mb-4">{p.specialty}</p>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{p.description}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-[9px] font-black uppercase text-gray-400">{p.id}</span>
                                    <span className="flex items-center text-[9px] font-bold uppercase text-green-700 bg-green-50 px-2 py-1 rounded">
                                        <ShieldCheck className="w-3 h-3 mr-1" /> {p.tier}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const PartnerDetailPage: React.FC<PartnerDetailPageProps> = ({ onBack, partner }) => {
    if (!partner) return null;
    return (
        <div className="bg-white min-h-screen pt-32 pb-20 animate-fadeIn font-sans">
             <div className="container mx-auto px-6 lg:px-12">
                <button onClick={onBack} className="text-[#8B1D1D] font-bold uppercase tracking-widest text-xs mb-8 flex items-center hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar Mitra
                </button>
                <div className="text-center py-20">
                     <h1 className="text-4xl font-serif font-bold mb-4">{partner.name}</h1>
                     <p className="text-gray-600">Detail halaman mitra sedang dalam pengembangan.</p>
                </div>
            </div>
        </div>
    );
};


// ----------------------------------------------------------------------
// 5. GALA PAGE (WITH COUNTDOWN & LUXURY EFFECTS)
// ----------------------------------------------------------------------
export const GalaPage: React.FC<PageProps> = ({ onBack }) => {
    // Countdown Timer Logic
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date('December 24, 2025 19:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#05110E] min-h-screen pt-28 md:pt-32 pb-12 animate-fadeIn relative overflow-hidden">
            {/* Background Texture & Gold Dust Particles */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#0F2420] via-[#05110E] to-black opacity-90"></div>
            
            {/* Decorative Gold Elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-[#BFA36F] rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B1D1D] rounded-full filter blur-[120px] opacity-10"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
                 <button onClick={onBack} className="absolute left-0 top-0 text-[#BFA36F] font-bold uppercase tracking-widest text-xs flex items-center hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
                </button>

                <div className="mt-12 md:mt-20 mb-16">
                    <span className="text-[#BFA36F] font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs block mb-6">Undangan Eksklusif</span>
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 drop-shadow-2xl">
                        Gucci <span className="text-[#8B1D1D] italic">Holiday</span> Gala
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-300 font-serif italic max-w-2xl mx-auto leading-relaxed">
                        "Malam apresiasi untuk para maestro batik dan tenun Indonesia."
                    </p>
                </div>

                {/* Event Card with Countdown */}
                <div className="max-w-4xl mx-auto bg-[#0F2420]/50 backdrop-blur-md border border-[#BFA36F]/30 p-8 md:p-16 rounded-sm relative group">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-[#BFA36F] flex items-center justify-center shadow-lg">
                        <Award className="w-6 h-6 text-[#0F2420]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white border-b border-[#BFA36F]/20 pb-12 mb-12">
                        <div>
                            <Calendar className="w-8 h-8 text-[#BFA36F] mx-auto mb-4 opacity-80" />
                            <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">24 Desember 2025</h3>
                            <p className="text-xs uppercase tracking-widest text-gray-400">Pukul 19:00 WIB</p>
                        </div>
                        <div className="md:border-x border-[#BFA36F]/20 px-4">
                             <MapPin className="w-8 h-8 text-[#BFA36F] mx-auto mb-4 opacity-80" />
                             <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">Grand Ballroom</h3>
                             <p className="text-xs uppercase tracking-widest text-gray-400">Hotel Mulia Senayan, Jakarta</p>
                        </div>
                        <div>
                             <ShoppingBag className="w-8 h-8 text-[#BFA36F] mx-auto mb-4 opacity-80" />
                             <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">Dress Code</h3>
                             <p className="text-xs uppercase tracking-widest text-gray-400">Black Tie & Batik Haute Couture</p>
                        </div>
                    </div>

                    <div className="text-gray-300 mb-12 leading-relaxed">
                        Bergabunglah dalam perayaan kesuksesan ekspor tahun ini. Acara akan dimeriahkan dengan fashion show koleksi "The Batik Renaissance", pemberian penghargaan "Artisan of The Year", dan lelang amal untuk pendidikan pengrajin muda.
                    </div>

                     {/* Countdown Timer */}
                     <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-12">
                        <div className="bg-black/40 p-4 border border-[#BFA36F]/20 rounded">
                            <span className="block text-2xl md:text-4xl font-serif font-bold text-[#BFA36F]">{timeLeft.days}</span>
                            <span className="text-[9px] uppercase tracking-widest text-gray-400">Hari</span>
                        </div>
                        <div className="bg-black/40 p-4 border border-[#BFA36F]/20 rounded">
                            <span className="block text-2xl md:text-4xl font-serif font-bold text-[#BFA36F]">{timeLeft.hours}</span>
                            <span className="text-[9px] uppercase tracking-widest text-gray-400">Jam</span>
                        </div>
                        <div className="bg-black/40 p-4 border border-[#BFA36F]/20 rounded">
                            <span className="block text-2xl md:text-4xl font-serif font-bold text-[#BFA36F]">{timeLeft.minutes}</span>
                            <span className="text-[9px] uppercase tracking-widest text-gray-400">Menit</span>
                        </div>
                        <div className="bg-black/40 p-4 border border-[#BFA36F]/20 rounded">
                            <span className="block text-2xl md:text-4xl font-serif font-bold text-[#BFA36F]">{timeLeft.seconds}</span>
                            <span className="text-[9px] uppercase tracking-widest text-gray-400">Detik</span>
                        </div>
                     </div>

                    <button 
                        onClick={openWhatsAppRegistration}
                        className="bg-[#BFA36F] text-[#0F2420] px-10 py-4 font-bold uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(191,163,111,0.3)]"
                    >
                        RSVP Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// 6. REGISTER PAGE
// ----------------------------------------------------------------------
export const RegisterPage: React.FC<PageProps> = ({ onBack }) => {
    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-12 animate-fadeIn font-sans">
             <div className="container mx-auto px-6 lg:px-12">
                 <button onClick={onBack} className="text-[#8B1D1D] font-bold uppercase tracking-widest text-xs mb-8 flex items-center hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
                </button>
                <div className="max-w-2xl mx-auto bg-white p-12 shadow-2xl border-t-4 border-[#8B1D1D]">
                    <h2 className="text-3xl font-serif font-bold text-center mb-2">Pendaftaran Mitra</h2>
                    <p className="text-center text-gray-500 mb-8 text-sm uppercase tracking-wider">Bergabunglah dengan Ekosistem Ekspor Gucci</p>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h3 className="font-bold text-[#8B1D1D] mb-4 flex items-center"><CheckCircle className="w-5 h-5 mr-2"/> Keuntungan Mitra</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start"><span className="mr-2">•</span> Akses pasar ekspor ke 40 negara</li>
                                <li className="flex items-start"><span className="mr-2">•</span> Standarisasi QC & Pelatihan Artisan gratis</li>
                                <li className="flex items-start"><span className="mr-2">•</span> Sistem pembayaran transparan (P4P)</li>
                            </ul>
                        </div>

                        <div className="text-center py-6">
                            <p className="mb-6 text-gray-600">Pendaftaran dilakukan secara eksklusif melalui tim verifikasi kami di WhatsApp untuk validasi data usaha.</p>
                            <button 
                                onClick={openWhatsAppRegistration}
                                className="w-full bg-[#25D366] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-colors flex items-center justify-center shadow-lg"
                            >
                                Hubungi Tim Verifikasi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// 7. LEGALITY DOCUMENT PAGES (REALISTIC VIEW & MOBILE OPTIMIZED)
// ----------------------------------------------------------------------

const DocumentLayout: React.FC<{ 
    title: string; 
    subtitle: string; 
    docNumber: string;
    onBack: () => void; 
    children: React.ReactNode;
    address?: string; // Add optional address for letterhead
}> = ({ title, subtitle, docNumber, onBack, children, address }) => {
    return (
        <div className="bg-[#525659] min-h-screen py-4 md:py-10 px-0 md:px-0 animate-fadeIn font-['Roboto'] overflow-x-hidden">
            {/* Mobile Header Bar */}
            <div className="bg-white p-4 shadow-md mb-4 md:hidden flex items-center sticky top-0 z-50">
                <button onClick={onBack} className="flex items-center text-gray-800 font-sans text-xs uppercase font-bold">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
                </button>
            </div>

            {/* A4 Container (Responsive) */}
            <div className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] mx-auto bg-white shadow-2xl p-6 md:p-[20mm] relative">
                
                {/* Desktop Back Button */}
                <button onClick={onBack} className="absolute top-4 left-[-150px] bg-white p-3 rounded-full shadow-lg text-gray-600 hover:text-[#8B1D1D] hidden xl:block">
                    <ArrowLeft className="w-6 h-6" />
                </button>

                {/* Kop Surat Garuda */}
                <div className="text-center border-b-4 border-double border-black pb-4 mb-6 md:mb-8">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/National_emblem_of_Indonesia_Garuda_Pancasila.svg/1200px-National_emblem_of_Indonesia_Garuda_Pancasila.svg.png" alt="Garuda" className="h-16 md:h-24 mx-auto mb-3" />
                    <h1 className="text-base md:text-2xl font-bold uppercase tracking-widest mb-1 leading-tight">{title}</h1>
                    <h2 className="text-xs md:text-base font-bold uppercase text-gray-600 mb-1 leading-tight">{subtitle}</h2>
                    {address && <p className="text-[9px] md:text-[10px] text-gray-500 font-sans mb-1">{address}</p>}
                    <p className="text-[10px] md:text-xs font-mono font-bold mt-2">NOMOR: {docNumber}</p>
                </div>

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/National_emblem_of_Indonesia_Garuda_Pancasila.svg/1200px-National_emblem_of_Indonesia_Garuda_Pancasila.svg.png" alt="Watermark" className="w-[300px] md:w-[500px]" />
                </div>

                {/* Content */}
                <div className="relative z-10 font-['Roboto'] font-medium text-justify leading-relaxed text-gray-900 text-sm md:text-base border-b-0 pb-0">
                    {children}
                </div>

                {/* Footer / QR */}
                <div className="mt-12 md:absolute md:bottom-[20mm] md:left-[20mm] md:right-[20mm] pt-4 md:border-t-0">
                    <div className="text-[9px] text-gray-400 font-sans w-full md:w-2/3">
                        <p className="mb-1">Dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE), BSSN.</p>
                        <p>Dokumen ini sah dan tidak memerlukan tanda tangan basah.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SKKemenkumhamPage: React.FC<PageProps> = ({ onBack }) => (
    <DocumentLayout 
        title="KEPUTUSAN MENTERI HUKUM DAN HAK ASASI MANUSIA R.I."
        subtitle="DIREKTORAT JENDERAL ADMINISTRASI HUKUM UMUM"
        docNumber="AHU-0058932.AH.01.01.TAHUN 2025"
        onBack={onBack}
    >
        <p className="mb-6"><strong>TENTANG:</strong><br/>PENGESAHAN PENDIRIAN BADAN HUKUM PERSEROAN TERBATAS <strong>PT. GRAHA CITRA PRIMA</strong></p>
        
        <p className="mb-4">Menteri Hukum dan Hak Asasi Manusia Republik Indonesia,</p>
        
        <div className="mb-4">
            <strong>MENIMBANG:</strong>
            <ul className="list-none pl-4 mt-1 space-y-2">
                <li className="flex items-start"><span className="mr-2">a.</span> <span>Bahwa berdasarkan permohonan Notaris yang terdaftar sesuai salinan Akta Nomor 89 Tanggal 01 Januari 2025;</span></li>
                <li className="flex items-start"><span className="mr-2">b.</span> <span>Bahwa permohonan tersebut telah memenuhi syarat dan ketentuan peraturan perundang-undangan.</span></li>
            </ul>
        </div>
        
        <p className="mb-6 font-bold">MEMUTUSKAN:</p>
        <p className="mb-2 font-bold">MENETAPKAN:</p>
        <ol className="list-decimal pl-6 space-y-3 mb-8">
            <li>Mengesahkan pendirian badan hukum <strong>PT. GRAHA CITRA PRIMA</strong> yang berkedudukan di <strong>JAKARTA PUSAT</strong>.</li>
            <li>Modal Dasar Perseroan berjumlah Rp 50.000.000.000,- (Lima Puluh Miliar Rupiah).</li>
            <li>Susunan Pemegang Saham, Dewan Komisaris, dan Direksi adalah sebagaimana tercantum dalam lampiran keputusan ini.</li>
            <li>Keputusan ini mulai berlaku sejak tanggal ditetapkan.</li>
        </ol>

        <div className="flex flex-col items-end mt-8 relative">
            <div className="text-center w-full md:w-64">
                <p className="mb-2 text-sm">Ditetapkan di Jakarta,<br/>Pada Tanggal 02 Januari 2025</p>
                
                {/* Signature Image - Enlarged & Responsive */}
                <div className="h-32 md:h-52 flex items-center justify-center relative z-10 my-2">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Tanda_Tangan_Mick_Schumacher.png" 
                        alt="Tanda Tangan Menteri" 
                        className="h-full object-contain mix-blend-multiply opacity-90 transform -rotate-2" 
                    />
                </div>

                <p className="font-bold underline mt-2">YASONNA H. LAOLY</p>
                <p className="text-sm">MENTERI HUKUM DAN HAM R.I.</p>
            </div>
        </div>
    </DocumentLayout>
);

export const IzinEksporPage: React.FC<PageProps> = ({ onBack }) => (
    <DocumentLayout 
        title="KEMENTERIAN PERDAGANGAN REPUBLIK INDONESIA"
        subtitle="DIREKTORAT JENDERAL PERDAGANGAN LUAR NEGERI"
        docNumber="02.SPE/DAGLU/01/2025"
        address="Jalan M.I. Ridwan Rais No. 5, Jakarta Pusat 10110"
        onBack={onBack}
    >
        <div className="text-center font-bold text-base md:text-lg underline mb-6">SURAT PERSETUJUAN EKSPOR (SPE)<br/>TEKSTIL DAN PRODUK TEKSTIL</div>

        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 text-xs font-sans rounded">
            <strong>DASAR HUKUM:</strong>
            <ul className="list-disc pl-4 mt-1">
                <li>Permendag Nomor 19 Tahun 2021 tentang Kebijakan Ekspor.</li>
                <li>Permendag Nomor 08 Tahun 2024 tentang Perubahan atas Permendag No. 36/2023.</li>
            </ul>
        </div>

        <p className="mb-2"><strong>KEPADA YTH:</strong></p>
        <div className="ml-0 md:ml-4 mb-6 border-l-4 border-black pl-4">
            <div className="font-bold uppercase">PT. GRAHA CITRA PRIMA</div>
            <div>Gedung Optik Tunggal, Jl. Cikini Raya No. 89</div>
            <div>Jakarta Pusat, DKI Jakarta</div>
        </div>

        <p className="mb-4">Berdasarkan hasil verifikasi terhadap data dan kelengkapan dokumen permohonan, dengan ini diterbitkan Persetujuan Ekspor kepada:</p>
        
        {/* Responsive Table Wrapper */}
        <div className="w-full overflow-x-auto mb-6">
            <table className="w-full text-xs md:text-sm border-collapse border border-gray-300 min-w-[300px]">
                 <tbody>
                    <tr className="border border-gray-300"><td className="p-2 border border-gray-300 w-1/3 bg-gray-50 font-bold">1. NIB</td><td className="p-2 border border-gray-300">9120114281905</td></tr>
                    <tr className="border border-gray-300"><td className="p-2 border border-gray-300 bg-gray-50 font-bold">2. NPWP</td><td className="p-2 border border-gray-300">01.234.567.8-011.000</td></tr>
                    <tr className="border border-gray-300"><td className="p-2 border border-gray-300 bg-gray-50 font-bold">3. Uraian Barang</td><td className="p-2 border border-gray-300">
                        <strong>HS Code 5007.20:</strong> Kain tenun sutra.<br/>
                        <strong>HS Code 5208.10:</strong> Kain kapas polos.
                    </td></tr>
                    <tr className="border border-gray-300"><td className="p-2 border border-gray-300 bg-gray-50 font-bold">4. Kuota</td><td className="p-2 border border-gray-300">500.000 Yard / Tahun</td></tr>
                    <tr className="border border-gray-300"><td className="p-2 border border-gray-300 bg-gray-50 font-bold">5. Negara Tujuan</td><td className="p-2 border border-gray-300">Semua Negara (All Countries)</td></tr>
                    <tr className="border border-gray-300"><td className="p-2 border border-gray-300 bg-gray-50 font-bold">6. Masa Berlaku</td><td className="p-2 border border-gray-300 text-[#8B1D1D] font-bold">Hingga 02 Januari 2027</td></tr>
                 </tbody>
            </table>
        </div>

        <p className="mb-2 font-bold text-xs md:text-sm">KETENTUAN LAIN:</p>
        <ol className="list-decimal pl-6 space-y-1 mb-8 text-xs text-justify">
            <li>Eksportir wajib menyampaikan Laporan Realisasi Ekspor baik terealisasi maupun tidak, melalui sistem INATRADE.</li>
            <li>Persetujuan Ekspor ini dapat dicabut apabila perusahaan terbukti melakukan pelanggaran.</li>
        </ol>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-8 gap-8">
            <div className="text-[10px] w-full md:w-64">
                <p className="font-bold underline mb-1">Tembusan:</p>
                <ol className="list-decimal pl-4">
                    <li>Dirjen Bea dan Cukai</li>
                    <li>Dirjen PEN</li>
                    <li>Arsip</li>
                </ol>
            </div>

            <div className="w-full md:w-64 text-center relative">
                 <p className="mb-2 text-xs">Jakarta, 02 Januari 2025<br/>a.n. MENTERI PERDAGANGAN<br/>Dirjen Perdagangan Luar Negeri</p>
                 
                 {/* WET SIGNATURE - Enlarged & Responsive */}
                 <div className="h-32 md:h-52 flex items-center justify-center relative z-10 my-2">
                      <img 
                        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkUivnct3ZzTlwcEXkmRBACsnkL2UTPXZ8dCGoNjsFMWyf8OKVhyphenhyphenaoA44X8isr8gwWtdi5os_X04gj2mSiC0U5MQC7ANfWo7fBYf-QMCbtJ0Zf0n-zcwmA8l4q4UDRjsE0nKZkVxYpby4T/w1200-h630-p-k-no-nu/hasil+scan+1+-+cara+scan+tanda+tangan.jpg" 
                        alt="Tanda Tangan Dirjen" 
                        className="h-full object-contain mix-blend-multiply filter contrast-150 brightness-110" 
                      />
                 </div>
                 
                 <p className="font-bold underline">BUDI SANTOSO</p>
                 <p className="text-xs">NIP. 19680205 199403 1 001</p>
            </div>
        </div>
    </DocumentLayout>
);

export const ISOPage: React.FC<PageProps> = ({ onBack }) => (
    <div className="bg-[#525659] min-h-screen py-4 md:py-10 animate-fadeIn font-['Roboto'] font-medium">
        {/* Mobile Header */}
        <div className="bg-white p-4 shadow-md mb-4 md:hidden flex items-center sticky top-0 z-50">
            <button onClick={onBack} className="flex items-center text-gray-800 font-sans text-xs uppercase font-bold">
                <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
            </button>
        </div>

        {/* Responsive Certificate Container */}
        <div className="w-full md:w-[297mm] min-h-screen md:min-h-[210mm] mx-auto bg-white shadow-2xl p-6 md:p-[15mm] relative border-[10px] md:border-[20px] border-double border-[#0F2420]">
            
            {/* Watermark added here */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                 <img src="https://i.pinimg.com/736x/3a/91/2c/3a912c00ec4a2e65d517635f6b65d5ff.jpg" alt="Watermark" className="w-[80%] md:w-[60%] opacity-[0.03] grayscale mix-blend-multiply filter contrast-125" />
            </div>

            <button onClick={onBack} className="absolute top-4 left-4 bg-white p-2 rounded shadow text-gray-600 hover:text-[#8B1D1D] hidden xl:block z-20">
                <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 md:mb-12 text-center md:text-left relative z-10">
                <img src="https://i.pinimg.com/736x/3a/91/2c/3a912c00ec4a2e65d517635f6b65d5ff.jpg" alt="ISO" className="h-16 md:h-24 w-auto mb-4 md:mb-0 mix-blend-multiply filter contrast-125" />
                <div className="md:text-right">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#0F2420] tracking-widest">CERTIFICATE</h1>
                    <p className="text-sm md:text-lg text-gray-500 uppercase tracking-widest">OF REGISTRATION</p>
                </div>
            </div>

            <div className="text-center mb-8 md:mb-12 relative z-10">
                <p className="text-gray-500 mb-2 md:mb-4 text-sm md:text-base">This is to certify that the Quality Management System of:</p>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#8B1D1D] mb-2 md:mb-4">PT. GRAHA CITRA PRIMA</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                    Jl. Cikini Raya No. 89, Gedung Optik Tunggal, Menteng, Jakarta Pusat, Indonesia
                </p>
            </div>

            <div className="text-center mb-8 md:mb-12 relative z-10">
                <p className="text-gray-500 mb-2 md:mb-4 text-xs md:text-sm">Has been assessed and found to constitute a Quality Management System which complies with the requirements of:</p>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F2420] mb-2">ISO 9001:2015</h3>
                <p className="text-gray-600 font-medium text-xs md:text-sm">For the following scope of activities:</p>
                <p className="font-bold mt-2 text-sm md:text-lg">Export and Distribution of High-Quality Indonesian Traditional Textiles (Batik & Tenun) for International Luxury Markets.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center md:items-end border-t-2 border-gray-200 pt-8 mt-auto gap-6 md:gap-0 relative z-10">
                <div className="text-center md:text-left">
                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1">Certificate No:</p>
                    <p className="font-mono font-bold text-sm md:text-lg">GCP-ISO-9001-2025</p>
                </div>
                
                <div className="flex flex-col items-center">
                     <div className="text-center">
                        {/* Enlarged Signature ISO - Responsive */}
                        <img src="https://anena.my.id/wp-content/uploads/2023/06/desain-tanda-tangan-simple-anena-studio.png" alt="Sign" className="h-16 md:h-24 mx-auto mb-2 mix-blend-multiply filter contrast-125" />
                        <div className="w-32 border-t border-black pt-1 text-[10px] md:text-xs uppercase font-bold">Director General</div>
                    </div>
                </div>

                <div className="text-center md:text-right">
                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1">Original Issue Date:</p>
                    <p className="font-mono font-bold text-sm mb-2">01 January 2025</p>
                    
                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1">Expiry Date:</p>
                    <p className="font-mono font-bold text-sm text-[#8B1D1D]">01 January 2027</p>
                </div>
            </div>
             
             {/* Gold Seal - Responsive */}
             <div className="absolute bottom-6 md:bottom-12 right-1/2 md:right-1/2 transform translate-x-1/2 w-24 h-24 md:w-32 md:h-32 z-20">
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0e9U-X0rCj8d8q_M0u8z-w_l_s_q_t_u_v&s" alt="Seal" className="w-full h-full opacity-80 mix-blend-multiply text-yellow-600" style={{ filter: 'sepia(1) hue-rotate(20deg) saturate(3)'}} />
             </div>
        </div>
    </div>
);
