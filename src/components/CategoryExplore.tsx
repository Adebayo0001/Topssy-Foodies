import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Flame, Pizza, Beef, Salad, Sparkles, FolderHeart } from "lucide-react";
import { CATEGORIES } from "../data";

interface CategoryExploreProps {
  onSelectCategory: (categoryName: string) => void;
}

export default function CategoryExplore({ onSelectCategory }: CategoryExploreProps) {
  // Map our category icons safely
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame": return <Flame className="w-5 h-5 text-amber-500" />;
      case "Pizza": return <Pizza className="w-5 h-5 text-red-500" />;
      case "Beef": return <Beef className="w-5 h-5 text-orange-600" />;
      case "Salad": return <Salad className="w-5 h-5 text-green-600" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-amber-600" />;
      default: return <FolderHeart className="w-5 h-5 text-primary-green" />;
    }
  };

  // Define offsets/positions for floating cards on desktop around a central circle
  const positions = [
    { top: "-10%", left: "40%", delay: 0.1 },   // Burgers (Top Center)
    { top: "30%", left: "-15%", delay: 0.2 },   // Pizzas (Left Center)
    { top: "35%", right: "-12%", delay: 0.3 },  // Crispy Fried (Right Center)
    { bottom: "-8%", left: "10%", delay: 0.4 },  // Sandwiches (Bottom Left)
    { bottom: "-8%", right: "12%", delay: 0.5 }, // Fresh Salads (Bottom Right)
  ];

  const handleCategoryClick = (catName: string) => {
    onSelectCategory(catName);
    // Smooth scroll to the top picks menu
    const element = document.getElementById("menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="about" className="py-24 bg-bg-light-green overflow-hidden relative">
      {/* Abstract circles for decorative depth */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-300/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Pizza graphic and 5 Floating Category Cards (7 cols on desktop) */}
          <div className="lg:col-span-7 flex justify-center items-center relative py-12 lg:py-16">
            
            {/* Central Round Plate Image with stunning native appeal */}
            <div className="relative w-72 sm:w-80 lg:w-[400px] h-72 sm:h-80 lg:h-[400px] rounded-full p-2 bg-amber-900/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=600&q=80"
                alt="Smoky Party Jollof Board"
                className="w-[92%] h-[92%] rounded-full object-cover shadow-inner rotate-12 group-hover:rotate-45 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Desktop Layout: 5 Floating White Cards */}
            <div className="hidden sm:block absolute inset-0 pointer-events-auto">
              {CATEGORIES.map((cat, index) => {
                const pos = positions[index] || { top: "0%", left: "0%", delay: 0.1 };
                return (
                  <motion.div
                    key={cat.id}
                    style={{
                      position: "absolute",
                      top: (pos as any).top,
                      left: (pos as any).left,
                      right: (pos as any).right,
                      bottom: (pos as any).bottom,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: pos.delay }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    onClick={() => handleCategoryClick(cat.name)}
                    className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-[0_12px_24px_rgba(26,60,52,0.08)] border border-white/50 cursor-pointer flex items-center gap-3 w-[190px] select-none hover:border-primary-green/20 group"
                  >
                    <div className="bg-bg-light-green p-3 rounded-xl group-hover:bg-accent-yellow transition-colors duration-300">
                      {getIcon(cat.icon)}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-primary-green tracking-tight line-clamp-1">{cat.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono font-medium mt-0.5">{cat.count}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Layout (Visible only on phone sizes, displays as neat grid below pizza) */}
            <div className="sm:hidden grid grid-cols-2 gap-4 mt-8 w-full">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex items-center gap-3 cursor-pointer"
                >
                  <div className="bg-bg-light-green p-2.5 rounded-xl">
                    {getIcon(cat.icon)}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-primary-green leading-tight">{cat.name}</p>
                    <p className="text-[9px] text-gray-400 font-mono mt-0.5">{cat.count}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Explanatory Copy & Categories (5 cols on desktop) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <p className="text-xs font-semibold text-accent-red-orange tracking-widest font-mono uppercase mb-2">
              MENU CATEGORIES
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-green tracking-tight font-sans leading-tight">
              Explore Our Authentic Nigerian Categories
            </h2>
            <p className="mt-6 text-sm sm:text-base text-gray-600 font-sans font-light leading-relaxed">
              We specialize in preparing premium culinary delights for discerning Nigerian palates. 
              Our menus offer pure firewood-smoky Jollof, smooth pounded swallows, authentic flame-grilled grills, 
              local sides, and refreshing traditional cold beverages.
            </p>
            <p className="mt-4 text-sm text-gray-500 font-sans font-light">
              Tap any floating category to filter our dynamic live catalog and discover your next spectacular feast instantly.
            </p>

            <div className="mt-8">
              <button
                onClick={() => handleCategoryClick("All")}
                className="group inline-flex items-center gap-3 bg-primary-green text-white hover:bg-emerald-950 px-7 py-3.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:shadow-primary-green/20 transition-all duration-300 cursor-pointer"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
