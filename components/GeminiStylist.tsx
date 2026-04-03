import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Sparkles, Loader2, Minus, Image as ImageIcon, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';

const GeminiStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! I am your personal stylist. Upload a photo of your outfit or ask me anything to find the perfect jewelry match.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim();
    const currentImage = selectedImage;
    
    setInput('');
    setSelectedImage(null);
    
    // Add user message to chat
    setMessages(prev => [
      ...prev, 
      { 
        role: 'user', 
        text: userMessage, 
        image: currentImage 
      }
    ]);
    
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      let promptText = `
        You are a sophisticated and helpful AI Stylist for the premium artificial jewelry brand 'Iksha' by Samiksha Phadke.
        Your tone is elegant, polite, and fashion-forward. Use Indian context where appropriate (sarees, lehengas, kurtis).
        
        Context: The user is asking about jewelry advice.
        Current conversation history: ${messages.map(m => `${m.role}: ${m.text}`).join('\n')}
        User's new question: ${userMessage}
      `;

      if (currentImage) {
        promptText += `
          The user has uploaded an image of their outfit. Analyze the colors, style (traditional/modern), and neckline.
          Based on this visual analysis, recommend specific types of jewelry (Kundan, Polki, Oxidized, Rose Gold, Temple Jewelry) that would complement the look.
        `;
      } else {
        promptText += `
          Provide a short, helpful response (max 60 words) recommending types of jewelry that would fit their need.
        `;
      }

      const parts: any[] = [{ text: promptText }];
      
      if (currentImage) {
        // Extract base64 data (remove "data:image/png;base64," prefix)
        const base64Data = currentImage.split(',')[1];
        const mimeType = currentImage.split(';')[0].split(':')[1];
        
        parts.push({
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-latest',
        contents: [
          { role: 'user', parts: parts } 
        ],
      });

      const reply = response.text || "I'm having trouble connecting to the fashion archives right now. Please try again later.";
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I'm currently unable to access the styling service." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-6 w-[90vw] md:w-96 bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden flex flex-col h-[600px] border border-gray-100 origin-bottom-right"
          >
            
            {/* Header */}
            <div className="bg-brand-dark p-5 flex justify-between items-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center shadow-lg border border-white/20">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-serif tracking-wide text-lg text-gold-100">Iksha Stylist</h3>
                  <span className="text-[10px] text-gray-300 uppercase tracking-widest block">AI Powered Concierge</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors relative z-10">
                <Minus size={20} strokeWidth={1} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#FAFAFA]">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 px-1">
                    {msg.role === 'user' ? 'You' : 'Stylist'}
                  </span>
                  <div 
                    className={`max-w-[85%] p-4 text-sm font-light leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand-dark text-white rounded-2xl rounded-tr-sm' 
                        : 'bg-white border border-gray-100 text-gray-700 rounded-2xl rounded-tl-sm'
                    }`}
                  >
                    {msg.image && (
                      <img src={msg.image} alt="Uploaded outfit" className="w-full h-32 object-cover rounded-lg mb-3 border border-white/20" />
                    )}
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                   <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3">
                    <Loader2 size={16} className="animate-spin text-gold-500" />
                    <span className="text-xs text-gray-400 tracking-widest uppercase">Curating look...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              {/* Image Preview */}
              <AnimatePresence>
                {selectedImage && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-3 flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100 w-fit overflow-hidden"
                  >
                    <img src={selectedImage} alt="Preview" className="w-10 h-10 object-cover rounded" />
                    <span className="text-xs text-gray-500">Image attached</span>
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="ml-2 p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-2 items-center bg-gray-50 border border-gray-200 rounded-full px-2 py-2 focus-within:border-gold-400 focus-within:ring-1 focus-within:ring-gold-100 transition-all">
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-gold-600 hover:bg-gold-50 rounded-full transition-colors"
                  title="Upload outfit photo"
                >
                  <ImageIcon size={20} strokeWidth={1.5} />
                </button>
                
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for advice..." 
                  className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-gray-400 text-brand-dark min-w-0"
                />
                
                <button 
                  onClick={handleSend}
                  disabled={isLoading || (!input.trim() && !selectedImage)}
                  className="bg-brand-dark hover:bg-gold-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  <Send size={16} className={isLoading ? "opacity-0" : "ml-0.5"} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-gray-200 text-brand-dark scale-90' : 'bg-brand-dark text-white'} w-16 h-16 rounded-full shadow-2xl transition-colors duration-300 flex items-center justify-center group hover:bg-gold-600 border-2 border-white/20`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} strokeWidth={1} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare size={28} strokeWidth={1} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default GeminiStylist;