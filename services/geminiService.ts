
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
// Inisialisasi AI hanya jika API Key tersedia
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Jawaban Cadangan (Fallback) jika AI Offline/Error/Tanpa Key
const FALLBACK_RESPONSES = {
  greeting: "Selamat datang di Gucci Indonesia Export Hub! Ada yang bisa kami bantu mengenai koleksi Batik Renaissance atau program Kemitraan Butik?",
  batik: "Koleksi 'The Batik Renaissance' adalah perpaduan eksklusif motif ikonik Gucci Flora dengan corak batik klasik (Mega Mendung, Parang) yang dikurasi dari pengrajin terbaik Nusantara.",
  mitra: "Program 'Mitra Butik' kami memberdayakan lebih dari 500 pengrajin lokal untuk menembus pasar fashion global dengan standar kualitas Italia. Kami menyediakan sertifikasi dan akses ekspor.",
  daftar: "Pendaftaran mitra baru dibuka setiap kuartal. Anda dapat mengajukan profil sanggar/butik Anda melalui menu 'Register' di website ini atau langsung menghubungi tim kurasi kami via WhatsApp.",
  lokasi: "Headquarters kami berada di Menteng, Jakarta Pusat. Namun, mitra artisan kami tersebar di Yogyakarta, Pekalongan, Cirebon, Solo, dan Bali.",
  default: "Pertanyaan yang menarik! Untuk penjelasan lebih detail dan personal, Customer Service Prioritas kami siap membantu Anda langsung via WhatsApp. Silakan klik tombol hijau di bawah."
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
          systemInstruction: `You are a sophisticated virtual assistant for "Gucci x Indonesia Export".
          Answer in Indonesian (Bahasa Indonesia).
          Keep answers short, elegant, and helpful (max 2 sentences).
          Your goal is to explain the collaboration between Gucci and Indonesian Batik artisans.
          If the question is complicated, politely suggest contacting Customer Service via WhatsApp.`,
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
