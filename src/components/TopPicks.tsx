import React from "react";
import { motion } from "motion/react";
import { Star, Plus } from "lucide-react";
import { FoodItem } from "../types";
import { TOP_PICKS } from "../data";
import { formatNaira } from "../utils";

interface TopPicksProps {
  onAddToCart: (item: FoodItem) => void;
}

export default function TopPicks({ onAddToCart }: TopPicksProps) {
  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-[#e74c3c] tracking-[0.2em] uppercase mb-3">
            HANDPICKED FOR YOU
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#113129] tracking-tight font-sans">
            Our Top Picks
          </h2>
          <p className="mt-4 text-sm sm:text-[15px] text-gray-500 font-sans font-normal leading-relaxed">
            The meals corporate Lagos Island can't stop ordering — fresh, fast, and unforgettable.
          </p>
        </div>

        {/* 3-Column Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOP_PICKS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100/60 flex flex-col group relative"
            >
              {/* Card top: Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Add to Cart Button overlapping image bottom right */}
                <button
                  onClick={() => onAddToCart(item)}
                  id={`add-to-cart-${item.id}`}
                  className="absolute bottom-4 right-4 bg-[#113129] hover:bg-[#1a443a] text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer z-10"
                  title="Add to Cart"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Card bottom: Content */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-extrabold text-[#113129] tracking-tight font-sans">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-1 bg-[#f0f9f4] px-2 py-0.5 rounded-md text-[#113129] text-xs font-bold shrink-0">
                      <Star className="w-3 h-3 fill-current text-[#fbc42d]" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 font-sans font-normal mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-black text-[#113129] font-mono">
                    {formatNaira(item.price)}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
