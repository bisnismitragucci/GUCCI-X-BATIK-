
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
  greeting: "Salam hangat dari Gucci Indonesia Export Hub. Saya adalah 'Heritage Concierge' Anda.\n\nSaya siap memandu Anda mengenai:\n1. **Program Kemitraan** (Sistem P4P)\n2. **Koleksi Batik Renaissance**\n3. **Legalitas Resmi** (PT. Graha Citra Prima)\n\nBagaimana saya dapat melayani Anda hari ini?",
  
  // PENJELASAN LEGALITAS / ANTI-PENIPUAN
  legality: "Kami menghargai kehati-hatian Anda. Integritas adalah pilar utama kami.\n\nLegalitas Resmi:\n1. **Entitas**: PT. GRAHA CITRA PRIMA (Distributor Resmi).\n2. **Izin**: SK Kemenkumham No. AHU-0058932.AH.01.01.Tahun 2025.\n3. **Sistem**: Kami menggunakan sistem manajemen **Advertising P4P** yang transparan.\n\nDokumen fisik dapat diverifikasi di kantor pusat kami: Menteng, Jakarta Pusat.",
  
  // PENJELASAN PRODUK BATIK
  batik: "Koleksi **'The Batik Renaissance'** adalah perpaduan mahakarya Batik Tulis halus dengan standar *High Fashion* Italia.\n\nSetiap karya dikurasi menggunakan sistem Advertising P4P untuk memastikan eksposur maksimal di pasar global. Motif seperti Mega Mendung dan Parang Barong digoreskan di atas sutra Italia terbaik.",
  
  // PENJELASAN KEMITRAAN & SISTEM P4P
  mitra: "Program kemitraan kami menggunakan sistem revolusioner **Advertising P4P (Pay for Performance)**.\n\n**Keunggulan Utama:**\nSistem ini menjamin transparansi. Mitra butik mendapatkan bagi hasil yang adil berdasarkan kinerja ekspor nyata (real-time export data). Kami membuka akses langsung ke rantai pasok global Gucci.",
  
  // PENJELASAN PENDAFTARAN (UPDATED: SYARAT SIMPEL)
  daftar: "Bergabunglah dengan ekosistem kami secara eksklusif.\n\n**Syarat Pendaftaran Mitra:**\n1. **Nomor HP** aktif.\n2. **Akun Bisnis Gucci** (Dibuat melalui CS).\n\nTidak ada biaya tersembunyi. Silakan klik tombol WhatsApp untuk dipandu oleh agen prioritas kami.",
  
  // PENJELASAN LOKASI
  lokasi: "Kantor Pusat kami berlokasi strategis di:\n**Gedung Optik Tunggal, Jl. Cikini Raya No. 89, Menteng, Jakarta Pusat**.\n\nKami juga memiliki jaringan 'Artisan Hub' di Yogyakarta, Solo, Pekalongan, dan Bali yang dapat Anda kunjungi.",
  
  // DEFAULT RESPONSE
  default: "Terima kasih atas pertanyaan Anda. Untuk penjelasan mendalam mengenai hal tersebut, saya sarankan Anda terhubung langsung dengan **Customer Service Priority** kami.\n\nTim kami siap menjelaskan detail teknis sistem Advertising P4P dan peluang emas ini."
};

// Fungsi Deteksi Topik (Keyword Matching)
const getFallbackResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  // Deteksi Topik Pendaftaran (PRIORITAS TINGGI)
  if (lowerMsg.match(/(daftar|register|gabung|join|cara|syarat|form|akun|hp)/)) {
    return FALLBACK_RESPONSES.daftar;
  }

  // Deteksi Topik Sistem/P4P
  if (lowerMsg.match(/(sistem|cara kerja|mekanisme|aturan|p4p|advertising|bagi hasil)/)) {
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
          systemInstruction: `Anda adalah "Heritage Concierge" dari Gucci Indonesia Export (PT. Graha Citra Prima), sebuah entitas bisnis mewah yang menjembatani pengrajin lokal dengan pasar global.

          TONE OF VOICE:
          - Profesional, Elegan, Mewah, namun Ramah dan Membantu.
          - Gunakan bahasa Indonesia yang baku namun luwes (korporat luxury).
          
          INFORMASI KUNCI (DO NOT HALLUCINATE):
          1. **Syarat Pendaftaran**: SANGAT MUDAH. Hanya butuh **Nomor HP** dan membuat **Akun Bisnis Gucci**.
          2. **Model Bisnis**: "Advertising P4P" (Pay for Performance). Transparan dan berbasis kinerja.
          3. **Legalitas**: PT Graha Citra Prima resmi berizin Kemenkumham (AHU-0058932.AH.01.01.Tahun 2025) dan berkantor di Menteng, Jakarta Pusat.
          
          SKENARIO KHUSUS:
          - Jika user bertanya "cara daftar?", jawab: "Prosesnya eksklusif namun sederhana. Anda hanya memerlukan Nomor HP aktif dan pembuatan Akun Bisnis Gucci." lalu arahkan ke CS.
          - Jika user ragu (scam/penipuan), jawab dengan tegas dan tenang mengenai legalitas resmi dan tawarkan verifikasi dokumen fisik di kantor.
          
          CALL TO ACTION:
          - Selalu akhiri dengan: "Silakan klik tombol di bawah untuk terhubung dengan Customer Service kami via WhatsApp untuk panduan lebih lanjut."`,
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
