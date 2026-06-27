import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, Clock, Flame, ShoppingBag, Timer, Plus, Minus, Check } from "lucide-react";
import { FoodItem } from "../types";
import { FLASH_DEALS } from "../data";
import { formatNaira } from "../utils";

interface FlashDealsProps {
  onAddToCart: (item: FoodItem, qty: number) => void;
}

export default function FlashDeals({ onAddToCart }: FlashDealsProps) {
  // Real-time ticking countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 52,
    seconds: 12
  });

  const [quantities, setQuantities] = useState<Record<string, number>>({
    "naija-fried-rice": 1,
    "catfish-pepper-soup": 1,
    "crispy-yam-dun-dun": 1,
    "chilled-zobo-drink": 1
  });

  const [addedItem, setAddedItem] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to keep the deal alive in the preview
          return { hours: 5, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const adjustQty = (id: string, amount: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + amount);
      return { ...prev, [id]: next };
    });
  };

  const handleAddToCart = (item: FoodItem) => {
    const qty = quantities[item.id] || 1;
    onAddToCart(item, qty);
    setAddedItem(item.id);
    setTimeout(() => {
      setAddedItem(null);
    }, 1500);
  };

  return (
    <section id="offers" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header Block with Countdown */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="text-center md:text-left">
            <p className="text-xs font-bold text-accent-red-orange tracking-[0.2em] uppercase mb-2">
              SIZZLING DAILY SENSATIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-green tracking-tight font-sans">
              Hot Flash Deals: Claim Your Feast Before It's Gone!
            </h2>
            <div className="h-1 w-12 bg-accent-yellow mt-4 rounded-full hidden md:block" />
          </div>

          {/* TIMER BOX */}
          <div className="flex items-center gap-4 bg-primary-green text-white px-6 py-4 rounded-3xl shadow-xl border border-white/5 select-none animate-pulse">
            <div className="bg-accent-yellow/20 p-2.5 rounded-2xl text-accent-yellow">
              <Timer className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-center">
                <span className="text-2xl font-mono font-extrabold block tracking-tight text-accent-yellow">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gray-300 font-mono">Hours</span>
              </div>
              <span className="text-2xl font-mono text-gray-400 font-bold mb-4">:</span>
              <div className="text-center">
                <span className="text-2xl font-mono font-extrabold block tracking-tight text-accent-yellow">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gray-300 font-mono">Mins</span>
              </div>
              <span className="text-2xl font-mono text-gray-400 font-bold mb-4">:</span>
              <div className="text-center">
                <span className="text-2xl font-mono font-extrabold block tracking-tight text-accent-yellow animate-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gray-300 font-mono">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FLASH_DEALS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[32px] overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-[0_20px_45px_rgba(26,60,52,0.12)] border border-gray-100/90 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Discount Tag */}
              <div className="absolute top-4 left-4 z-10 bg-accent-red-orange text-white text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                {item.badge}
              </div>

              {/* Food Image */}
              <div className="relative h-48 overflow-hidden bg-gray-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Core Info */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-accent-red-orange uppercase tracking-wider font-mono">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold font-mono">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-primary-green tracking-tight line-clamp-1 group-hover:text-accent-red-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-body line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Pricing & Quantity Controls */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      {item.originalPrice && (
                        <span className="text-[10px] text-gray-400 line-through font-mono block">
                          {formatNaira(item.originalPrice)}
                        </span>
                      )}
                      <span className="text-xl font-extrabold text-accent-red-orange font-mono">
                        {formatNaira(item.price)}
                      </span>
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex items-center bg-gray-100 rounded-xl px-2 py-1 border border-gray-200">
                      <button
                        onClick={() => adjustQty(item.id, -1)}
                        className="p-1 text-gray-500 hover:text-primary-green transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold font-mono text-primary-green">
                        {quantities[item.id] || 1}
                      </span>
                      <button
                        onClick={() => adjustQty(item.id, 1)}
                        className="p-1 text-gray-500 hover:text-primary-green transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`w-full mt-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      addedItem === item.id
                        ? "bg-emerald-600 text-white shadow-md"
                        : "bg-primary-green hover:bg-emerald-950 text-white shadow-lg shadow-emerald-900/10"
                    }`}
                  >
                    {addedItem === item.id ? (
                      <>
                        <Check className="w-4 h-4 text-accent-yellow" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-accent-yellow" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
