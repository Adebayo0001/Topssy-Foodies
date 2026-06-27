import React from "react";
import { motion } from "motion/react";
import { FoodItem } from "../types";
import { PROMO_MEALS } from "../data";

interface PromoBannersProps {
  onAddToCart: (item: FoodItem) => void;
}

export default function PromoBanners({ onAddToCart }: PromoBannersProps) {
  const handleOrder = (id: string) => {
    const meal = PROMO_MEALS.find((m) => m.id === id);
    if (meal) {
      onAddToCart(meal);
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left border-b border-gray-100 pb-8">
          <span className="text-xs font-bold text-[#1A3C34] tracking-[0.2em] uppercase mb-2 block font-mono">
            Exclusive Office Lunch Offers
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A3C34] tracking-tight font-sans max-w-3xl leading-snug">
            Enjoy a 40% discount on our fresh Tasty Meal bowls—perfect for your afternoon meeting.
          </h2>
        </div>

        {/* Pristine Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Yellow Theme */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="relative h-[260px] bg-[#fbc42d] rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between p-8 select-none group"
          >
            {/* Partially clipped image on the right */}
            <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none transition-transform duration-500 group-hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" 
                alt="Ewa Agoyin & Agege Bread"
                className="w-full h-full object-cover origin-center rounded-l-full translate-x-10 translate-y-2 scale-110 shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10 max-w-[55%] flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#113129]/70 tracking-wider uppercase block mb-1">
                  Sweet & Spicy Match
                </span>
                <h3 className="text-[22px] font-extrabold text-[#113129] tracking-tight leading-[1.15]">
                  Ewa Agoyin & Agege Bread
                </h3>
              </div>

              <div className="flex flex-col items-start gap-4">
                <span className="bg-[#113129] text-white text-[12px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Feast Deal
                </span>
                <button
                  onClick={() => handleOrder("ewa-agoyin-bread")}
                  className="bg-[#113129] text-white hover:bg-[#1a443a] px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Coral/Orange Theme */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="relative h-[260px] bg-[#e74c3c] rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between p-8 select-none group"
          >
            {/* Partially clipped image on the right */}
            <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none transition-transform duration-500 group-hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" 
                alt="Fiery Wood-Smoked Asun"
                className="w-full h-full object-cover origin-center rounded-l-full translate-x-10 translate-y-2 scale-110 shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10 max-w-[55%] flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] font-bold text-white/80 tracking-wider uppercase block mb-1">
                  Wood-Smoked Sensation
                </span>
                <h3 className="text-[22px] font-extrabold text-white tracking-tight leading-[1.15] uppercase">
                  Fiery Spicy Asun
                </h3>
              </div>

              <div className="flex flex-col items-start gap-4">
                <span className="bg-white text-[#e74c3c] text-[12px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Sizzling Hot
                </span>
                <button
                  onClick={() => handleOrder("spicy-goat-asun")}
                  className="bg-white text-[#e74c3c] hover:bg-gray-50 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Dark Green Theme */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="relative h-[260px] bg-[#113129] rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between p-8 select-none group"
          >
            {/* Partially clipped image on the right */}
            <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none transition-transform duration-500 group-hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1530610476181-d83430964d55?auto=format&fit=crop&w=600&q=80" 
                alt="Crispy Golden Puff Puff"
                className="w-full h-full object-cover origin-center rounded-l-full translate-x-10 translate-y-2 scale-110 shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10 max-w-[55%] flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] font-bold text-white/70 tracking-wider uppercase block mb-1">
                  Fluffy & Pillowy
                </span>
                <h3 className="text-[22px] font-extrabold text-white tracking-tight leading-[1.15]">
                  Golden Puff Puff Platter
                </h3>
              </div>

              <div className="flex flex-col items-start gap-4">
                <span className="bg-[#fbc42d] text-[#113129] text-[12px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Naija Classic
                </span>
                <button
                  onClick={() => handleOrder("sweet-golden-puff-puff")}
                  className="bg-[#fbc42d] text-[#113129] hover:bg-[#e2af25] px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
