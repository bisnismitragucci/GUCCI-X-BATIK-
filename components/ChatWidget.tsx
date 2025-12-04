
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Phone, MessageCircle } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage, ChatSender } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: 'Selamat datang di Gucci Indonesia Export Hub. Tanyakan saya tentang koleksi "Batik Reimagined" atau peluang kemitraan untuk butik lokal Anda.',
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
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: ChatSender.USER,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // 2. Get AI Response
    const responseText = await getGeminiResponse(inputValue);

    // 3. Create WhatsApp URL with the user's context
    const waNumber = "6282130903916";
    const waMessage = `Halo CS Gucci Export, saya butuh bantuan lebih lanjut mengenai: "${inputValue}"`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

    // 4. Add Bot Message with Action Button
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
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-[#FAF9F6] rounded-t-lg shadow-2xl border border-[#8B1D1D]/30 overflow-hidden flex flex-col h-[500px]">
          {/* Header - Holiday Red */}
          <div className="bg-[#8B1D1D] p-4 flex justify-between items-center text-white border-b border-[#BFA36F]">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#BFA36F]">
                 <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnWmY0zvowWE-shO6aIs6KLK-TaTU6PdhvWu8M2HNnmfj0Md3pjnfooIixf_q6f-mcUk&usqp=CAU" 
                    alt="Agent Avatar"
                    className="w-full h-full object-cover"
                 />
              </div>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-widest text-[#BFA36F]">LIVE CHAT</h3>
                <span className="text-[10px] opacity-80 flex items-center tracking-wider">
                    <span className="w-1.5 h-1.5 bg-[#BFA36F] rounded-full mr-1"></span>
                    Customer Service
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
              <X className="w-4 h-4 text-[#BFA36F]" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto bg-[#FAF9F6] scrollbar-hide">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex mb-6 ${msg.sender === ChatSender.USER ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-4 text-sm leading-relaxed shadow-sm ${
                    msg.sender === ChatSender.USER 
                      ? 'bg-[#8B1D1D] text-white rounded-t-xl rounded-bl-xl' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-t-xl rounded-br-xl'
                  }`}
                >
                  {/* Message Text */}
                  <p className="mb-2 whitespace-pre-wrap">{msg.text}</p>
                  
                  {/* Action Button (If exists) */}
                  {msg.action && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => window.open(msg.action?.url, '_blank')}
                        className="w-full flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white py-2 px-3 rounded-lg transition-colors text-xs font-bold uppercase tracking-wide shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Hubungi CS via WhatsApp
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-gray-200 p-4 rounded-t-xl rounded-br-xl shadow-sm flex space-x-1 items-center">
                  <div className="w-1.5 h-1.5 bg-[#BFA36F] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#BFA36F] rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-[#BFA36F] rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tanya tentang Batik atau Kemitraan..."
              className="flex-1 border-b border-gray-300 px-2 py-2 text-sm focus:outline-none focus:border-[#8B1D1D] bg-transparent"
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="bg-[#8B1D1D] text-[#BFA36F] p-3 rounded-full hover:bg-[#5e1414] disabled:opacity-50 transition-colors"
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
        } text-[#BFA36F] p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center border border-[#BFA36F]/20`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default ChatWidget;