
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

// Jawaban Cadangan (Fallback) yang LEBIH NATURAL & MANUSIAWI
const FALLBACK_RESPONSES = {
  greeting: "Salam hangat. Selamat datang di Gucci Indonesia Export Hub. Saya di sini untuk membantu Anda menelusuri koleksi warisan kami atau peluang kemitraan global. Adakah yang bisa saya jelaskan untuk Anda hari ini? (Untuk respon instan, silakan hubungi Customer Service kami).",
  batik: "Koleksi 'Batik Renaissance' kami adalah wujud cinta pada wastra nusantara. Kami memadukan motif sakral seperti Mega Mendung dan Parang dengan estetika Florence. Setiap helai kain memiliki narasi filosofis yang mendalam. Silakan hubungi Customer Service kami untuk melihat katalog lengkapnya.",
  mitra: "Kami sangat menghargai minat Anda. Program Mitra Butik dirancang untuk mengangkat pengrajin lokal ke panggung dunia dengan standar kualitas Italia. Kami mencari partner yang memiliki dedikasi pada detail. Untuk diskusi lebih lanjut mengenai syarat bergabung, silakan hubungi Customer Service kami.",
  daftar: "Pintu kami selalu terbuka untuk talenta terbaik. Proses pendaftaran melibatkan kurasi untuk memastikan standar kualitas ekspor. Mari kita bicarakan langkah selanjutnya, silakan hubungi Customer Service kami untuk panduan pendaftaran.",
  lokasi: "Saat ini, mitra terpilih kami tersebar di pusat-pusat kebudayaan seperti Yogyakarta, Pekalongan, dan Cirebon. Kami mengundang Anda untuk melihat langsung proses kreatif ini. Untuk jadwal kunjungan atau lokasi detail, silakan hubungi Customer Service kami.",
  legality: "Kami mengerti kehati-hatian Anda. Portal ini adalah representasi digital RESMI dari PT. Graha Citra Prima. Operasional kami dilindungi payung hukum SK Kemenkumham No. AHU-0058932.AH.01.01.Tahun 2025 dengan kantor pusat di Menteng. Kepercayaan Anda adalah prioritas kami. Silakan hubungi Customer Service kami untuk verifikasi dokumen legalitas.",
  default: "Pertanyaan yang menarik. Izinkan kami memberikan penjelasan yang lebih komprehensif dan personal mengenai hal tersebut. Silakan hubungi Customer Service kami melalui WhatsApp agar kami dapat melayani Anda dengan lebih baik."
};

// Fungsi Logika Sederhana untuk mencocokkan kata kunci
const getFallbackResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  // Logika Deteksi Topik
  if (lowerMsg.includes('halo') || lowerMsg.includes('hi') || lowerMsg.includes('pagi') || lowerMsg.includes('siang') || lowerMsg.includes('malam')) return FALLBACK_RESPONSES.greeting;
  
  // Deteksi Pertanyaan Keamanan/Legalitas (Penipuan, Resmi, Asli, Scam)
  if (lowerMsg.includes('tipu') || lowerMsg.includes('bohong') || lowerMsg.includes('resmi') || lowerMsg.includes('asli') || lowerMsg.includes('palsu') || lowerMsg.includes('scam') || lowerMsg.includes('aman') || lowerMsg.includes('legal')) {
    return FALLBACK_RESPONSES.legality;
  }

  if (lowerMsg.includes('batik') || lowerMsg.includes('koleksi') || lowerMsg.includes('baju') || lowerMsg.includes('produk') || lowerMsg.includes('harga')) return FALLBACK_RESPONSES.batik;
  if (lowerMsg.includes('mitra') || lowerMsg.includes('partner') || lowerMsg.includes('kerjasama') || lowerMsg.includes('usaha') || lowerMsg.includes('bisnis')) return FALLBACK_RESPONSES.mitra;
  if (lowerMsg.includes('daftar') || lowerMsg.includes('gabung') || lowerMsg.includes('register') || lowerMsg.includes('cara') || lowerMsg.includes('syarat')) return FALLBACK_RESPONSES.daftar;
  if (lowerMsg.includes('lokasi') || lowerMsg.includes('alamat') || lowerMsg.includes('dimana') || lowerMsg.includes('kantor')) return FALLBACK_RESPONSES.lokasi;
  
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
          systemInstruction: `Anda adalah "Heritage Concierge" (Asisten Pribadi) dari Gucci Indonesia Export (PT. Graha Citra Prima).
          
          Karakter & Gaya Bicara Anda:
          - Elegan, Hangat, dan Berwawasan Luas (Seperti seorang kurator seni atau manajer butik mewah).
          - JANGAN kaku seperti robot. Gunakan bahasa Indonesia yang mengalir, sopan, dan persuasif.
          - Berikan penjelasan yang cukup rinci (naratif) namun tetap mudah dipahami.
          
          Misi Anda:
          1. Menjawab pertanyaan pengguna dengan sentuhan personal. Berikan konteks budaya atau sejarah jika relevan.
          2. Menjelaskan bahwa kolaborasi ini mengangkat Batik ke level 'High Fashion' dunia.
          3. Meyakinkan pengguna tentang LEGALITAS perusahaan (PT. Graha Citra Prima, SK Kemenkumham, Kantor Menteng) dengan nada yang tenang dan profesional jika mereka ragu.
          
          STRUKTUR JAWABAN (PENTING):
          - Mulailah dengan sapaan atau apresiasi atas pertanyaan mereka.
          - Jelaskan jawaban inti dengan gaya bercerita (storytelling).
          - WAJIB MENUTUP setiap respon dengan ajakan halus untuk menghubungi Customer Service via WhatsApp untuk tindakan selanjutnya (pendaftaran, katalog, atau verifikasi).

          Contoh Gaya Bicara:
          "Tentu, sebuah pertanyaan yang sangat bagus. Batik Mega Mendung yang kami gunakan..."
          "Kami sangat memahami kekhawatiran Anda. Sebagai entitas korporat resmi di bawah PT. Graha Citra Prima..."
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
  }

  // 2. Gunakan Jawaban Statis (Fallback) jika AI gagal atau tidak ada Key
  return getFallbackResponse(userMessage);
};
