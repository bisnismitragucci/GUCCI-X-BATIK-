
import { NavItem } from './types';

export const TOP_NAV_ITEMS: NavItem[] = [];

export const NEWS_ITEMS = [
  {
    id: 1,
    date: '24 Des 2025',
    title: 'Peluncuran Gucci Flora x Mega Mendung',
    description: 'Koleksi kapsul yang memadukan estetika pesisir Cirebon dengan sensibilitas desain Florence untuk pasar Eropa.',
    imageUrl: 'https://i.pinimg.com/736x/22/31/fe/2231fe5b00ce380d533627558a9d1407.jpg'
  },
  {
    id: 2,
    date: '15 Des 2025',
    title: 'Sertifikasi Internasional untuk 100 Butik',
    description: 'Seratus butik lokal resmi mendapatkan standar "Gucci Artisan Tier" untuk ekspor langsung ke butik-butik di Paris dan Milan.',
    imageUrl: 'https://i.pinimg.com/1200x/ec/f6/5e/ecf65e35d8dcdaa9faba98a1ba7d2aad.jpg'
  },
  {
    id: 3,
    date: '10 Des 2025',
    title: 'KTT Ekspor Warisan Budaya',
    description: 'Forum strategis membahas peta jalan ekspor tekstil wastra nusantara menuju pasar luxury global tahun 2026.',
    imageUrl: 'https://kaltimtoday.co/wp-content/uploads/2023/04/asean-indonesia-2023-sumber-asean2023id.jpg'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ibu Ratna Sarumpaet',
    role: 'Pemilik "Batik Pesisir Atelier"',
    location: 'Pekalongan, Jawa Tengah',
    quote: "Program legalitas terpadu Gucci memudahkan kami menembus pasar Eropa tanpa hambatan birokrasi. Kini batik tulis kami dipajang di Milan.",
    imageUrl: 'https://i.pinimg.com/1200x/ed/6b/86/ed6b864cdc65ccf15fb465eed2df5bdf.jpg',
    impact: 'Ekspor +300%'
  },
  {
    id: 2,
    name: 'Bapak Hartono',
    role: 'Pengrajin Kulit & Logam',
    location: 'Garut, Jawa Barat',
    quote: "Standar kualitas Italia sangat ketat, namun itu yang membuat kerajinan kami naik kelas. Kami bukan lagi produsen lokal, kami artisan global.",
    imageUrl: 'https://cdn0-production-images-kly.akamaized.net/LE41M4on4to_bfNTynCUiYHRVpA=/469x625/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4684482/original/071997000_1702444502-Robert_Hartono.jpeg',
    impact: '12 Kemitraan EU'
  },
  {
    id: 3,
    name: 'Sari Wulandari',
    role: 'Desainer Perhiasan Perak',
    location: 'Celuk, Bali',
    quote: "Kolaborasi ini menjaga jiwa budaya kami tetap hidup. Desain tradisional Bali kini menjadi aksen mewah dalam koleksi liburan Gucci.",
    imageUrl: 'https://i.pinimg.com/736x/c0/f7/cc/c0f7ccfef225fa30f5def346a5083b53.jpg',
    impact: 'Penjualan Terbaik 2025'
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    imageUrl: 'https://i.pinimg.com/1200x/78/0c/b7/780cb766e39aea0cac8cd54598dc3f3d.jpg',
    title: 'THE BATIK RENAISSANCE',
    subtitle: 'Kolaborasi eksklusif motif Flora ikonik Gucci dengan corak batik klasik dari pengrajin di seluruh INDONESIA.',
    cta: 'LIHAT KOLEKSI'
  },
  {
    id: 2,
    imageUrl: 'https://i.pinimg.com/1200x/12/69/25/126925d65a43ce73e1871b1fb57e27ba.jpg',
    title: 'DARI BUTIK KE DUNIA',
    subtitle: 'Mengangkat 500 Butik UMKM Indonesia menjadi pemasok resmi rantai pasok fashion global berstandar Italia.',
    cta: 'JELAJAHI MITRA'
  },
  {
    id: 3,
    imageUrl: 'https://i.pinimg.com/736x/d3/1c/88/d31c887aba28e7eaaf0391b7da2ced2e.jpg',
    title: 'BRANDING GLOBAL',
    subtitle: 'Membangun citra kemewahan Indonesia di kancah internasional melalui standar kualitas tinggi dan warisan budaya.',
    cta: 'PELAJARI DAMPAK'
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'RENAISSANCE BATIK', href: '#' },
  { label: 'MITRA BUTIK', href: '#' },
  { label: 'EKSPOR GLOBAL', href: '#' },
  { label: 'GALA NATAL', href: '#' },
];

