
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ShoppingBag, MapPin, TrendingUp, Calendar, Camera, Send, FileText, Download, CheckCircle, Shield, Star, Award, ChevronRight, ShieldCheck, Globe, List, Map as MapIcon, X, BarChart3, TrendingDown, Clock, Feather, Ruler, Info, User, Mail, Phone, Ticket, ExternalLink, Printer, Package, Truck, Plane, Landmark, ArrowUpRight, ArrowDownRight, CircleDollarSign, Activity, Play } from 'lucide-react';
import { NEWS_ITEMS } from '../constants';

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

// ----------------------------------------------------------------------
// UTILS
// ----------------------------------------------------------------------
const openWhatsAppRegistration = () => {
    const phoneNumber = "6282130903916";
    const message = "Hallo , saya ingin mendaftar menjadi mitra bisnis GUCCI";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};

// ----------------------------------------------------------------------
// 1. COLLECTION PAGE (RENAISSANCE BATIK)
// ----------------------------------------------------------------------
export const CollectionPage: React.FC<CollectionPageProps> = ({ onBack, onProductSelect }) => {
    const collectionItems = [
        {
            url: "https://i.pinimg.com/736x/87/10/b9/8710b974ba8778bfa36a85f737993d2e.jpg",
            title: "The Cloud Garden Blazer",
            material: "Sutra Organik & Pewarna Indigo Alami",
            description: "Harmonisasi motif Mega Mendung Cirebon yang melambangkan kesejukan, berpadu dengan rambatan bunga Gucci Flora. Potongan asimetris modern menciptakan siluet yang dinamis namun tetap berakar pada tradisi.",
            philosophy: "Awan Mega Mendung melambangkan pembawa hujan sebagai sumber kehidupan dan kesejukan bagi pemimpin. Dipadukan dengan Flora, ini adalah simbol kepemimpinan yang menyuburkan.",
            process: "Batik Tulis 7 Lapis Warna",
            time: "3 Bulan Pengerjaan",
            origin: "Cirebon, Jawa Barat"
        },
        {
            url: "https://i.pinimg.com/736x/78/41/18/7841188562b57ef75bde432e44675d29.jpg",
            title: "Noir Kebaya Tailored Jacket",
            material: "Italian Wool & Laser-Cut Cotton",
            description: "Interpretasi kontemporer dari Kebaya Kutubaru. Wol hitam pekat dengan detail 'laser-cut' bermotif Kawung (Simbol kesucian), menciptakan struktur formal dengan sentuhan romantis khas Eropa.",
            philosophy: "Motif Kawung terinspirasi dari buah aren yang dibelah, melambangkan kesucian hati dan pengendalian diri. Warna hitam pekat menandakan keanggunan abadi.",
            process: "Laser-cut & Hand Stitching",
            time: "4 Minggu Pengerjaan",
            origin: "Florence x Yogyakarta"
        },
        {
            url: "https://i.pinimg.com/736x/26/a3/9a/26a39a4a63579719a1507fcd2f244611.jpg",
            title: "Monochrome Tenun Kimono",
            material: "Tenun Ikat Troso Handwoven",
            description: "Outer oversized dengan inspirasi Tenun Ikat. Benang katun monokromatik ditenun manual dengan teknik ikat ganda, menghasilkan tekstur 3D geometris dan aksen rumbai yang memberikan kesan bohemian-luxury.",
            philosophy: "Tenun ikat melambangkan ikatan persaudaraan yang kuat. Pola geometris monokrom mencerminkan keseimbangan yin dan yang dalam kehidupan modern.",
            process: "Tenun ATBM (Alat Tenun Bukan Mesin)",
            time: "6 Minggu Pengerjaan",
            origin: "Jepara, Jawa Tengah"
        },
        {
            url: "https://i.pinimg.com/736x/34/6c/d6/346cd6f8b810c1b4ce8764e378fe7be6.jpg",
            title: "Royal Songket Velvet Coat",
            material: "Deep Black Velvet & Gold Thread (Prada)",
            description: "Kemewahan beludru hitam dipadu dengan sulaman benang emas motif Pucuk Rebung Sumatera. Sebuah simbol keagungan dan kemakmuran yang diterjemahkan ke dalam potongan 'Military Coat' yang tegas.",
            philosophy: "Pucuk Rebung melambangkan tekad hati untuk terus tumbuh menjulang tinggi namun tetap memiliki akar yang kuat. Emas melambangkan kejayaan.",
            process: "Sulaman Benang Emas Manual",
            time: "5 Bulan Pengerjaan",
            origin: "Palembang, Sumatera Selatan"
        },
        {
            url: "https://i.pinimg.com/1200x/6f/21/36/6f213683149ecb7c44ce6b89fbcfc0db.jpg",
            title: "The Heritage Alas-Alasan Gown",
            material: "Sutra Habutai & Batik Tulis Halus",
            description: "Gaun sutra panjang menampilkan motif Alas-Alasan (Hutan Larangan). Harimau Jawa dan Gucci King Snake bertemu dalam satu kanvas, dikelilingi vegetasi hutan hujan tropis yang digambar tangan (canting 0.1mm).",
            philosophy: "Alas-alasan menggambarkan kelestarian alam dan hubungan harmonis manusia dengan semesta. Sebuah pengingat akan pentingnya menjaga 'paru-paru' dunia.",
            process: "Canting Tulis Halus (0.1mm)",
            time: "8 Bulan Pengerjaan",
            origin: "Solo, Jawa Tengah"
        },
        {
            url: "https://i.pinimg.com/1200x/5c/27/4e/5c274e612b404af13cc5870ed2125c71.jpg",
            title: "Golden Parang Barong Cape",
            material: "Silk Jacquard & Copper Thread",
            description: "Cape megah berwarna emas tembaga. Motif Parang Barong—yang dahulu hanya untuk Raja—diperbesar (oversized) untuk memberikan kesan modern power-dressing, melambangkan kekuatan yang tak terputus.",
            philosophy: "Parang Barong adalah simbol kekuasaan dan kebijaksanaan raja. Garis ombak yang tak terputus melambangkan perjuangan semangat yang tak pernah padam.",
            process: "Cap Kombinasi Tulis",
            time: "2 Bulan Pengerjaan",
            origin: "Yogyakarta"
        },
        {
            url: "https://i.pinimg.com/1200x/10/dd/5f/10dd5f9aed2e5fb2bba45adee8e99040.jpg",
            title: "Midnight Truntum Shawl",
            material: "Cashmere Wool Blend",
            description: "Ponco wol cashmere dengan motif Truntum (Bintang). Teknik stippling (titik) yang rumit menciptakan gradasi visual seperti langit malam berbintang, melambangkan cinta yang tumbuh kembali.",
            philosophy: "Truntum diciptakan oleh Ratu Kencana sebagai simbol cinta yang tulus dan abadi, layaknya bintang di langit malam yang selalu setia menemani bulan.",
            process: "Batik Tulis Nitik",
            time: "3 Bulan Pengerjaan",
            origin: "Bantul, Yogyakarta"
        }
    ];

    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-24 md:pt-32 pb-12 animate-fadeIn">
            <div className="container mx-auto px-6 lg:px-12">
                <button onClick={onBack} className="text-[#8B1D1D] font-bold uppercase tracking-widest text-xs mb-8 flex items-center hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
                </button>
                
                <div className="mb-10 md:mb-16 border-b border-gray-200 pb-8">
                    <span className="text-[#BFA36F] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Kapsul Eksklusif 2025</span>
                    <h1 className="text-3xl md:text-6xl font-serif font-bold text-black mb-6">The Batik Renaissance</h1>
                    <p className="text-base md:text-xl text-gray-600 max-w-3xl leading-relaxed">
                        Koleksi kapsul eksklusif yang memadukan motif Flora ikonik Gucci dengan warisan wastra nusantara. 
                        Setiap helai benang menceritakan pertemuan dua budaya besar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {collectionItems.map((item, index) => (
                        <div 
                            key={index} 
                            onClick={() => onProductSelect && onProductSelect(item)}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-200 shadow-lg">
                                 <img 
                                    src={item.url} 
                                    alt={item.title}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-0 left-0 w-full bg-[#8B1D1D] text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <span className="uppercase text-[10px] font-bold tracking-[0.2em] flex items-center justify-between">
                                        Lihat Detail <ChevronRight className="w-4 h-4"/>
                                    </span>
                                </div>
                            </div>
                            
                            {/* Product Info */}
                            <div className="flex flex-col flex-grow">
                                <span className="text-[#BFA36F] text-[10px] font-black uppercase tracking-widest mb-2 line-clamp-1">
                                    {item.material}
                                </span>
                                <h3 className="font-serif font-bold text-xl md:text-2xl text-black mb-3 group-hover:text-[#8B1D1D] transition-colors leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium line-clamp-3 group-hover:text-gray-800 transition-colors">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// 1.5 PRODUCT DETAIL PAGE
// ----------------------------------------------------------------------
export const ProductDetailPage: React.FC<{ product: any; onBack: () => void }> = ({ onBack, product }) => {
    if (!product) return null;

    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-24 md:pt-28 pb-20 animate-fadeIn font-sans">
             <div className="container mx-auto px-6 lg:px-12">
                 {/* Breadcrumb / Back */}
                <nav className="flex items-center text-xs font-bold uppercase tracking-widest mb-8 md:mb-12 text-gray-500">
                    <button onClick={onBack} className="hover:text-[#8B1D1D] transition-colors flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Koleksi
                    </button>
                    <span className="mx-4">/</span>
                    <span className="text-[#8B1D1D] truncate max-w-[150px] md:max-w-none">{product.title}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
                    {/* Image Section - Sticky on Desktop */}
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-32 h-fit">
                        <div className="relative aspect-[3/4] overflow-hidden shadow-2xl rounded-sm">
                             <img 
                                src={product.url} 
                                alt={product.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                            />
                            {/* Badge */}
                            <div className="absolute top-4 left-4 md:top-6 md:left-6">
                                <span className="bg-[#8B1D1D] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-2 shadow-lg">
                                    Limited Edition 2025
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="border-b border-[#BFA36F] pb-6 md:pb-8 mb-6 md:mb-8">
                            <span className="text-[#BFA36F] text-xs font-black uppercase tracking-[0.25em] mb-4 block flex items-center">
                                <MapPin className="w-4 h-4 mr-2" /> {product.origin}
                            </span>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-black mb-4 leading-tight">
                                {product.title}
                            </h1>
                            <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500">
                                {product.material}
                            </p>
                        </div>

                        {/* Story / Description */}
                        <div className="mb-8 md:mb-10">
                            <h3 className="text-[#8B1D1D] font-bold text-sm uppercase tracking-wider mb-4 flex items-center">
                                <Info className="w-4 h-4 mr-2" /> Narasi Produk
                            </h3>
                            <p className="text-gray-800 leading-7 md:leading-8 text-base md:text-lg font-medium font-serif">
                                {product.description}
                            </p>
                        </div>

                        {/* Philosophy Box */}
                        <div className="bg-white p-6 md:p-8 border-l-4 border-[#BFA36F] shadow-sm mb-8 md:mb-10 relative">
                             <Feather className="w-6 h-6 text-[#BFA36F]/20 absolute top-4 right-4" />
                            <h3 className="text-[#988053] font-bold text-xs uppercase tracking-wider mb-4">
                                Filosofi Motif
                            </h3>
                            <p className="text-gray-600 leading-relaxed italic text-base md:text-lg">
                                "{product.philosophy}"
                            </p>
                        </div>

                        {/* Specifications Grid */}
                        <div className="grid grid-cols-2 gap-y-6 md:gap-y-8 gap-x-4 border-t border-gray-200 pt-8 mb-12">
                             <div>
                                <h4 className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1 flex items-center">
                                    <Ruler className="w-3 h-3 mr-1" /> Teknik
                                </h4>
                                <p className="font-bold text-black text-xs md:text-sm">{product.process}</p>
                            </div>
                            <div>
                                <h4 className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" /> Durasi
                                </h4>
                                <p className="font-bold text-black text-xs md:text-sm">{product.time}</p>
                            </div>
                             <div>
                                <h4 className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1 flex items-center">
                                    <ShoppingBag className="w-3 h-3 mr-1" /> Status
                                </h4>
                                <p className="font-bold text-[#8B1D1D] text-xs md:text-sm">Made to Order</p>
                            </div>
                            <div>
                                <h4 className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1 flex items-center">
                                    <Award className="w-3 h-3 mr-1" /> Sertifikasi
                                </h4>
                                <p className="font-bold text-black text-xs md:text-sm flex items-center">
                                    <ShieldCheck className="w-3 h-3 mr-1 text-green-600" /> Tier 1
                                </p>
                            </div>
                        </div>

                        {/* CTA Actions */}
                        <div className="mt-auto space-y-4">
                             <button 
                                onClick={openWhatsAppRegistration}
                                className="w-full bg-[#8B1D1D] text-white py-4 md:py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-lg flex justify-center items-center group"
                            >
                                <ShoppingBag className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> Pesan Sekarang
                            </button>
                            <button 
                                onClick={openWhatsAppRegistration}
                                className="w-full bg-white text-black border border-black py-4 md:py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-gray-50 transition-colors flex justify-center items-center"
                            >
                                Chat Concierge
                            </button>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// 2. PARTNERS PAGE (MITRA BUTIK)
// ----------------------------------------------------------------------
export const PartnersPage: React.FC<PartnersPageProps> = ({ onBack, onPartnerSelect }) => {
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    
    // Default Map URL (Java Overview)
    const [currentMapUrl, setCurrentMapUrl] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3265057.863158025!2d109.43572886470397!3d-7.39803529341492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65561a06734d6f%3A0x3f5c9d2f66453990!2sJava!5e0!3m2!1sen!2sid!4v1709228000000!5m2!1sen!2sid");

    const partners = [
        { 
            id: 1, 
            loc: "Yogyakarta", 
            name: "Keraton Royal Atelier", 
            spec: "Batik Tulis Klasik", 
            desc: "Spesialis motif larangan keraton dengan teknik canting 0.5mm. Berdiri sejak 1970 di lingkungan njeron beteng, menjaga keaslian pakem Mataram.", 
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126492.36531388656!2d110.36443425!3d-7.801368199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6bc5%3A0x21723fd4d3684f71!2sYogyakarta!5e0!3m2!1sen!2sid!4v1709228000001",
            img: "https://i.pinimg.com/1200x/69/d3/e9/69d3e989c553e007f86b34c75cab536c.jpg" 
        },
        { 
            id: 2, 
            loc: "Pekalongan", 
            name: "Pesisir Vibrant Studio", 
            spec: "Batik Warna Alam", 
            desc: "Pewarnaan indigo alami dengan motif buketan pengaruh Eropa-Cina. Terkenal dengan teknik 'colet' yang menghasilkan warna-warna cerah namun ramah lingkungan.", 
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126727.56708785718!2d109.6105809!3d-6.8946761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e702454058d7287%3A0x4027a76e352e4e0!2sPekalongan!5e0!3m2!1sen!2sid!4v1709228000002",
            img: "https://i.pinimg.com/1200x/0c/cb/f2/0ccbf2d19f821cc1680694c576aaa9c8.jpg" 
        },
        { 
            id: 3, 
            loc: "Cirebon", 
            name: "Cloud Motif Workshop", 
            spec: "Mega Mendung", 
            desc: "Sanggar warisan Trusmi yang fokus pada gradasi 7 warna Mega Mendung. Menggabungkan filosofi Taoisme Cina dengan nilai keislaman Cirebon.", 
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126830.82845618772!2d108.49622955!3d-6.7412762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee2649e6e5441%3A0x401e8f1fc28b5f0!2sCirebon!5e0!3m2!1sen!2sid!4v1709228000003",
            img: "https://i.pinimg.com/1200x/84/88/dd/8488dd4305e6267ffc8e6b34c75cab536c.jpg" 
        },
        { 
            id: 4, 
            loc: "Bali", 
            name: "Ubud Sacred Weavers", 
            spec: "Tenun Ikat & Endek", 
            desc: "Penunung tradisional menggunakan benang sutra emas untuk koleksi resort. Setiap motif memiliki makna sakral yang digunakan dalam upacara adat.", 
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63096.79092892649!2d115.2285384!3d-8.5068536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d70d8a59489%3A0x4030bfbca7d4220!2sUbud!5e0!3m2!1sen!2sid!4v1709228000004",
            img: "https://i.pinimg.com/1200x/0c/cb/f2/0ccbf2d19f821cc1680694c576aaa9c8.jpg" 
        }
    ];

    return (
        <div className="bg-white min-h-screen pt-24 md:pt-32 pb-12 animate-fadeIn">
            <div className="container mx-auto px-6 lg:px-12">
                <button onClick={onBack} className="text-[#8B1D1D] font-bold uppercase tracking-widest text-xs mb-8 flex items-center hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
                </button>
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-100 pb-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                             <span className="text-[#BFA36F] uppercase tracking-[0.2em] font-bold text-xs block">Kurasi Lokal</span>
                             <span className="bg-[#BFA36F] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm">Gucci Artisan Tier 1</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-4">Jaringan Mitra Artisan</h1>
                        <p className="text-base md:text-lg text-gray-600 max-w-xl">500+ Butik & Sanggar di bawah naungan PT. Graha Citra Prima.</p>
                    </div>
                    
                    {/* Toggle Buttons */}
                    <div className="mt-6 md:mt-0 flex bg-gray-100 p-1 rounded-lg w-full md:w-auto">
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`flex-1 md:flex-none flex items-center justify-center px-6 py-3 uppercase text-xs font-bold tracking-widest transition-all rounded-md ${viewMode === 'list' ? 'bg-white text-[#8B1D1D] shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <List className="w-4 h-4 mr-2" /> Daftar
                        </button>
                        <button 
                            onClick={() => setViewMode('map')}
                            className={`flex-1 md:flex-none flex items-center justify-center px-6 py-3 uppercase text-xs font-bold tracking-widest transition-all rounded-md ${viewMode === 'map' ? 'bg-[#0F2420] text-[#BFA36F] shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <MapIcon className="w-4 h-4 mr-2" /> Peta
                        </button>
                    </div>
                </div>

                {/* VIEW MODE: LIST */}
                {viewMode === 'list' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 md:gap-y-12 animate-fadeIn">
                        {partners.map((partner) => (
                            <div 
                                key={partner.id} 
                                onClick={() => onPartnerSelect && onPartnerSelect(partner)}
                                className="group border-b border-gray-200 pb-8 flex items-start cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-all"
                            >
                                <div className="bg-[#FAF9F6] p-4 md:p-5 rounded-full mr-4 md:mr-6 group-hover:bg-[#8B1D1D] transition-colors duration-500 shrink-0">
                                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#8B1D1D] group-hover:text-white transition-colors duration-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-[#8B1D1D] font-bold text-xs uppercase tracking-widest mb-2 block">{partner.loc}</span>
                                            <h3 className="text-xl md:text-2xl font-serif font-bold mb-2 text-black group-hover:text-[#BFA36F] transition-colors">{partner.name}</h3>
                                            <p className="text-gray-800 mb-2 font-bold text-sm">{partner.spec}</p>
                                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{partner.desc}</p>
                                        </div>
                                    </div>
                                    <span 
                                        className="mt-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#8B1D1D] flex items-center transition-colors"
                                    >
                                        Lihat Detail <ChevronRight className="w-3 h-3 ml-1" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* VIEW MODE: GOOGLE MAPS */}
                {viewMode === 'map' && (
                    <div className="flex flex-col lg:flex-row gap-6 h-[500px] md:h-[600px] animate-fadeIn">
                         {/* Sidebar List to Switch Maps */}
                         <div className="lg:w-1/3 bg-[#FAF9F6] p-4 md:p-6 rounded-2xl border border-gray-200 overflow-y-auto h-40 lg:h-auto">
                            <h3 className="font-serif font-bold text-lg md:text-xl mb-4 md:mb-6 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-[#8B1D1D]" /> Lokasi Artisan
                            </h3>
                            <div className="space-y-3">
                                {partners.map((partner) => (
                                    <button 
                                        key={partner.id}
                                        onClick={() => setCurrentMapUrl(partner.mapUrl)}
                                        className="w-full text-left p-4 bg-white hover:bg-[#8B1D1D] hover:text-white transition-all rounded-lg shadow-sm border border-gray-100 flex items-center justify-between group"
                                    >
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1 block">{partner.loc}</span>
                                            <span className="font-serif font-bold text-sm">{partner.name}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                    </button>
                                ))}
                            </div>
                         </div>
                         
                         {/* Map Frame */}
                         <div className="flex-1 bg-gray-200 rounded-2xl overflow-hidden shadow-inner relative">
                            <iframe 
                                src={currentMapUrl}
                                width="100%" 
                                height="100%" 
                                style={{border:0}} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                            ></iframe>
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
         <div className="bg-white min-h-screen pt-24 md:pt-32 pb-12 animate-fadeIn">
            <div className="container mx-auto px-6 lg:px-12">
                <button onClick={onBack} className="text-[#8B1D1D] font-bold uppercase tracking-widest text-xs mb-8 flex items-center hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
                </button>
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="w-full md:w-1/2">
                        <img src={partner.img} alt={partner.name} className="w-full rounded-lg shadow-2xl mb-8" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{partner.name}</h1>
                        <p className="text-gray-600 mb-6 leading-relaxed">{partner.desc}</p>
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <h3 className="font-bold mb-2 uppercase tracking-wider text-xs">Lokasi</h3>
                            <p className="font-serif text-lg">{partner.loc}</p>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    );
};

// ----------------------------------------------------------------------
// 3. DOCUMENT PAGES (LEGALITAS)
// ----------------------------------------------------------------------
// Using Roboto Medium and Aligned Colons as requested

export const SKKemenkumhamPage: React.FC<PageProps> = ({ onBack }) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-gray-100 min-h-screen pt-24 pb-12 font-['Roboto'] font-medium text-gray-800">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <button onClick={onBack} className="flex items-center text-[#8B1D1D] mb-8 hover:underline text-sm tracking-widest uppercase font-bold">
                    <ArrowLeft className="w-5 h-5 mr-2" /> KEMBALI
                </button>
                <div className="bg-white p-6 md:p-16 shadow-2xl border-t-8 border-[#8B1D1D] relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gray-100 rounded-bl-full"></div>
                    
                    <div className="flex justify-center mb-8">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_the_Ministry_of_Law_and_Human_Rights_of_the_Republic_of_Indonesia.png/1200px-Flag_of_the_Ministry_of_Law_and_Human_Rights_of_the_Republic_of_Indonesia.png" 
                            alt="Logo" 
                            className="h-16 md:h-20 mb-4"
                        />
                    </div>

                    <h1 className="text-lg md:text-2xl font-bold mb-10 text-center uppercase border-b-2 border-black pb-6 leading-relaxed">
                        KEPUTUSAN MENTERI HUKUM DAN HAK ASASI MANUSIA <br/> REPUBLIK INDONESIA
                    </h1>
                    
                    <div className="bg-gray-50 p-4 md:p-8 rounded-lg border border-gray-200 mb-8 overflow-x-auto">
                        {/* Grid for colons alignment - Mobile Optimized */}
                        <div className="min-w-[300px] grid grid-cols-[100px_10px_1fr] md:grid-cols-[220px_20px_1fr] gap-y-4 text-xs md:text-base font-medium">
                            <div>NOMOR</div> <div className="text-center">:</div> <div className="font-bold">AHU-0058932.AH.01.01.TAHUN 2025</div>
                            <div>TANGGAL</div> <div className="text-center">:</div> <div>24 DESEMBER 2025</div>
                            <div>TENTANG</div> <div className="text-center">:</div> <div>PENGESAHAN PENDIRIAN BADAN HUKUM PERSEROAN TERBATAS PT. GRAHA CITRA PRIMA</div>
                            <div>NPWP</div> <div className="text-center">:</div> <div>91.201.142.8-190.500</div>
                            <div>ALAMAT</div> <div className="text-center">:</div> <div>JL. CIKINI RAYA NO. 89, JAKARTA PUSAT</div>
                        </div>
                    </div>
                    
                    <div className="text-justify leading-relaxed mb-12 text-sm md:text-base">
                        <p className="mb-4">
                            Menteri Hukum dan Hak Asasi Manusia Republik Indonesia, menimbang bahwa berdasarkan permohonan Notaris yang berkedudukan di Jakarta Pusat, sesuai dengan Akta Pendirian yang telah dibuat dan ditandatangani, telah memenuhi syarat sebagai Badan Hukum.
                        </p>
                        <p>
                            Memutuskan, menetapkan pengesahan badan hukum <strong>PT. GRAHA CITRA PRIMA</strong> dengan segala hak dan kewajiban yang melekat padanya.
                        </p>
                    </div>

                    <div className="flex flex-col items-center mt-12 justify-center">
                        <div className="text-center flex flex-col items-center">
                            <p className="mb-4 font-bold uppercase text-xs tracking-widest">Ditetapkan di Jakarta</p>
                            
                            {/* Fixed Signature */}
                            <img 
                                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkUivnct3ZzTlwcEXkmRBACsnkL2UTPXZ8dCGoNjsFMWyf8OKVhyphenhyphenaoA44X8isr8gwWtdi5os_X04gj2mSiC0U5MQC7ANfWo7fBYf-QMCbtJ0Zf0n-zcwmA8l4q4UDRjsE0nKZkVxYpby4T/w1200-h630-p-k-no-nu/hasil+scan+1+-+cara+scan+tanda+tangan.jpg"
                                className="h-20 md:h-24 mix-blend-multiply filter contrast-125 mb-4"
                                alt="TTD"
                            />
                            
                            <p className="font-bold border-b border-black inline-block mb-1 uppercase">YASONNA H. LAOLY</p>
                            <p className="text-xs uppercase font-bold text-gray-500">Menteri Hukum & HAM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const IzinEksporPage: React.FC<PageProps> = ({ onBack }) => (
  <div className="bg-gray-100 min-h-screen pt-24 pb-12 font-['Roboto'] font-medium text-gray-800">
    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <button onClick={onBack} className="flex items-center text-[#8B1D1D] mb-8 hover:underline text-sm tracking-widest uppercase font-bold">
            <ArrowLeft className="w-5 h-5 mr-2" /> KEMBALI
        </button>
        <div className="bg-white p-6 md:p-16 shadow-2xl border-l-8 border-blue-900">
             <div className="flex justify-between items-start mb-10 border-b-2 border-black pb-6">
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs_y2_ZAnPzgZY1YEOtij6ARLJWdo78h8vGA&s" 
                    alt="Kemendag" 
                    className="h-12 md:h-16 mix-blend-multiply"
                />
                <div className="text-right">
                    <h2 className="text-sm md:text-lg font-bold text-blue-900">KEMENTERIAN PERDAGANGAN</h2>
                    <p className="text-xs md:text-sm font-bold">REPUBLIK INDONESIA</p>
                </div>
            </div>

            <h1 className="text-xl md:text-2xl font-bold mb-10 text-center uppercase tracking-wide">
                SURAT PERSETUJUAN EKSPOR (SPE)
            </h1>

            <div className="grid grid-cols-[120px_10px_1fr] md:grid-cols-[240px_20px_1fr] gap-y-5 text-xs md:text-base mb-12 font-medium">
                <div>NO. AJU</div> <div className="text-center">:</div> <div className="font-mono bg-gray-100 p-1 inline-block">EKS-2025-01-00892</div>
                <div>PERUSAHAAN</div> <div className="text-center">:</div> <div>PT. GRAHA CITRA PRIMA</div>
                <div>PRODUK</div> <div className="text-center">:</div> <div>TEKSTIL & TPT</div>
                <div>HS CODE</div> <div className="text-center">:</div> <div>5208.11.00</div>
                <div>TUJUAN</div> <div className="text-center">:</div> <div>EU, USA, ASIA</div>
                <div>BERLAKU</div> <div className="text-center">:</div> <div className="text-green-600 font-bold">31 DESEMBER 2030</div>
            </div>

             <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 flex items-start mb-8">
                 <ShieldCheck className="w-8 h-8 text-blue-900 mr-4 flex-shrink-0" />
                 <div>
                     <h4 className="font-bold text-blue-900 mb-2">OTORISASI KHUSUS</h4>
                     <p className="text-xs md:text-sm text-blue-800 leading-relaxed">
                         Perusahaan ini telah memenuhi standar kepatuhan ekspor barang bernilai seni tinggi (Artisan Goods).
                     </p>
                 </div>
             </div>
        </div>
    </div>
  </div>
);

export const ISOPage: React.FC<PageProps> = ({ onBack }) => (
  <div className="bg-gray-100 min-h-screen pt-24 pb-12 font-['Roboto'] font-medium text-gray-800">
    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <button onClick={onBack} className="flex items-center text-[#8B1D1D] mb-8 hover:underline text-sm tracking-widest uppercase font-bold">
            <ArrowLeft className="w-5 h-5 mr-2" /> KEMBALI
        </button>
        <div className="bg-white p-6 md:p-16 shadow-2xl relative overflow-hidden">
             {/* Watermark */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[url('https://i0.wp.com/rhodesprojects.com/wp-content/uploads/2020/02/ISO_9001-2015.jpg?fit=1763%2C1800&ssl=1')] bg-contain bg-no-repeat opacity-5 pointer-events-none grayscale"></div>

            <div className="border-4 border-double border-[#BFA36F] p-4 md:p-8 h-full relative z-10">
                 <div className="flex justify-between items-center mb-12">
                     <img src="https://i0.wp.com/rhodesprojects.com/wp-content/uploads/2020/02/ISO_9001-2015.jpg?fit=1763%2C1800&ssl=1" alt="ISO" className="h-12 md:h-20" />
                     <div className="text-right">
                         <h3 className="text-lg md:text-xl font-bold text-gray-400">CERTIFICATE</h3>
                         <p className="text-[10px] md:text-xs font-bold tracking-widest">QUALITY MANAGEMENT</p>
                     </div>
                 </div>

                 <div className="text-center mb-12">
                     <p className="text-[10px] md:text-sm uppercase tracking-widest mb-4">This is to certify that</p>
                     <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#8B1D1D] mb-4">PT. GRAHA CITRA PRIMA</h2>
                     <p className="text-[10px] md:text-sm uppercase tracking-widest mb-8">Has been assessed and found to conform to:</p>
                     <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">ISO 9001:2015</h1>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 mb-12 border-t border-b border-gray-200 py-6">
                      <div className="text-center md:text-right md:pr-8 md:border-r border-gray-200">
                          <p className="text-xs font-bold uppercase text-gray-500 mb-1">Certificate Number</p>
                          <p className="font-bold text-lg">QMS-ID-2025-8821</p>
                      </div>
                      <div className="hidden md:block w-px bg-gray-200"></div>
                      <div className="text-center md:text-left md:pl-8">
                           <p className="text-xs font-bold uppercase text-gray-500 mb-1">Scope</p>
                          <p className="font-bold text-sm">Export & Luxury Heritage Textiles</p>
                      </div>
                 </div>
            </div>
        </div>
    </div>
  </div>
);

// ----------------------------------------------------------------------
// 4. IMPACT PAGE (EKSPOR GLOBAL & DAMPAK)
// ----------------------------------------------------------------------

export const ImpactPage: React.FC<PageProps> = ({ onBack }) => {
    
    // Helper to get Jakarta Time (WIB)
    const getJakartaTime = (offsetHours: number) => {
        const now = new Date();
        now.setHours(now.getHours() - offsetHours);
        return new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Jakarta'
        }).format(now);
    };

    const [liveChartData, setLiveChartData] = useState(() => {
        // Initialize with random starting data, moving in a somewhat connected path
        const data = [];
        let currentValue = 50;
        for(let i=11; i>=0; i--) {
             // Random walk for initialization
             const change = (Math.random() - 0.5) * 20; 
             currentValue = Math.max(10, Math.min(90, currentValue + change));
             
             data.push({
                 time: getJakartaTime(i),
                 volume: 12000 + Math.floor(Math.random() * 5000),
                 value: currentValue
             });
        }
        return data;
    });

    // --- DATA FOR GLOBAL MARKET BOARD (UPDATED TO RUPIAH & FLAGS) ---
    const ALL_COUNTRIES = [
        { 
            code: "IT", 
            name: "ITALIA (Milan)", 
            flagUrl: "https://flagcdn.com/w80/it.png",
            share: "45.2%", 
            income: "Rp 213.180.000.000", 
            change: "+12.4%" 
        },
        { 
            code: "FR", 
            name: "PERANCIS (Paris)", 
            flagUrl: "https://flagcdn.com/w80/fr.png",
            share: "28.5%", 
            income: "Rp 139.570.000.000", 
            change: "+8.1%" 
        },
        { 
            code: "US", 
            name: "USA (New York)", 
            flagUrl: "https://flagcdn.com/w80/us.png",
            share: "15.1%", 
            income: "Rp 70.550.000.000", 
            change: "+5.3%" 
        },
        { 
            code: "JP", 
            name: "JEPANG (Tokyo)", 
            flagUrl: "https://flagcdn.com/w80/jp.png",
            share: "12.0%", 
            income: "Rp 59.500.000.000", 
            change: "+2.1%" 
        },
        { 
            code: "GB", 
            name: "INGGRIS (London)", 
            flagUrl: "https://flagcdn.com/w80/gb.png",
            share: "10.4%", 
            income: "Rp 47.600.000.000", 
            change: "-1.2%" 
        },
        { 
            code: "AE", 
            name: "UAE (Dubai)", 
            flagUrl: "https://flagcdn.com/w80/ae.png",
            share: "8.8%", 
            income: "Rp 37.400.000.000", 
            change: "+15.7%" 
        },
        { 
            code: "SG", 
            name: "SINGAPURA", 
            flagUrl: "https://flagcdn.com/w80/sg.png",
            share: "7.2%", 
            income: "Rp 33.150.000.000", 
            change: "+1.5%" 
        },
        { 
            code: "CN", 
            name: "CHINA (Shanghai)", 
            flagUrl: "https://flagcdn.com/w80/cn.png",
            share: "6.5%", 
            income: "Rp 30.260.000.000", 
            change: "+4.2%" 
        },
    ];

    const [startIndex, setStartIndex] = useState(0);

    // Effect to cycle through countries
    useEffect(() => {
        const interval = setInterval(() => {
            setStartIndex((prev) => (prev + 1) % ALL_COUNTRIES.length);
        }, 3000); // Shift every 3 seconds
        return () => clearInterval(interval);
    }, []);

    // Create a rotating slice of 7 items
    const visibleCountries = [];
    for (let i = 0; i < 7; i++) {
        visibleCountries.push(ALL_COUNTRIES[(startIndex + i) % ALL_COUNTRIES.length]);
    }

    // Effect for Realistic Chart Fluctuation (Random Walk)
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveChartData(prev => {
                const now = new Date();
                const newTime = new Intl.DateTimeFormat('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit', 
                    timeZone: 'Asia/Jakarta'
                }).format(now);
                
                const lastValue = prev[prev.length - 1].value;
                const change = (Math.random() - 0.5) * 30; 
                let newValue = lastValue + change;
                newValue = Math.max(10, Math.min(95, newValue));

                const newEntry = {
                    time: newTime,
                    volume: 12000 + Math.floor(Math.random() * 5000),
                    value: newValue
                };
                return [...prev.slice(1), newEntry];
            });
        }, 1000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-24 md:pt-32 pb-12 animate-fadeIn font-sans">
             <div className="container mx-auto px-6 lg:px-12">
                 <button onClick={onBack} className="text-[#8B1D1D] font-bold uppercase tracking-widest text-xs mb-8 flex items-center hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
                </button>

                <div className="mb-12">
                     <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-4">Laporan Dampak Ekspor</h1>
                     <p className="text-base md:text-lg text-gray-600 max-w-3xl">Transparansi data real-time mengenai volume perdagangan dan kontribusi ekonomi.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Total Ekspor (YTD)</span>
                            <Globe className="w-5 h-5 text-[#8B1D1D]" />
                        </div>
                        <h3 className="text-3xl font-bold text-black mb-1">Rp 768 M</h3>
                        <span className="text-xs font-bold text-green-600 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +24% YoY</span>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Volume Kain</span>
                            <Package className="w-5 h-5 text-[#8B1D1D]" />
                        </div>
                        <h3 className="text-3xl font-bold text-black mb-1">128K <span className="text-sm font-normal text-gray-500">Yards</span></h3>
                    </div>
                </div>

                {/* NEW GLOBAL MARKET BOARD (Responsive) */}
                <div className="bg-[#111] p-4 md:p-10 rounded-xl shadow-2xl border border-gray-800 mb-16 relative overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
                        <div>
                            <h3 className="font-serif font-bold text-xl md:text-3xl text-white tracking-widest flex items-center">
                                <Globe className="w-5 h-5 md:w-8 md:h-8 mr-3 md:mr-4 text-[#BFA36F]" />
                                BURSA GLOBAL
                            </h3>
                            <p className="text-[10px] md:text-xs text-gray-400 mt-2 font-mono uppercase tracking-widest">
                                Live Update • {new Date().toLocaleTimeString('en-GB')}
                            </p>
                        </div>
                    </div>

                    {/* Desktop Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 text-[#BFA36F] font-mono text-xs uppercase tracking-widest mb-4 px-6 font-bold">
                        <div className="col-span-1">KODE</div>
                        <div className="col-span-4">NEGARA</div>
                        <div className="col-span-2 text-right">SHARE</div>
                        <div className="col-span-3 text-right">INCOME</div>
                        <div className="col-span-2 text-right">TREN</div>
                    </div>

                    {/* Rows Container */}
                    <div className="space-y-3 relative min-h-[400px]">
                         {visibleCountries.map((country, idx) => (
                            <div 
                                key={`${country.code}-${idx}`} 
                                className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-4 text-sm font-mono items-center bg-[#1A1A1A] p-4 md:px-6 rounded-lg border-l-4 border-transparent hover:border-[#BFA36F] transition-all hover:bg-[#222] group animate-fadeIn"
                            >
                                {/* Mobile View: Stacked Card Style */}
                                <div className="md:hidden col-span-2 flex justify-between items-center mb-2">
                                     <div className="flex items-center text-white font-bold">
                                        <img src={country.flagUrl} alt="flag" className="w-6 h-4 object-cover rounded-sm mr-2 shadow-sm" />
                                        {country.name}
                                    </div>
                                    <div className={`font-bold ${country.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                                        {country.change}
                                    </div>
                                </div>
                                <div className="md:hidden col-span-2 flex justify-between text-xs text-gray-400 border-t border-gray-800 pt-2">
                                    <span>Share: {country.share}</span>
                                    <span className="text-[#BFA36F] font-bold">{country.income}</span>
                                </div>

                                {/* Desktop View */}
                                <div className="hidden md:block col-span-1 font-bold text-gray-500 group-hover:text-white transition-colors">{country.code}</div>
                                <div className="hidden md:flex col-span-4 items-center text-white font-bold text-base">
                                    <img 
                                        src={country.flagUrl} 
                                        alt={`${country.name} flag`}
                                        className="w-8 h-6 object-cover rounded-sm mr-4 shadow-sm"
                                    />
                                    <span className="truncate">{country.name}</span>
                                </div>
                                <div className="hidden md:block col-span-2 text-right text-white font-medium">{country.share}</div>
                                <div className="hidden md:block col-span-3 text-right text-[#BFA36F] font-bold tracking-wider">{country.income}</div>
                                <div className={`hidden md:flex col-span-2 justify-end items-center font-bold ${country.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                                    {country.change.includes('+') ? <TrendingUp className="w-4 h-4 mr-2"/> : <TrendingDown className="w-4 h-4 mr-2"/>}
                                    {country.change}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* News Archive Section */}
                <div className="mt-20 border-t border-gray-200 pt-16">
                    <h3 className="font-serif font-bold text-3xl md:text-4xl mb-12 text-black leading-tight">Berita Terkini</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {NEWS_ITEMS.map((item) => (
                            <div key={item.id} className="group cursor-pointer flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                                <div className="relative overflow-hidden aspect-[4/5] w-full">
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[10%] group-hover:grayscale-0" 
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h4 className="font-serif font-bold text-xl mb-3 text-black group-hover:text-[#8B1D1D] transition-colors line-clamp-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-600 mb-6 leading-relaxed font-medium text-sm line-clamp-3">
                                        {item.description}
                                    </p>
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
// 5. GALA PAGE & REGISTER PAGE (Simple Layouts)
// ----------------------------------------------------------------------

export const GalaPage: React.FC<PageProps> = ({ onBack }) => {
    return (
        <div className="bg-black min-h-screen text-white relative">
            <button 
                onClick={onBack} 
                className="absolute top-8 left-8 z-50 text-white font-bold uppercase tracking-widest text-xs flex items-center hover:text-[#BFA36F] transition-colors bg-black/50 p-2 rounded-full"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
            </button>

            {/* Hero Image */}
            <div className="h-screen w-full relative">
                 <img 
                    src="https://i.pinimg.com/1200x/ff/bb/64/ffbb64e0b998a23f6396a6a4c8cf97b2.jpg" 
                    alt="Gucci Gala Dinner" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-24 text-center">
                    <span className="text-[#BFA36F] uppercase tracking-[0.5em] font-bold text-xs mb-6 block animate-fadeIn">Exclusive Invitation</span>
                    <h1 className="text-4xl md:text-8xl font-serif font-bold italic mb-6 animate-fadeIn delay-100">
                        The Equinox Gala
                    </h1>
                    <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-medium tracking-wide leading-relaxed animate-fadeIn delay-200">
                        Malam apresiasi bagi para artisan dan mitra strategis.
                    </p>
                    <button className="border border-[#BFA36F] text-[#BFA36F] px-8 py-3 md:px-12 md:py-4 text-xs font-black uppercase tracking-[0.25em] hover:bg-[#BFA36F] hover:text-black transition-all animate-fadeIn delay-300">
                        RSVP VIA CONCIERGE
                    </button>
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
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 relative z-10">Bergabung dengan Ekosistem Mewah</h2>
                        <ul className="space-y-4 relative z-10">
                            <li className="flex items-center text-sm font-bold"><CheckCircle className="w-4 h-4 text-[#BFA36F] mr-3" /> Akses Pasar Eropa</li>
                            <li className="flex items-center text-sm font-bold"><CheckCircle className="w-4 h-4 text-[#BFA36F] mr-3" /> Sertifikasi Internasional</li>
                        </ul>
                    </div>
                    
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <div className="text-center mb-8">
                             <h3 className="text-xl font-bold text-black mb-2">Formulir Pendaftaran</h3>
                             <p className="text-xs text-gray-500">Isi data dasar untuk memulai percakapan</p>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Nama Pemilik</label>
                                <input type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#8B1D1D] transition-colors bg-transparent" placeholder="Nama Lengkap" />
                            </div>
                            
                            <button 
                                onClick={openWhatsAppRegistration}
                                className="w-full bg-[#8B1D1D] text-white py-4 mt-4 text-sm font-black uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-lg"
                            >
                                Lanjut ke WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
