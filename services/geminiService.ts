
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
// Inisialisasi AI hanya jika API Key tersedia
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Jawaban Cadangan (Fallback) yang SELALU mengarahkan ke CS
const FALLBACK_RESPONSES = {
  greeting: "Selamat datang di Gucci Indonesia Export Hub! Kami siap membantu Anda. Silakan hubungi Customer Service kami untuk informasi lebih lanjut mengenai koleksi atau kemitraan.",
  batik: "Koleksi Batik Renaissance kami memadukan motif ikonik Gucci dengan warisan budaya Nusantara. Untuk katalog lengkap dan detail produk, silakan hubungi Customer Service kami untuk informasi lebih lanjut.",
  mitra: "Program Mitra Butik memberdayakan pengrajin lokal untuk pasar global. Jika Anda berminat bergabung, silakan hubungi Customer Service kami untuk informasi lebih lanjut dan panduan pendaftaran.",
  daftar: "Pendaftaran mitra dibuka secara berkala. Untuk persyaratan dan bantuan pengisian formulir, silakan hubungi Customer Service kami untuk informasi lebih lanjut.",
  lokasi: "Mitra kami tersebar di Yogyakarta, Pekalongan, dan Cirebon. Untuk lokasi spesifik dan kunjungan, silakan hubungi Customer Service kami untuk informasi lebih lanjut.",
  default: "Terima kasih atas pertanyaan Anda. Untuk penjelasan yang lebih rinci dan personal, silakan hubungi Customer Service kami untuk informasi lebih lanjut."
};

// Fungsi Logika Sederhana untuk mencocokkan kata kunci
const getFallbackResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('halo') || lowerMsg.includes('hi') || lowerMsg.includes('pagi') || lowerMsg.includes('siang')) return FALLBACK_RESPONSES.greeting;
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
          systemInstruction: `Anda adalah asisten virtual profesional untuk "Gucci x Indonesia Export".
          
          Tugas utama Anda:
          1. Jawab pertanyaan pengguna dalam Bahasa Indonesia dengan singkat, elegan, dan sopan (maksimal 2 kalimat).
          2. Fokus pada topik: Kolaborasi Batik, Ekspor, dan Kemitraan Butik.
          
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
    console.log("Gemini API Key missing. Using standard responses.");
  }

  // 2. Gunakan Jawaban Statis (Fallback) jika AI gagal atau tidak ada Key
  return getFallbackResponse(userMessage);
};
