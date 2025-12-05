
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage, ChatSender } from '../types';

const SUGGESTED_QUESTIONS = [
  "Cara Daftar Mitra?",
  "Apa itu Sistem P4P?",
  "Legalitas Perusahaan?",
  "Lihat Koleksi Batik",
  "Lokasi Kantor?"
];

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: 'Selamat datang di Gucci Indonesia Export Hub. Saya adalah Heritage Concierge AI Anda. Ada yang bisa saya bantu mengenai kemitraan atau koleksi?',
      sender: ChatSender.BOT,
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]); // Scroll when messages change or loading state changes

  const processMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      sender: ChatSender.USER,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true); // Start typing indicator

    // 2. Get AI Response (Fetch data first)
    const responseText = await getGeminiResponse(text);

    // 3. Create WhatsApp URL with the user's context
    const waNumber = "6281325808529";
    const waMessage = `Halo CS Gucci Export, saya butuh bantuan mendaftar akun bisnis: "${text}"`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

    // 4. Simulate Typing Delay (3 Seconds) before showing the message
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: ChatSender.BOT,
        timestamp: Date.now(),
        action: {
          label: "Hubungi Customer Service (WhatsApp)",
          url: waUrl
        }
      };

      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false); // Stop typing indicator
    }, 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    processMessage(inputValue);
  };

  const handleChipClick = (question: string) => {
    processMessage(question);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window - Responsive Width */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-32px)] md:w-96 bg-[#FAF9F6] rounded-t-xl rounded-b-xl shadow-2xl border border-[#8B1D1D]/30 overflow-hidden flex flex-col h-[500px] md:h-[600px] animate-fadeInUp">
          {/* Header - Holiday Red */}
          <div className="bg-[#8B1D1D] p-4 flex justify-between items-center text-white border-b border-[#BFA36F]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#BFA36F] p-0.5 bg-white">
                 <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnWmY0zvowWE-shO6aIs6KLK-TaTU6PdhvWu8M2HNnmfj0Md3pjnfooIixf_q6f-mcUk&usqp=CAU" 
                    alt="Agent Avatar"
                    className="w-full h-full object-cover rounded-full"
                 />
              </div>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-widest text-[#BFA36F] flex items-center">
                    Customer Service
                </h3>
                <span className="text-[10px] opacity-90 flex items-center tracking-wider text-white">
                    <span className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mr-1 animate-pulse"></span>
                    Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
              <X className="w-5 h-5 text-[#BFA36F]" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 md:p-5 overflow-y-auto bg-[#FAF9F6] scrollbar-hide relative">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
            
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex mb-4 md:mb-6 relative z-10 ${msg.sender === ChatSender.USER ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 md:p-4 text-sm leading-relaxed shadow-md ${
                    msg.sender === ChatSender.USER 
                      ? 'bg-[#8B1D1D] text-white rounded-t-xl rounded-bl-xl' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-t-xl rounded-br-xl'
                  }`}
                >
                  {/* Message Text */}
                  <p className="mb-2 whitespace-pre-wrap">{msg.text}</p>
                  
                  {/* Action Button (If exists) */}
                  {msg.action && (
                    <div className="mt-3 pt-3 border-t border-gray-100/20">
                      <button 
                        onClick={() => window.open(msg.action?.url, '_blank')}
                        className="w-full flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white py-2 px-3 rounded-lg transition-colors text-xs font-bold uppercase tracking-wide shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Lanjut ke WhatsApp
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4 relative z-10 animate-fadeIn">
                <div className="bg-white border border-gray-200 p-4 rounded-t-xl rounded-br-xl shadow-sm flex space-x-1 items-center">
                  <span className="text-xs text-gray-400 mr-2 font-bold tracking-wider">MENGETIK</span>
                  <div className="w-1.5 h-1.5 bg-[#BFA36F] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#BFA36F] rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-[#BFA36F] rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Chips */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                    key={idx}
                    onClick={() => handleChipClick(q)}
                    className="whitespace-nowrap bg-white border border-[#BFA36F]/30 text-[#8B1D1D] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full hover:bg-[#BFA36F] hover:text-white transition-colors shadow-sm"
                >
                    {q}
                </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 md:p-4 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tulis pesan..."
              className="flex-1 border-b border-gray-300 px-2 py-2 text-sm focus:outline-none focus:border-[#8B1D1D] bg-transparent font-medium"
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="bg-[#8B1D1D] text-[#BFA36F] p-3 rounded-full hover:bg-[#5e1414] disabled:opacity-50 transition-colors shadow-lg transform hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'bg-gray-800 rotate-90' : 'bg-[#8B1D1D] hover:bg-[#5e1414]'
        } text-[#BFA36F] p-4 rounded-full shadow-[0_4px_20px_rgba(139,29,29,0.5)] transition-all duration-300 transform hover:scale-110 flex items-center justify-center border border-[#BFA36F]/20`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default ChatWidget;
