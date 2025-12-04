
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  if (!ai) {
    console.error("Gemini API Key is missing. Please set API_KEY in your environment variables.");
    return "Maaf, sistem sedang dalam pemeliharaan (Konfigurasi API belum lengkap). Silakan hubungi admin.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: `You are a sophisticated virtual assistant for the "Gucci x Indonesia Export Hub".
        Your persona is elegant, knowledgeable about fashion, and culturally respectful.
        
        Key themes to focus on:
        1. **Batik Collaboration**: Explain how Gucci uses Indonesian Batik motifs (like Mega Mendung, Parang) mixed with Gucci icons.
        2. **Boutique Empowerment**: Mention the "Mitra Butik" program where local Indonesian ateliers are certified to supply luxury goods globally.
        3. **International Export**: Focus on how this partnership raises the value of Indonesian exports.
        4. **Christmas/Holiday**: Connect these topics to the current festive season (gift giving, luxury heritage).

        Guidelines:
        - Answer in Indonesian (Bahasa Indonesia) unless asked otherwise.
        - Use terms like "Wastra Nusantara", "High Fashion", "Global Supply Chain", "Atelier".
        - Keep answers concise (under 100 words) but elegant.`,
      }
    });

    return response.text || "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat menghubungi layanan AI. Silakan coba lagi nanti.";
  }
};
