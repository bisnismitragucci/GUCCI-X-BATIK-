
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
  
  // PENJELASAN LEGALITAS / ANTI-PENIPUAN (UPDATED: LEBIH TEGAS & EMPATIK)
  legality: "Kami mengerti kekhawatiran Anda mengenai maraknya penipuan online. Kepercayaan Anda adalah prioritas kami.\n\n**Klarifikasi Resmi Gucci Indonesia:**\n1. **Bukan Penipuan**: Kami adalah PT. GRAHA CITRA PRIMA, entitas resmi berbadan hukum.\n2. **Legalitas Sah**: Izin kami tercatat di Kemenkumham (AHU-0058932.AH.01.01.Tahun 2025).\n3. **Kantor Fisik**: Anda dapat memverifikasi keberadaan kami secara langsung di Gedung Optik Tunggal, Menteng, Jakarta Pusat.\n\nKami tidak pernah meminta transfer ke rekening pribadi. Segala transaksi menggunakan rekening perusahaan resmi.",
  
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
  
  // Deteksi Topik Legalitas/Penipuan (DIPERKUAT)
  if (lowerMsg.match(/(tipu|bohong|resmi|asli|palsu|scam|aman|legal|hukum|pt|graha|kemenkumham|hoax|bodong)/)) {
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

          TONE OF VOICE:
          - Profesional, Elegan, namun Empatik.
          - Gunakan Bahasa Indonesia baku yang mewah.

          INSTRUKSI KHUSUS UNTUK TOPIK PENIPUAN/KEAMANAN:
          Jika pengguna bertanya apakah ini "Penipuan", "Scam", atau "Bohong", Anda WAJIB memberikan klarifikasi yang menenangkan dan tegas:
          1. Jawab dengan empati: "Kami sangat memahami kekhawatiran Anda di era digital ini."
          2. Tegaskan Legalitas: Sebutkan nama PT. GRAHA CITRA PRIMA dan No SK Kemenkumham (AHU-0058932.AH.01.01.Tahun 2025).
          3. Bukti Fisik: Tekankan bahwa kantor fisik ada di Menteng, Jakarta Pusat dan terbuka untuk dikunjungi.
          4. Transparansi: Jelaskan bahwa sistem P4P berbasis data real-time, bukan skema investasi uang.

          KEY POINTS LAIN:
          - Validitas Bisnis: PT. Graha Citra Prima adalah entitas resmi.
          - Sistem P4P: Advertising Pay-for-Performance, bagi hasil dari kinerja ekspor nyata.
          - Pendaftaran: Cukup Nomor HP dan Akun Bisnis Gucci (via CS).

          CLOSING:
          - Selalu arahkan ke WhatsApp Customer Service untuk verifikasi data lebih lanjut.`,
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