export const TRANSLATIONS = {
  ID: {
    nav: {
      collection: 'RENAISSANCE BATIK',
      partners: 'MITRA BUTIK',
      impact: 'EKSPOR GLOBAL',
      gala: 'GALA NATAL',
      search: 'CARI',
      cs: 'Customer Service',
      newsletter: 'Newsletter'
    },
    hero: {
      cta_collection: 'LIHAT KOLEKSI',
      cta_partners: 'JELAJAHI MITRA',
      cta_impact: 'PELAJARI DAMPAK',
      cta_register: 'DAFTAR SEKARANG'
    }
  },
  EN: {
    nav: {
      collection: 'RENAISSANCE BATIK',
      partners: 'BOUTIQUE PARTNERS',
      impact: 'GLOBAL EXPORT',
      gala: 'CHRISTMAS GALA',
      search: 'SEARCH',
      cs: 'Customer Service',
      newsletter: 'Newsletter'
    },
    hero: {
      cta_collection: 'VIEW COLLECTION',
      cta_partners: 'EXPLORE PARTNERS',
      cta_impact: 'SEE IMPACT',
      cta_register: 'REGISTER NOW'
    }
  },
  IT: {
    nav: {
      collection: 'RINASCIMENTO BATIK',
      partners: 'PARTNER BOUTIQUE',
      impact: 'ESPORTAZIONE GLOBALE',
      gala: 'GALA DI NATALE',
      search: 'CERCA',
      cs: 'Servizio Clienti',
      newsletter: 'Newsletter'
    },
    hero: {
      cta_collection: 'VEDI COLLEZIONE',
      cta_partners: 'ESPLORA PARTNER',
      cta_impact: 'VEDI IMPATTO',
      cta_register: 'REGISTRATI ORA'
    }
  },
  FR: {
    nav: {
      collection: 'RENAISSANCE BATIK',
      partners: 'PARTENAIRES BOUTIQUE',
      impact: 'EXPORTATION MONDIALE',
      gala: 'GALA DE NOËL',
      search: 'CHERCHER',
      cs: 'Service Client',
      newsletter: 'Newsletter'
    },
    hero: {
      cta_collection: 'VOIR LA COLLECTION',
      cta_partners: 'EXPLORER LES PARTENAIRES',
      cta_impact: 'VOIR L\'IMPACT',
      cta_register: 'S\'INSCRIRE MAINTENANT'
    }
  },
  JP: {
    nav: {
      collection: 'バティック・ルネサンス',
      partners: 'ブティックパートナー',
      impact: 'グローバル輸出',
      gala: 'クリスマス・ガラ',
      search: '検索',
      cs: 'カスタマーサービス',
      newsletter: 'ニュースレター'
    },
    hero: {
      cta_collection: 'コレクションを見る',
      cta_partners: 'パートナーを探す',
      cta_impact: '影響を見る',
      cta_register: '今すぐ登録'
    }
  },
  CN: {
    nav: {
      collection: '蜡染复兴',
      partners: '精品合作伙伴',
      impact: '全球出口',
      gala: '圣诞晚会',
      search: '搜索',
      cs: '客户服务',
      newsletter: '通讯'
    },
    hero: {
      cta_collection: '查看系列',
      cta_partners: '探索合作伙伴',
      cta_impact: '查看影响',
      cta_register: '立即注册'
    }
  }
};
