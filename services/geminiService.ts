
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
    "Salam hangat dari Gucci Indonesia Export Hub. Saya adalah 'Heritage Concierge' Anda. \n\nSaya siap memandu Anda mengenai pembuatan Akun Bisnis dan Program Kemitraan. Apa yang bisa saya bantu?",
    "Selamat datang di layanan eksklusif PT. Graha Citra Prima. Silakan tanyakan mengenai cara pendaftaran akun bisnis atau mekanisme P2P Lending kami.",
    "Halo, terima kasih telah menghubungi kami. Kami bangga dapat melayani Anda. Ada yang ingin Anda tanyakan seputar legalitas atau proses agenda ekspor?"
  ],
  
  // PENJELASAN LEGALITAS / ANTI-PENIPUAN / REKENING (DIUPDATE SESUAI REQUEST)
  legality: [
    "Mengenai keraguan Anda, berikut klarifikasi resmi kami:\n\n1. **Legalitas:** Kami adalah PT. GRAHA CITRA PRIMA (AHU-0058932.AH.01.01.Tahun 2025).\n2. **Sistem Pembayaran:** Kami menggunakan konsep **P2P Lending (Peer-to-Peer)**. Oleh karena itu, transaksi resmi menggunakan **REKENING PERORANGAN** yang ditunjuk manajemen, bukan rekening perusahaan langsung, demi kecepatan likuiditas ke mitra.\n3. **Keamanan:** Rekening resmi hanya didapatkan dari Customer Service (CS) GUCCI. Jika ada yang memberi rekening selain dari CS kami, itu bukan tanggung jawab kami.",
    
    "Kami mengerti kehati-hatian Anda. \n\nPerlu dipahami bahwa dalam ekosistem P4P kami, metode pembayaran mengadopsi sistem **P2P Lending**. Artinya, transfer ditujukan ke **Rekening Perorangan** bendahara resmi yang diawasi ketat oleh Gucci. \n\nLegalitas kami mutlak. Untuk keamanan, pastikan Anda hanya bertransaksi melalui instruksi Customer Service di WhatsApp kami.",
    
    "Terkait isu penipuan: Kami beroperasi dengan izin resmi dan kantor fisik di Menteng. \n\nKhusus untuk transaksi keuangan, kami menerapkan mekanisme **P2P Lending** yang menggunakan **Rekening Perorangan** terverifikasi. Ini adalah prosedur standar kami untuk fleksibilitas bagi hasil mitra. Selalu verifikasi nomor rekening hanya melalui CS Resmi Gucci."
  ],
  
  // PENJELASAN PRODUK BATIK
  batik: [
    "Koleksi **'The Batik Renaissance'** adalah wujud cinta kami pada wastra nusantara. Kain sutra Italia dipadukan dengan motif Mega Mendung Cirebon dan Parang Barong, menciptakan mahakarya yang kini diperebutkan di Milan dan Paris.",
    
    "Produk unggulan kami fokus pada *High Fashion* yang mengawinkan teknik batik tulis halus tradisional dengan potongan modern khas Gucci. Setiap helai kain melewati proses kurasi selama 3 bulan sebelum diekspor.",
    
    "Kami mengekspor batik tulis dan tenun ikat kualitas premium. Salah satu *masterpiece* kami adalah 'The Cloud Garden Blazer' yang menggunakan pewarna indigo alami dari tanaman lokal, sebuah simbol kemewahan yang berkelanjutan."
  ],
  
  // PENJELASAN KEMITRAAN & MODAL (DIUPDATE SESUAI REQUEST)
  mitra: [
    "Mengenai Modal: **Tidak ada biaya di awal pendaftaran.** \n\nModal atau dana partisipasi hanya dikeluarkan NANTI, yaitu saat Anda sudah memiliki Akun Bisnis dan siap menjalankan **Proses Agenda** (eksekusi proyek). Fokus pertama Anda hanyalah mendaftar akun terlebih dahulu.",
    
    "Sistem kami sangat transparan. \n1. Anda daftar Akun Bisnis (Gratis/Mudah).\n2. Setelah punya akun, baru kita bicara soal modal untuk menjalankan agenda.\n3. Keuntungan dibagikan via sistem P2P Lending.",
    
    "Jangan khawatir soal modal dulu. Syarat utama hanyalah memiliki **Akun Bisnis** di data kami. Modal hanya diperlukan saat Anda sudah resmi terdaftar dan ingin mengambil slot agenda ekspor yang tersedia."
  ],
  
  // PENJELASAN PENDAFTARAN (DIUPDATE SESUAI REQUEST)
  daftar: [
    "Syarat daftarnya sangat simpel: Cukup **membuat Akun Bisnis** melalui Customer Service GUCCI. \n\nSilakan klik tombol WhatsApp untuk dibantu pembuatan akunnya oleh tim kami. Data Anda akan kami input ke sistem global kami.",
    
    "Untuk bergabung, langkah pertamanya bukan setor uang, tapi **registrasi Akun Bisnis**. Hubungi CS kami di WhatsApp, berikan data diri, dan akun Anda akan diproses. Setelah akun jadi, baru Anda bisa melihat agenda yang tersedia.",
    
    "Ingin mendaftar? Cukup hubungi CS kami untuk pembuatan **Akun Bisnis Gucci**. Prosesnya cepat dan dipandu langsung oleh admin. Tidak ada syarat rumit di awal."
  ],
  
  // PENJELASAN LOKASI
  lokasi: [
    "Kantor Pusat operasional kami terletak di jantung kota Jakarta: **Gedung Optik Tunggal, Jl. Cikini Raya No. 89, Menteng, Jakarta Pusat**. Kami menyambut kunjungan Anda pada jam kerja (Senin-Jumat).",
    
    "Anda dapat menemukan kami di kawasan Menteng, Jakarta Pusat, tepatnya di Gedung Optik Tunggal. Selain itu, kami memiliki beberapa sentra artisan binaan (Artisan Hub) yang tersebar di Yogyakarta, Solo, dan Bali.",
    
    "Lokasi fisik kami sangat strategis dan mudah diakses di Jl. Cikini Raya No. 89, Jakarta Pusat. Keberadaan kantor fisik ini adalah bukti komitmen jangka panjang kami di Indonesia."
  ],
  
  // DEFAULT RESPONSE
  default: [
    "Pertanyaan yang bagus. Untuk detail teknis pembuatan Akun Bisnis atau verifikasi rekening P2P, silakan hubungi Customer Service kami via WhatsApp.",
    
    "Maaf, agar penjelasannya lebih akurat, silakan tanyakan langsung ke CS kami melalui tombol WhatsApp di bawah. Mereka bisa memandu Anda membuat Akun Bisnis.",
    
    "Terima kasih atas pertanyaannya. Tim spesialis kami di WhatsApp siap menjelaskan detail agenda dan sistem pembayaran P2P kami kepada Anda."
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
  // Deteksi Topik Sistem/P4P/Modal
  else if (lowerMsg.match(/(sistem|cara kerja|mekanisme|aturan|p4p|advertising|bagi hasil|modal|biaya|bayar|dana)/)) {
    topicKey = 'mitra';
  }
  // Deteksi Topik Legalitas/Penipuan/Rekening (DIPERKUAT)
  else if (lowerMsg.match(/(tipu|bohong|resmi|asli|palsu|scam|aman|legal|hukum|pt|graha|kemenkumham|hoax|bodong|benar|betul|rekening|transfer|bank)/)) {
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
          systemInstruction: `Anda adalah Customer Service dari Gucci Indonesia Export (PT. Graha Citra Prima).

          ATURAN PENTING & LOGIKA BISNIS (WAJIB DIIKUTI):

          1. **ISU PENIPUAN/LEGALITAS:**
             - Jika user bertanya soal penipuan, tunjukkan legalitas resmi (PT. Graha Citra Prima, SK Kemenkumham).
             - Jelaskan bahwa kantor fisik ada di Menteng, Jakarta Pusat.

          2. **SISTEM PEMBAYARAN (REKENING):**
             - Jelaskan bahwa sistem pembayaran menggunakan konsep **P2P Lending**.
             - Karena P2P Lending, transaksi menggunakan **REKENING PERORANGAN** (bukan atas nama PT langsung).
             - Tegaskan: Rekening pembayaran valid HANYA ada pada CS Resmi Gucci di WhatsApp. Jika dari pihak lain, itu bukan kami.

          3. **SYARAT DAFTAR:**
             - Syarat daftar HANYA cukup dengan **membuat Akun Bisnis** melalui CS Gucci.
             - Jangan minta uang di awal.

          4. **MODAL/BIAYA:**
             - Modal HANYA dikeluarkan saat peserta SUDAH memiliki Akun Bisnis dan ingin menjalankan **Proses Agenda**.
             - Jadi urutannya: Daftar (Bikin Akun) -> Pilih Agenda -> Baru Modal.

          GAYA BAHASA:
          - Profesional, meyakinkan, namun tetap ramah.
          - Gunakan Bahasa Indonesia yang baik.
          - Arahkan user untuk menghubungi WhatsApp untuk pembuatan akun atau verifikasi rekening.`,
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
