import React from "react";
import { motion } from "motion/react";
import { Star, Quote, ShieldCheck } from "lucide-react";
import { REVIEWS } from "../data";

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-accent-red-orange tracking-[0.2em] uppercase mb-2">
            NIGERIA'S FINEST PALATES
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-green tracking-tight font-sans">
            Savor the Stories of Delish
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 font-sans font-light leading-relaxed">
            Discover why busy professionals, executive boards, and food enthusiasts across Lagos trust Delish 
            to bring authentic, fire-kissed flavor straight to their tables.
          </p>
          <div className="h-1 w-12 bg-accent-yellow mx-auto mt-4 rounded-full" />
        </div>

        {/* 3-Column Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between relative group select-none"
            >
              <div className="absolute top-6 right-8 text-gray-100 group-hover:text-accent-yellow/10 transition-colors">
                <Quote className="w-12 h-12 stroke-[4px]" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex gap-0.5 text-amber-400 mb-6">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-600 italic font-body leading-relaxed mb-8 relative z-10">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-accent-yellow shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <h4 className="text-sm font-extrabold text-primary-green tracking-tight font-sans">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-mono tracking-wide mt-0.5">
                    {rev.role}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Trust Stats Footer */}
        <div className="mt-16 bg-primary-green text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl max-w-4xl mx-auto border border-white/5">
          <div className="flex items-center gap-4 text-left">
            <div className="bg-accent-yellow text-primary-green p-3 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-tight">Royal Feasts & Large Gatherings</p>
              <p className="text-xs text-gray-300 font-sans">We curate exquisite spreads for office milestones, grand family celebrations, and premium corporate events.</p>
            </div>
          </div>
          
          {(() => {
            const [submitted, setSubmitted] = React.useState(false);
            if (submitted) {
              return (
                <div className="bg-[#1e463d] border border-accent-yellow/30 text-accent-yellow px-5 py-3 rounded-2xl text-xs font-bold font-sans animate-fade-in text-center sm:text-left">
                  Inquiry sent! We will contact you at royal@topssyfoodies.com
                </div>
              );
            }
            return (
              <button 
                onClick={() => setSubmitted(true)}
                className="bg-accent-yellow hover:bg-[#fbc02d] text-primary-green font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-2xl transition-all duration-300 cursor-pointer shrink-0"
              >
                Inquire Feast Plan
              </button>
            );
          })()}
        </div>

      </div>
    </section>
  );
}
