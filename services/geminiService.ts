
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
// PERPUSTAKAAN JAWABAN CERDAS (FALLBACK EXPLANATIONS) WITH VARIATIONS
// Digunakan jika AI belum aktif. Menggunakan Array untuk variasi jawaban.
// ---------------------------------------------------------------------------
const FALLBACK_RESPONSES: Record<string, string[]> = {
  greeting: [
    "Salam hangat dari Gucci Indonesia Export Hub. Saya adalah 'Heritage Concierge' Anda. \n\nSaya siap memandu Anda mengenai Program Kemitraan (Sistem P4P), Koleksi Batik Renaissance, atau Legalitas Resmi kami. Apa yang bisa saya bantu?",
    "Selamat datang di layanan eksklusif PT. Graha Citra Prima. Sebagai asisten virtual Anda, saya dapat menjelaskan detail mengenai ekspor batik dan cara bergabung menjadi mitra. Ada yang ingin Anda tanyakan?",
    "Halo, terima kasih telah menghubungi kami. Kami bangga dapat melayani Anda. Silakan tanyakan apa saja mengenai legalitas perusahaan atau mekanisme kerjasama ekspor kami."
  ],
  
  // PENJELASAN LEGALITAS / ANTI-PENIPUAN (SANGAT DETAIL & VARIED)
  legality: [
    "Kami sangat memahami kekhawatiran Anda mengenai maraknya penipuan digital. \n\n**Klarifikasi Resmi:**\nPT. GRAHA CITRA PRIMA adalah entitas yang 100% legal dan terdaftar di Kemenkumham dengan nomor **AHU-0058932.AH.01.01.Tahun 2025**. Kami memiliki kantor fisik di Gedung Optik Tunggal, Menteng, yang terbuka untuk umum. Transparansi adalah fondasi bisnis kami.",
    
    "Terima kasih telah menanyakan hal krusial ini. Keamanan Anda adalah prioritas kami. \n\nMohon diperhatikan bahwa seluruh komunikasi resmi kami hanya melalui saluran terverifikasi. Legalitas kami dapat dicek langsung melalui website AHU Online Kemenkumham. Kami tidak pernah meminta transfer ke rekening pribadi yang tidak dikenal, semua melalui rekening perusahaan resmi.",
    
    "Isu penipuan memang sering terjadi, namun kami menjamin keaslian operasional kami. \n\n1. **Izin Resmi:** Kami memegang Izin Usaha Ekspor dari Kemendag.\n2. **Lokasi Fisik:** Anda diundang untuk memvalidasi keberadaan kantor kami di Menteng, Jakarta Pusat.\n3. **Sistem Terbuka:** Mekanisme P4P kami berbasis data riil ekspor, bukan skema investasi bodong.",

    "Sebagai perusahaan berstandar ISO 9001:2015, integritas adalah nilai utama kami. Kami bukan entitas fiktif. Seluruh legalitas, mulai dari NIB hingga SK Menteri, dapat kami tunjukkan bukti fisiknya jika Anda berkunjung ke kantor pusat kami di Jakarta Pusat."
  ],
  
  // PENJELASAN PRODUK BATIK
  batik: [
    "Koleksi **'The Batik Renaissance'** adalah wujud cinta kami pada wastra nusantara. Kain sutra Italia dipadukan dengan motif Mega Mendung Cirebon dan Parang Barong, menciptakan mahakarya yang kini diperebutkan di Milan dan Paris.",
    
    "Produk unggulan kami fokus pada *High Fashion* yang mengawinkan teknik batik tulis halus tradisional dengan potongan modern khas Gucci. Setiap helai kain melewati proses kurasi selama 3 bulan sebelum diekspor.",
    
    "Kami mengekspor batik tulis dan tenun ikat kualitas premium. Salah satu *masterpiece* kami adalah 'The Cloud Garden Blazer' yang menggunakan pewarna indigo alami dari tanaman lokal, sebuah simbol kemewahan yang berkelanjutan."
  ],
  
  // PENJELASAN KEMITRAAN & SISTEM P4P
  mitra: [
    "Sistem kemitraan kami menggunakan model **Advertising P4P (Pay for Performance)**. \n\nArtinya, keuntungan Anda transparan dan berbasis kinerja. Tidak ada biaya tersembunyi. Kami menyediakan akses pasar, Anda menyediakan dedikasi untuk menjaga kualitas produk sesuai standar Gucci.",
    
    "Dalam ekosistem kami, mitra butik tidak ditinggalkan sendirian. Kami menerapkan sistem bagi hasil yang adil di mana setiap yard kain yang diekspor akan tercatat secara digital. Pendapatan Anda adalah cerminan langsung dari volume ekspor yang berhasil kita capai bersama.",
    
    "Mekanisme kerjasama kami dirancang untuk memberdayakan UMKM. Melalui sistem P4P, kami mengelola pemasaran global dan logistik, sementara Anda fokus pada produksi atau penyediaan stok. Keuntungan dibagikan secara berkala sesuai laporan audit ekspor."
  ],
  
  // PENJELASAN PENDAFTARAN
  daftar: [
    "Proses pendaftaran mitra sangat eksklusif namun mudah. \n\nAnda hanya perlu menghubungi Customer Service kami via WhatsApp untuk verifikasi data diri dan usaha. Tidak ada formulir rumit, tim kami yang akan memandu Anda langkah demi langkah.",
    
    "Ingin bergabung? Silakan klik tombol WhatsApp yang tersedia. Kami memerlukan validasi Nomor HP dan profil singkat usaha Anda untuk pembuatan **Akun Bisnis Gucci**. Slot kemitraan untuk kuartal ini terbatas, jadi kami sarankan untuk segera mendaftar.",
    
    "Pendaftaran dibuka untuk individu maupun pemilik butik. Syarat utamanya adalah komitmen. Hubungi agen prioritas kami sekarang melalui WhatsApp untuk mendapatkan formulir digital dan jadwal wawancara singkat."
  ],
  
  // PENJELASAN LOKASI
  lokasi: [
    "Kantor Pusat operasional kami terletak di jantung kota Jakarta: **Gedung Optik Tunggal, Jl. Cikini Raya No. 89, Menteng, Jakarta Pusat**. Kami menyambut kunjungan Anda pada jam kerja (Senin-Jumat).",
    
    "Anda dapat menemukan kami di kawasan Menteng, Jakarta Pusat, tepatnya di Gedung Optik Tunggal. Selain itu, kami memiliki beberapa sentra artisan binaan (Artisan Hub) yang tersebar di Yogyakarta, Solo, dan Bali.",
    
    "Lokasi fisik kami sangat strategis dan mudah diakses di Jl. Cikini Raya No. 89, Jakarta Pusat. Keberadaan kantor fisik ini adalah bukti komitmen jangka panjang kami di Indonesia."
  ],
  
  // DEFAULT RESPONSE
  default: [
    "Pertanyaan yang sangat menarik. Untuk memberikan jawaban yang paling akurat dan teknis mengenai hal tersebut, saya sangat menyarankan Anda untuk berbicara langsung dengan tim ahli kami di WhatsApp.",
    
    "Maaf, saya ingin memastikan Anda mendapatkan informasi yang 100% tepat. Bisakah Anda menekan tombol WhatsApp di bawah ini? Customer Service manusia kami akan menjelaskan detailnya kepada Anda.",
    
    "Terima kasih atas pertanyaannya. Topik ini membutuhkan penjelasan mendalam yang lebih baik disampaikan oleh agen spesialis kami. Silakan hubungi kami via WhatsApp untuk diskusi lebih lanjut."
  ]
};

