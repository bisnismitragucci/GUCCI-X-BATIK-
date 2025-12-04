
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

// Inisialisasi AI dengan aman
let ai: GoogleGenAI | null = null;
try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.warn("Failed to initialize Gemini Client:", error);
}

// ---------------------------------------------------------------------------
// PERPUSTAKAAN JAWABAN CERDAS (FALLBACK EXPLANATIONS)
// Digunakan jika AI belum aktif, agar user tetap mendapat PENJELASAN RINCI.
// ---------------------------------------------------------------------------
const FALLBACK_RESPONSES = {
  greeting: "Salam hangat dari Gucci Indonesia Export Hub. Saya adalah 'Heritage Concierge' Anda.\n\nSaya siap membantu menjelaskan:\n1. Sistem Advertising P4P\n2. Cara Pendaftaran Mitra\n3. Legalitas Resmi Perusahaan\n\nApa yang ingin Anda ketahui?",
  
  // PENJELASAN LEGALITAS / ANTI-PENIPUAN
  legality: "Kami mengerti kehati-hatian Anda. Keamanan adalah prioritas kami.\n\nLegalitas Resmi:\n1. **Entitas**: PT. GRAHA CITRA PRIMA (Distributor Resmi).\n2. **Izin**: SK Kemenkumham No. AHU-0058932.AH.01.01.Tahun 2025.\n3. **Sistem**: Kami menggunakan sistem manajemen **Advertising P4P** yang transparan dan terukur.\n\nKantor kami berlokasi di Menteng, Jakarta Pusat. Silakan hubungi Customer Service untuk verifikasi dokumen fisik.",
  
  // PENJELASAN PRODUK BATIK
  batik: "Koleksi **'The Batik Renaissance'** adalah perpaduan mahakarya Batik Tulis halus dengan standar *High Fashion* Italia.\n\nSetiap karya dikurasi menggunakan sistem Advertising P4P untuk memastikan eksposur maksimal di pasar global. Motif yang kami angkat seperti Mega Mendung dan Parang Barong memiliki nilai filosofis tinggi dan pengerjaan 3-6 bulan.",
  
  // PENJELASAN KEMITRAAN & SISTEM P4P
  mitra: "Program kemitraan kami menggunakan sistem **Advertising P4P (Pay for Performance)**.\n\nApa artinya?\nSistem ini menjamin bahwa setiap mitra butik mendapatkan eksposur dan bagi hasil yang adil berdasarkan kinerja ekspor nyata, bukan sekadar janji. Kami memberikan akses pasar global, sementara Anda fokus pada kualitas karya.",
  
  // PENJELASAN PENDAFTARAN (WAJIB KE CS)
  daftar: "Terima kasih atas minat Anda untuk bergabung.\n\n**Untuk mendaftar, silakan hubungi Customer Service kami.**\n\nProses pendaftaran meliputi verifikasi data usaha dan penjelasan lebih rinci mengenai sistem Advertising P4P yang kami gunakan. Tim CS kami siap memandu Anda langkah demi langkah via WhatsApp.",
  
  // PENJELASAN LOKASI
  lokasi: "Kantor Pusat kami berada di **Gedung Optik Tunggal, Jl. Cikini Raya No. 89, Menteng, Jakarta Pusat**.\n\nKami juga memiliki jaringan mitra butik (Advertising P4P Network) yang tersebar di Yogyakarta, Solo, Pekalongan, dan Bali.",
  
  // DEFAULT RESPONSE
  default: "Untuk informasi lebih lanjut mengenai hal tersebut, atau jika Anda ingin mendaftar, **silakan hubungi Customer Service**.\n\nTim kami akan menjelaskan secara rinci tentang sistem Advertising P4P dan peluang kerjasama yang tersedia."
};

// Fungsi Deteksi Topik (Keyword Matching)
const getFallbackResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  // Deteksi Topik Pendaftaran (PRIORITAS TINGGI)
  if (lowerMsg.match(/(daftar|register|gabung|join|cara|syarat|form)/)) {
    return FALLBACK_RESPONSES.daftar;
  }

  // Deteksi Topik Sistem/P4P
  if (lowerMsg.match(/(sistem|cara kerja|mekanisme|aturan|p4p|advertising)/)) {
    return FALLBACK_RESPONSES.mitra;
  }
  
  // Deteksi Topik Legalitas/Penipuan
  if (lowerMsg.match(/(tipu|bohong|resmi|asli|palsu|scam|aman|legal|hukum|pt|graha|kemenkumham)/)) {
    return FALLBACK_RESPONSES.legality;
  }

  // Deteksi Topik Salam
  if (lowerMsg.match(/(halo|hi|pagi|siang|malam|sore|assalam|permisi|test|tes|hai)/)) {
    return FALLBACK_RESPONSES.greeting;
  }
  
  // Deteksi Topik Produk/Batik
  if (lowerMsg.match(/(batik|koleksi|baju|produk|harga|jual|beli|sutra|kain|motif|model)/)) {
    return FALLBACK_RESPONSES.batik;
  }

  // Deteksi Topik Mitra/Kerjasama
  if (lowerMsg.match(/(mitra|partner|kerjasama|usaha|bisnis|suplier|supplier)/)) {
    return FALLBACK_RESPONSES.mitra;
  }

  // Deteksi Topik Lokasi
  if (lowerMsg.match(/(lokasi|alamat|dimana|kantor|posisi|kota|daerah|tempat)/)) {
    return FALLBACK_RESPONSES.lokasi;
  }
  
  return FALLBACK_RESPONSES.default;
};

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  // 1. Prioritas Utama: Coba AI Gemini
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: {
          systemInstruction: `Anda adalah "Heritage Concierge" dari Gucci Indonesia Export (PT. Graha Citra Prima).
          
          POIN KUNCI INFORMASI:
          1. **Sistem Bisnis**: Kami menggunakan sistem **"Advertising P4P"**. Jelaskan ini sebagai keunggulan transparansi.
          2. **Pendaftaran**: Jawab dengan kalimat: **"Untuk mendaftar, hubungi Customer Service."**
          3. **Legalitas**: PT Graha Citra Prima adalah resmi dan berizin Kemenkumham.
          
          GAYA BICARA:
          Profesional, singkat, padat, dan meyakinkan.
          
          INSTRUKSI:
          - Jika user bertanya "cara daftar?", arahkan ke Customer Service.
          - Jika user bertanya "sistemnya apa?", jawab "Advertising P4P".
          - Selalu akhiri dengan ajakan ke WhatsApp CS.`,
        }
      });
      
      if (response.text) {
        return response.text;
      }
    } catch (error) {
      console.warn("Gemini AI Error (Switching to Smart Fallback):", error);
    }
  }

  // 2. Jika AI Gagal/Tidak Ada Key, gunakan Jawaban Penjelasan Rinci (Fallback)
  return getFallbackResponse(userMessage);
};
