import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, PhoneCall, ExternalLink } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  link?: string;
  linkLabel?: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 Hello! I'm Delish's AI assistant. Ask me about our menu, delivery times, or your order!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages list is updated
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsgText = input.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMessage: Message = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: userMsgText,
      timestamp
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Process automated simulated response
    setTimeout(() => {
      const lower = userMsgText.toLowerCase();
      let replyText = "I'm not sure I understand, but our support team is ready to help! Click below to chat with a human directly on WhatsApp.";
      let link = "https://wa.me/2348030000000";
      let linkLabel = "Chat on WhatsApp";

      if (lower.includes("delivery") || lower.includes("time") || lower.includes("how long")) {
        replyText = "Our average desk delivery time to Lagos Island offices is between 25 to 40 minutes, depending on your building's security protocols.";
        link = undefined;
      } else if (lower.includes("menu") || lower.includes("eat") || lower.includes("craving") || lower.includes("food")) {
        replyText = "You can check our full gourmet menu by clicking the Menu tab above! Let me know if you need recommendations.";
        link = undefined;
      } else if (lower.includes("contact") || lower.includes("human") || lower.includes("agent") || lower.includes("support") || lower.includes("whatsapp")) {
        replyText = "I'm an AI, but I can easily connect you to a real member of our Lagos Island guest support team. Click the link below to start chatting on WhatsApp!";
        link = "https://wa.me/2348030000000";
        linkLabel = "Chat on WhatsApp";
      }

      const botMessage: Message = {
        id: "bot-msg-" + Date.now(),
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        link,
        linkLabel
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      
      {/* 1. Floating Circular Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#1A3C34] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(26,60,52,0.3)] hover:bg-[#112722] transition-colors cursor-pointer relative"
        title="Chat with AI"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E34B35] rounded-full border-2 border-[#1A3C34] animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* 2. Chatbox popup window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: -16, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            className="absolute bottom-16 right-0 w-[330px] sm:w-[360px] h-[480px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header banner */}
            <div className="bg-[#102420] text-white p-4 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 bg-accent-yellow rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-green" />
              </div>
              <div>
                <h4 className="text-xs font-black tracking-tight font-sans">DelishBot</h4>
                <p className="text-[9px] text-emerald-300 font-bold uppercase tracking-wider font-mono">
                  Online & Active
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-white/60 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex gap-2 max-w-[85%] items-start">
                    {msg.sender === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-primary-green" />
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <div className={`p-3.5 rounded-2xl text-xs font-sans leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#1A3C34] text-white rounded-tr-none"
                          : "bg-white text-gray-700 rounded-tl-none border border-gray-100"
                      }`}>
                        <p>{msg.text}</p>
                        
                        {msg.link && (
                          <a
                            href={msg.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 bg-[#E34B35] hover:bg-[#c23723] text-white font-extrabold px-3 py-2 rounded-xl text-[10px] uppercase tracking-wider transition-colors shadow-sm"
                          >
                            <span>{msg.linkLabel}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <span className={`block text-[9px] text-gray-400 font-mono ${
                        msg.sender === "user" ? "text-right" : "text-left pl-1"
                      }`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2 shrink-0">
              <input
                type="text"
                placeholder="Ask about delivery, menus, support..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow h-11 px-4 border border-gray-200 focus:border-primary-green focus:ring-1 focus:ring-primary-green/20 rounded-xl text-xs font-sans outline-none transition-all"
              />
              <button
                type="submit"
                className="w-11 h-11 bg-[#1A3C34] hover:bg-[#112722] text-white flex items-center justify-center rounded-xl shadow-sm cursor-pointer shrink-0 transition-colors"
                title="Send Message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
