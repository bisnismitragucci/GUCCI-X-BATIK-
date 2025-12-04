
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
  greeting: "Salam hangat dari Gucci Indonesia Export Hub. Saya adalah 'Heritage Concierge' Anda hari ini. \n\nSaya dapat menjelaskan detail mengenai:\n1. Koleksi Batik Renaissance (Filosofi & Harga)\n2. Legalitas & Keamanan Transaksi\n3. Program Kemitraan UMKM\n\nTopik mana yang ingin saya jelaskan lebih rinci untuk Anda?",
  
  // PENJELASAN LEGALITAS / ANTI-PENIPUAN
  legality: "Terima kasih atas pertanyaan kritis Anda. Keamanan dan kepercayaan adalah fondasi bisnis kami.\n\nIzinkan saya menjelaskan status legalitas kami:\n\n1. **Entitas Resmi**: Portal ini dikelola penuh oleh **PT. GRAHA CITRA PRIMA**, pemegang lisensi distribusi resmi.\n2. **Payung Hukum**: Operasional kami dilindungi oleh **SK Kemenkumham No. AHU-0058932.AH.01.01.Tahun 2025**. Ini bukan entitas fiktif.\n3. **Kantor Fisik**: Kantor pusat kami berada di kawasan premium Menteng, Jakarta Pusat (Gedung Optik Tunggal, Jl. Cikini Raya No. 89).\n4. **Verifikasi**: Kami menyediakan dokumen sertifikasi ISO 9001:2015 dan Izin Usaha Ekspor yang dapat Anda periksa di menu 'Legalitas'.\n\nKami mengundang Anda untuk melakukan verifikasi langsung atau video call dengan tim legal kami melalui Customer Service.",
  
  // PENJELASAN PRODUK BATIK
  batik: "Koleksi **'The Batik Renaissance'** bukan sekadar pakaian, melainkan sebuah narasi budaya. \n\nPenjelasan Detail:\nSetiap helai kain dikerjakan menggunakan teknik canting tulis halus (0.1mm) yang memakan waktu 3-6 bulan pengerjaan. Kami memadukan motif sakral keraton (seperti Parang Barong) dengan siluet modern Italia.\n\nBahan yang digunakan adalah Sutra Organik dan Wol Cashmere, menjadikannya investasi seni yang bernilai tinggi. Untuk katalog visual dan daftar harga spesifik, rekan Customer Service kami siap mengirimkannya via WhatsApp.",
  
  // PENJELASAN KEMITRAAN
  mitra: "Program **'Mitra Butik'** adalah inisiatif kami untuk membawa pengrajin lokal ke panggung global.\n\nPenjelasan Program:\nKami tidak hanya membeli produk, tetapi memberikan pendampingan (mentorship) standar kualitas Gucci Artisan Tier 1. Mitra yang lolos kurasi akan mendapatkan akses pasar ke 40 negara, bantuan logistik ekspor, dan branding internasional.\n\nApakah Anda pemilik sanggar yang kami cari? Mari diskusikan kriteria kurasi lebih lanjut dengan tim spesialis kami.",
  
  // PENJELASAN PENDAFTARAN
  daftar: "Proses pendaftaran mitra bersifat eksklusif namun transparan.\n\nLangkah-langkahnya:\n1. Pengisian Formulir Digital (Data Usaha & Foto Produk).\n2. Kurasi Awal oleh Tim Desain (2-3 Hari Kerja).\n3. Verifikasi Lapangan (Visitasi Sanggar).\n4. Penandatanganan MoU Ekspor.\n\nUntuk memulai langkah pertama, saya sarankan Anda mengirimkan portofolio singkat ke WhatsApp resmi pendaftaran kami melalui tombol di bawah ini.",
  
  // PENJELASAN LOKASI
  lokasi: "Sentra produksi dan mitra kami tersebar di titik-titik kebudayaan utama di Pulau Jawa dan Bali.\n\nLokasi Utama:\n- **Yogyakarta & Solo**: Pusat Batik Tulis Klasik & Keraton.\n- **Pekalongan & Cirebon**: Pusat Batik Pesisir & Warna Alam.\n- **Bali**: Pusat Tenun & Perhiasan.\n\nKantor Pusat Manajemen Ekspor kami berada di **Menteng, Jakarta Pusat**. Kami menerima kunjungan bisnis dengan perjanjian terlebih dahulu melalui Customer Service.",
  
  // DEFAULT RESPONSE
  default: "Pertanyaan yang sangat menarik. Topik tersebut membutuhkan penjelasan spesifik yang melibatkan data terkini atau kebijakan khusus.\n\nAgar Anda mendapatkan jawaban yang akurat dan tidak keliru, saya akan menghubungkan Anda langsung dengan *Senior Relationship Manager* kami. Beliau dapat memberikan penjelasan mendalam via WhatsApp."
};

// Fungsi Deteksi Topik (Keyword Matching)
const getFallbackResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  // Deteksi Topik Legalitas/Penipuan (PRIORITAS TINGGI)
  if (lowerMsg.match(/(tipu|bohong|resmi|asli|palsu|scam|aman|legal|hukum|pt|graha|kemenkumham|izin|polisi)/)) {
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
  if (lowerMsg.match(/(mitra|partner|kerjasama|usaha|bisnis|suplier|supplier|gabung|join)/)) {
    return FALLBACK_RESPONSES.mitra;
  }

  // Deteksi Topik Cara Daftar
  if (lowerMsg.match(/(daftar|register|cara|syarat|ketentuan|dokumen|form)/)) {
    return FALLBACK_RESPONSES.daftar;
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
          
          TUGAS ANDA:
          Memberikan PENJELASAN RINCI dan EDUKATIF. Jangan menjawab pendek.
          
          PANDUAN JAWABAN:
          1. **Jika ditanya soal Penipuan/Legalitas**: Jawab dengan TEGAS dan RINCI tentang data perusahaan (PT Graha Citra Prima, Alamat Menteng, SK Kemenkumham). Yakinkan user bahwa ini adalah platform resmi pemerintah & swasta.
          2. **Jika ditanya Batik**: Jelaskan filosofi motifnya, proses pembuatannya (canting, lama pengerjaan), dan kenapa harganya mahal (eksklusivitas).
          3. **Gaya Bicara**: Profesional, tenang, elegan, seperti pelayan butik bintang 5.
          4. **Akhiran**: Selalu arahkan ke WhatsApp CS untuk tindakan nyata.

          Konteks: User mungkin ragu apakah ini penipuan. Tugas Anda adalah membangun kepercayaan (Trust Building).`,
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
