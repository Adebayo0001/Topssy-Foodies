import React from "react";
import { motion } from "motion/react";
import { Star, Flame } from "lucide-react";

export default function Hero() {
  const scrollToMenu = () => {
    const element = document.getElementById("menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative bg-primary-green overflow-hidden flex items-center pt-20 pb-28 lg:pt-28 lg:pb-36"
    >
      {/* Subtle background glow for an organic, lush feeling */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* 1. Left Column (Hero copy and CTAs) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col text-left"
          >
            {/* Premium Tag */}
            <div className="inline-flex items-center gap-2 bg-[#1b3d34] border border-white/10 px-4 py-2 rounded-full w-fit mb-8 shadow-sm">
              <Flame className="w-4 h-4 text-[#fbc42d] animate-bounce" />
              <span className="text-[11px] font-bold text-[#fbc42d] tracking-widest uppercase font-sans">
                Nigeria's #1 Premium Delicacy Lounge
              </span>
            </div>

            {/* Headline with powerful typographic hierarchy */}
            <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-black text-white leading-[1.08] tracking-tight font-sans">
              Authentic <br />
              Naija Flavors <br />
              <span className="text-[#fbc42d]">Made to Salivate.</span>
            </h1>

            {/* Paragraph Subtext */}
            <p className="mt-8 text-[15px] sm:text-[16px] text-[#b3ccc5] leading-relaxed font-sans font-normal max-w-md">
              From the bustling streets of Marina to the high-rises of VI—we bring Lagos Island's finest meals straight to your office desk.
            </p>

            {/* CTAs and Stars */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <motion.button
                onClick={scrollToMenu}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 196, 45, 0.25)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#fbc42d] hover:bg-[#e2af25] text-[#113129] px-10 py-4.5 rounded-full font-extrabold text-[16px] shadow-lg transition-all duration-300 cursor-pointer"
              >
                Order Feast Now
              </motion.button>

              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-[#fbc42d] text-[#fbc42d]" />
                  ))}
                </div>
                <span className="text-[15px] font-bold text-white font-sans">4.9 / 5.0 (Naija Choice)</span>
              </div>
            </div>
          </motion.div>

          {/* 2. Center Column (Mouthwatering Smoky Jollof Image Card with Breathing Motion) */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex justify-center relative px-4 lg:px-0"
          >
            <div className="relative w-full max-w-[340px] lg:max-w-none group">
              {/* Soft glow shadow behind card */}
              <div className="absolute inset-0 bg-[#0f2420] rounded-[2.5rem] transform translate-y-6 scale-95 opacity-60 blur-2xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-80" />
              
              {/* Gourmet Jollof Image Card with Breathing Motion */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#142e28] border border-white/5 shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=800&q=80"
                  alt="Authentic Smoky Jollof Rice Feast"
                  className="w-full h-full object-cover brightness-95 transform hover:scale-110 transition-transform duration-[1.2s] ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual rich shading overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                
                {/* Sizzling descriptor */}
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <span className="bg-[#fbc42d] text-[#113129] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest font-sans">
                    FEAST OF THE DAY
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 leading-tight">
                    Smoky Party Jollof & Dodo
                  </h3>
                </div>
              </motion.div>

              {/* FLOATING CARD: Chef Review */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -top-6 -left-6 bg-white text-[#113129] p-4.5 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.15)] border border-gray-100 max-w-[190px] text-left select-none"
              >
                <div className="flex gap-0.5 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#fbc42d] text-[#fbc42d]" />
                  ))}
                </div>
                <p className="text-[12px] font-extrabold text-gray-800 leading-tight">
                  "Absolutely stellar smokiness!"
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  — by Chef Topssy
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* 3. Right Column (Smiling Professional & Local Trust Counter) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col gap-6 justify-center items-center lg:items-stretch"
          >
            {/* Portrait Card - Elegant Nigerian Professional */}
            <div className="relative w-full max-w-[280px] lg:max-w-none group">
              <div className="absolute inset-0 bg-[#0f2420] rounded-[2.5rem] transform translate-y-3 scale-95 opacity-40 blur-lg" />
              
              <div className="relative aspect-[1/1] overflow-hidden rounded-[2.5rem] bg-[#142e28] border border-white/5 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80"
                  alt="Happy Lagos Professional"
                  className="w-full h-full object-cover object-top brightness-105 transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Social Proof Card */}
            <div className="bg-white text-gray-800 p-6 rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-gray-100 w-full max-w-[280px] lg:max-w-none text-left">
              <p className="text-[22px] font-black text-[#113129] tracking-tight leading-none">10,000+</p>
              <p className="text-[12px] text-gray-500 font-semibold mt-1">Feasts Delivered Weekly</p>
              
              <div className="flex items-center gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#fbc42d] text-[#fbc42d]" />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Elegant organic leaf outline decoration at bottom right */}
      <div className="absolute bottom-0 right-0 w-44 sm:w-64 opacity-5 pointer-events-none select-none transform translate-y-6 translate-x-6">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white fill-current">
          <path d="M40 10C80 20 120 50 150 90C180 130 190 170 190 190C170 190 130 180 90 150C50 120 20 80 10 40C10 20 20 10 40 10Z" />
        </svg>
      </div>
    </section>
  );
}