// Fungsi Deteksi Topik (Keyword Matching) & Random Picker
const getFallbackResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  let topicKey = 'default';

  // Deteksi Topik Pendaftaran (PRIORITAS TINGGI)
  if (lowerMsg.match(/(daftar|register|gabung|join|cara|syarat|form|akun|hp)/)) {
    topicKey = 'daftar';
  }
  // Deteksi Topik Sistem/P4P
  else if (lowerMsg.match(/(sistem|cara kerja|mekanisme|aturan|p4p|advertising|bagi hasil)/)) {
    topicKey = 'mitra';
  }
  // Deteksi Topik Legalitas/Penipuan (DIPERKUAT)
  else if (lowerMsg.match(/(tipu|bohong|resmi|asli|palsu|scam|aman|legal|hukum|pt|graha|kemenkumham|hoax|bodong|benar|betul)/)) {
    topicKey = 'legality';
  }
  // Deteksi Topik Salam
  else if (lowerMsg.match(/(halo|hi|pagi|siang|malam|sore|assalam|permisi|test|tes|hai)/)) {
    topicKey = 'greeting';
  }
  // Deteksi Topik Produk/Batik
  else if (lowerMsg.match(/(batik|koleksi|baju|produk|harga|jual|beli|sutra|kain|motif|model)/)) {
    topicKey = 'batik';
  }
  // Deteksi Topik Mitra/Kerjasama
  else if (lowerMsg.match(/(mitra|partner|kerjasama|usaha|bisnis|suplier|supplier)/)) {
    topicKey = 'mitra';
  }
  // Deteksi Topik Lokasi
  else if (lowerMsg.match(/(lokasi|alamat|dimana|kantor|posisi|kota|daerah|tempat)/)) {
    topicKey = 'lokasi';
  }

  // Ambil Array Jawaban berdasarkan topik
  const responses = FALLBACK_RESPONSES[topicKey];
  
  // PILIH SATU JAWABAN SECARA ACAK DARI ARRAY
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return randomResponse;
};

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  // 1. Prioritas Utama: Coba AI Gemini
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: {
          systemInstruction: `Anda adalah "Customer Service Heritage Concierge" dari Gucci Indonesia Export (PT. Graha Citra Prima).

          KARAKTER:
          - Anda harus menjawab dengan variasi kalimat, jangan robotik.
          - Gunakan empati tinggi, namun tetap profesional dan elegan.
          - Jika user bertanya hal yang sama, cobalah memfrasakan ulang jawaban Anda.

          INSTRUKSI KHUSUS TOPIK PENIPUAN/KEAMANAN:
          Jika ditanya soal "Penipuan", "Scam", atau keraguan legalitas:
          1. Jawab dengan tegas namun menenangkan.
          2. Selalu sebutkan: PT. GRAHA CITRA PRIMA dan No SK Kemenkumham (AHU-0058932.AH.01.01.Tahun 2025).
          3. Berikan opsi kunjungan fisik ke kantor di Gedung Optik Tunggal, Menteng.
          4. Jelaskan transparansi sistem bisnis.

          KEY POINTS:
          - Bisnis resmi, bukan investasi bodong.
          - Pendaftaran hanya via WhatsApp resmi.
          - Sistem P4P (Pay for Performance) berbasis data ekspor riil.
          
          CLOSING:
          - Arahkan ke WhatsApp untuk verifikasi lanjut.`,
        }
      });
      
      if (response.text) {
        return response.text;
      }
    } catch (error) {
      console.warn("Gemini AI Error (Switching to Smart Fallback):", error);
    }
  }

  // 2. Jika AI Gagal/Tidak Ada Key, gunakan Jawaban Acak dari Perpustakaan (Fallback)
  return getFallbackResponse(userMessage);
};
