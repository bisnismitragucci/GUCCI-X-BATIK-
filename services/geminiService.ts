
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

// Inisialisasi AI dengan aman
// Menggunakan try-catch saat inisialisasi untuk mencegah crash di browser jika env var bermasalah
let ai: GoogleGenAI | null = null;
try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.warn("Failed to initialize Gemini Client:", error);
}

// Jawaban Cadangan (Fallback) yang SELALU mengarahkan ke CS
const FALLBACK_RESPONSES = {
  greeting: "Selamat datang di Gucci Indonesia Export Hub! Kami siap membantu Anda. Silakan hubungi Customer Service kami untuk informasi lebih lanjut mengenai koleksi atau kemitraan.",
  batik: "Koleksi Batik Renaissance kami memadukan motif ikonik Gucci dengan warisan budaya Nusantara. Untuk katalog lengkap dan detail produk, silakan hubungi Customer Service kami untuk informasi lebih lanjut.",
  mitra: "Program Mitra Butik memberdayakan pengrajin lokal untuk pasar global. Jika Anda berminat bergabung, silakan hubungi Customer Service kami untuk informasi lebih lanjut dan panduan pendaftaran.",
  daftar: "Pendaftaran mitra dibuka secara berkala. Untuk persyaratan dan bantuan pengisian formulir, silakan hubungi Customer Service kami untuk informasi lebih lanjut.",
  lokasi: "Mitra kami tersebar di Yogyakarta, Pekalongan, dan Cirebon. Untuk lokasi spesifik dan kunjungan, silakan hubungi Customer Service kami untuk informasi lebih lanjut.",
  legality: "Portal ini adalah platform RESMI dari PT. Graha Citra Prima (Gucci Indonesia). Kami beroperasi secara legal dengan SK Kemenkumham No. AHU-0058932.AH.01.01.Tahun 2025 dan berkantor pusat di Menteng, Jakarta Pusat. Tidak ada unsur penipuan dalam program kemitraan ini. Silakan hubungi Customer Service kami untuk informasi lebih lanjut dan verifikasi dokumen.",
  default: "Terima kasih atas pertanyaan Anda. Untuk penjelasan yang lebih rinci dan personal, silakan hubungi Customer Service kami untuk informasi lebih lanjut."
};

// Fungsi Logika Sederhana untuk mencocokkan kata kunci
const getFallbackResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  // Logika Deteksi Topik
  if (lowerMsg.includes('halo') || lowerMsg.includes('hi') || lowerMsg.includes('pagi') || lowerMsg.includes('siang')) return FALLBACK_RESPONSES.greeting;
  
  // Deteksi Pertanyaan Keamanan/Legalitas (Penipuan, Resmi, Asli, Scam)
  if (lowerMsg.includes('tipu') || lowerMsg.includes('bohong') || lowerMsg.includes('resmi') || lowerMsg.includes('asli') || lowerMsg.includes('palsu') || lowerMsg.includes('scam') || lowerMsg.includes('aman') || lowerMsg.includes('legal')) {
    return FALLBACK_RESPONSES.legality;
  }

  if (lowerMsg.includes('batik') || lowerMsg.includes('koleksi') || lowerMsg.includes('baju') || lowerMsg.includes('produk')) return FALLBACK_RESPONSES.batik;
  if (lowerMsg.includes('mitra') || lowerMsg.includes('partner') || lowerMsg.includes('kerjasama') || lowerMsg.includes('usaha')) return FALLBACK_RESPONSES.mitra;
  if (lowerMsg.includes('daftar') || lowerMsg.includes('gabung') || lowerMsg.includes('register') || lowerMsg.includes('cara')) return FALLBACK_RESPONSES.daftar;
  if (lowerMsg.includes('lokasi') || lowerMsg.includes('alamat') || lowerMsg.includes('dimana')) return FALLBACK_RESPONSES.lokasi;
  
  return FALLBACK_RESPONSES.default;
};

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  // 1. Coba gunakan AI Gemini jika tersedia
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: {
          systemInstruction: `Anda adalah asisten virtual profesional untuk "Gucci x Indonesia Export" (PT. Graha Citra Prima).
          
          Tugas utama Anda:
          1. Jawab pertanyaan pengguna dalam Bahasa Indonesia dengan singkat, elegan, dan sangat meyakinkan.
          2. Fokus pada topik: Legalitas Perusahaan, Kolaborasi Batik, dan Ekspor.
          
          PENTING - JIKA DITANYA TENTANG PENIPUAN / RESMI / KEASLIAN:
          - Tegaskan bahwa ini adalah platform RESMI dan SAH secara hukum.
          - Sebutkan bukti: SK Kemenkumham (AHU-0058932), ISO 9001:2015, dan Izin Kemendag.
          - Sebutkan lokasi: Kantor fisik di Menteng, Jakarta Pusat.
          - Yakinkan pengguna bahwa program ini dilindungi oleh regulasi pemerintah Indonesia.

          ATURAN WAJIB (HARUS DIPATUHI):
          Setiap jawaban Anda HARUS diakhiri dengan kalimat:
          "Silakan hubungi Customer Service kami untuk informasi lebih lanjut."
          `,
        }
      });
      
      if (response.text) {
        return response.text;
      }
    } catch (error) {
      console.warn("Gemini AI Error (Switching to Fallback Mode):", error);
      // Jika error, lanjut ke logika fallback di bawah
    }
  } else {
    // Silent log agar tidak mengganggu user di console
    // console.log("Gemini API Key missing/invalid."); 
  }

  // 2. Gunakan Jawaban Statis (Fallback) jika AI gagal atau tidak ada Key
  return getFallbackResponse(userMessage);
};
