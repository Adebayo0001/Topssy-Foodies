import React, { useState } from "react";
import { Mail, Send } from "lucide-react";

interface SubscriptionProps {
  triggerToast: (msg: string, type?: "success" | "info" | "login") => void;
}

export default function Subscription({ triggerToast }: SubscriptionProps) {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      triggerToast("Please enter a valid work email address", "info");
      return;
    }

    // Load existing subscribers
    const existingStr = localStorage.getItem("subscribers");
    const existing = existingStr ? JSON.parse(existingStr) : [];
    
    // Avoid duplicates
    if (!existing.includes(email.toLowerCase().trim())) {
      existing.push(email.toLowerCase().trim());
      localStorage.setItem("subscribers", JSON.stringify(existing));
    }

    // Trigger Toast (satisfying both Point 1 and Point 3's custom Toast rule)
    triggerToast("Subscribed! We'll send deals to your inbox.", "success");
    setEmail("");
  };

  return (
    <section className="py-12 bg-[#FAF9F7] px-6 sm:px-8 lg:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1A3C34] rounded-2xl p-8 md:p-12 shadow-[0_15px_40px_rgba(26,60,52,0.12)] border border-emerald-950/20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-xl -ml-16 -mb-16 pointer-events-none" />

          {/* Text Info */}
          <div className="text-center lg:text-left space-y-2 max-w-xl z-10">
            <h3 className="text-2xl font-black text-white tracking-tight">
              Get Fresh Updates
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 font-normal leading-relaxed">
              Be the first to know about new menu launches and exclusive Lagos Island office deals.
            </p>
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSubscribe}
            className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3 z-10"
          >
            <div className="relative w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-[#1A3C34] border border-white/10 focus:border-[#FCD34D] text-xs font-medium placeholder-gray-400 outline-none transition-all duration-300"
              />
            </div>
            
            <button
              type="submit"
              className="w-full sm:w-auto h-12 bg-[#FCD34D] hover:bg-[#ebd03d] text-[#1A3C34] font-extrabold px-6 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-sm shrink-0 cursor-pointer"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
