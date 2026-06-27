import React from "react";
import { motion } from "motion/react";
import { Star, Flame } from "lucide-react";
const jollofHero = "https://lh3.googleusercontent.com/d/1PJgj7Z_JiHSTyYNrG-8CtnsGZBEYh1-Y";

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
          
          {/* 1. Left Column (Hero copy and CTAs - now wider to reduce image footprint) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col text-left"
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
            <p className="mt-8 text-[15px] sm:text-[16px] text-[#b3ccc5] leading-relaxed font-sans font-normal max-w-lg">
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
                Order Now
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

          {/* 2. Right Column (Now more compact) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end h-full"
          >
            <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl bg-[#142e28] border border-white/5">
              <img
                src={jollofHero}
                alt="Steaming Authentic Nigerian Delicacy with Flame-Grilled Chicken, Sweet Fried Plantains and Vegetables"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Soft overlay on image for rich color contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
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
