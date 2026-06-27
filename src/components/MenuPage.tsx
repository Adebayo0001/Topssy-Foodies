import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Plus, CheckCircle, Flame, Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { FoodItem } from "../types";
import { formatNaira } from "../utils";

interface MenuPageProps {
  onAddToCart: (item: FoodItem) => void;
}

// 10 Gourmet Items with varying categories as specified in the prompt
const MENU_ITEMS: FoodItem[] = [
  {
    id: "menu-classic-cheeseburger",
    title: "Classic Cheeseburger",
    category: "Burgers",
    description: "Premium Nigerian flame-grilled beef patty, melted cheddar cheese, house relish, tomatoes, and crisp lettuce on a toasted brioche bun.",
    price: 5500,
    rating: 4.8,
    prepTime: "12 min",
    calories: "520 Cal",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "menu-suya-burger",
    title: "Spicy Suya Burger",
    category: "Burgers",
    description: "Gourmet double-patty layered with spicy local Suya Yaji pepper, caramelized red onions, sweet cabbage slaw, and signature house glaze.",
    price: 6500,
    rating: 4.9,
    prepTime: "15 min",
    calories: "580 Cal",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "menu-veggie-burger",
    title: "Veggie Avocado Burger",
    category: "Burgers",
    description: "House-crafted high-protein plant patty loaded with creamy Lagos avocado slices, sweet roasted tomatoes, and fresh garden microgreens.",
    price: 5200,
    rating: 4.7,
    prepTime: "10 min",
    calories: "450 Cal",
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "menu-jollof-pizza",
    title: "Smoky Jollof Pizza",
    category: "Pizza",
    description: "Stone-baked sourdough crust topped with rich, smoky firewood Jollof sauce, sliced chicken Suya, sweet peppers, and bubbling mozzarella.",
    price: 8500,
    rating: 4.9,
    prepTime: "18 min",
    calories: "780 Cal",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "menu-garden-pizza",
    title: "Garden Harvest Pizza",
    category: "Pizza",
    description: "Neapolitan-style stone-baked crust with roasted sweet corn, cherry tomatoes, button mushrooms, baby spinach, and cream cheese.",
    price: 7500,
    rating: 4.8,
    prepTime: "15 min",
    calories: "620 Cal",
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "menu-fountain-salad",
    title: "Fountain Oasis Salad",
    category: "Fresh Salads",
    description: "Crisp hand-picked romaine lettuce, ripe mango slices, wild berries, honey-glazed Lagos cashews, and a refreshing wild hibiscus-vinaigrette.",
    price: 4500,
    rating: 4.7,
    prepTime: "8 min",
    calories: "280 Cal",
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "menu-salmon-sandwich",
    title: "Smoked Salmon Sourdough",
    category: "Sandwiches",
    description: "Smoked Atlantic salmon, fresh avocado slices, pickled red onions, wild capers, and light cream spread on toasted artisanal sourdough.",
    price: 9000,
    rating: 4.8,
    prepTime: "10 min",
    calories: "410 Cal",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "menu-sweet-potato",
    title: "Sweet Potato Fries Platter",
    category: "Fried & Crispy",
    description: "Gently spiced, crispy hand-cut Nigerian sweet potatoes fried to deep golden perfection, served with a zesty scotch-bonnet garlic aioli.",
    price: 3500,
    rating: 4.6,
    prepTime: "10 min",
    calories: "380 Cal",
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "menu-chapman",
    title: "Signature Chapman Elixir",
    category: "Drinks",
    description: "Nigeria's legendary refreshing blend of citrus notes, hints of Angostura bitters, sweet blackcurrant syrup, and cucumber slices.",
    price: 4000,
    rating: 4.9,
    prepTime: "5 min",
    calories: "140 Cal",
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "menu-zobo",
    title: "Chilled Zobo Carafe",
    category: "Drinks",
    description: "Perfectly chilled wild hibiscus blossom extract slow-simmered with organic ginger root, sweet pineapple peel, and mint leaves.",
    price: 3000,
    rating: 4.8,
    prepTime: "5 min",
    calories: "90 Cal",
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80"
  }
];

const CATEGORY_TILES = [
  { name: "Burgers", emoji: "🍔", count: "3 Items" },
  { name: "Pizza", emoji: "🍕", count: "2 Items" },
  { name: "Fresh Salads", emoji: "🥗", count: "1 Item" },
  { name: "Sandwiches", emoji: "🥪", count: "1 Item" },
  { name: "Fried & Crispy", emoji: "🍟", count: "1 Item" },
  { name: "Drinks", emoji: "🍹", count: "2 Items" }
];

export default function MenuPage({ onAddToCart }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortByPrice, setSortByPrice] = useState<string>("default");
  const [sortByRating, setSortByRating] = useState<string>("default");
  const [dietary, setDietary] = useState<string>("all");

  // Filter and sort items dynamically
  const filteredAndSortedItems = useMemo(() => {
    let items = [...MENU_ITEMS];

    // 1. Category Filter
    if (selectedCategory) {
      items = items.filter(item => item.category === selectedCategory);
    }

    // 2. Dietary Filter
    if (dietary === "vegetarian") {
      items = items.filter(item => item.isVegetarian === true);
    }

    // 3. Sorting by Price
    if (sortByPrice === "low-to-high") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "high-to-low") {
      items.sort((a, b) => b.price - a.price);
    }

    // 4. Sorting by Rating
    if (sortByRating === "highest") {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [selectedCategory, sortByPrice, sortByRating, dietary]);

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      // Toggle to show all if selected again
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 animate-fade-in">
      
      {/* 1. Page Header Section */}
      <section className="bg-white border-b border-gray-100 py-16 text-center select-none">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-bold text-accent-red-orange tracking-[0.25em] uppercase mb-3">
            EXPLORE THE FEAST
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-primary-green tracking-tight font-sans leading-none">
            Our Menu
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 font-sans font-light max-w-xl mx-auto leading-relaxed">
            Freshly prepared, slow-simmered, and flame-kissed premium delicacies delivered directly to your Lagos Island sanctuary.
          </p>
          <div className="h-1 w-12 bg-accent-yellow mx-auto mt-6 rounded-full" />
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">

        {/* 2. Visual Category Tiles */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-[#113129] tracking-[0.2em] uppercase">
              Browse by Category
            </h3>
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-xs font-bold text-accent-red-orange hover:underline cursor-pointer"
              >
                Clear Filter (Show All)
              </button>
            )}
          </div>
          
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scroll-smooth -mx-6 px-6 sm:mx-0 sm:px-0">
            {CATEGORY_TILES.map((tile) => {
              const isSelected = selectedCategory === tile.name;
              return (
                <motion.div
                  key={tile.name}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => handleCategoryClick(tile.name)}
                  className={`flex-shrink-0 min-w-[130px] sm:min-w-[150px] bg-white p-5 rounded-2xl border text-center cursor-pointer transition-all duration-300 select-none ${
                    isSelected 
                      ? "border-accent-yellow ring-2 ring-accent-yellow/20 shadow-md" 
                      : "border-gray-100 hover:border-accent-yellow/50 shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <div className="text-3xl sm:text-4xl mb-3">{tile.emoji}</div>
                  <h4 className="text-sm font-extrabold text-[#113129] tracking-tight mb-0.5">{tile.name}</h4>
                  <p className="text-[10px] text-gray-400 font-semibold">{tile.count}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3. Filter & Sort Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Dietary Selection Pills */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#113129] uppercase tracking-wider mr-2 hidden sm:inline-block">Dietary:</span>
              <button
                onClick={() => setDietary("all")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  dietary === "all"
                    ? "bg-primary-green text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Foods
              </button>
              <button
                onClick={() => setDietary("vegetarian")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  dietary === "vegetarian"
                    ? "bg-primary-green text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Vegetarian 🍃
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-end">
            {/* Sort by Price Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <ArrowUpDown className="w-4 h-4 text-gray-400 shrink-0" />
              <select
                value={sortByPrice}
                onChange={(e) => setSortByPrice(e.target.value)}
                className="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 outline-none cursor-pointer focus:border-accent-yellow transition-colors"
              >
                <option value="default">Sort by: Price (Default)</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>

            {/* Sort by Rating Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Star className="w-4 h-4 text-gray-400 shrink-0" />
              <select
                value={sortByRating}
                onChange={(e) => setSortByRating(e.target.value)}
                className="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 outline-none cursor-pointer focus:border-accent-yellow transition-colors"
              >
                <option value="default">Sort by: Rating (Default)</option>
                <option value="highest">Highest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Food Item Grid */}
        <div className="relative">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedItems.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {filteredAndSortedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.03)] hover:shadow-xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100/60 flex flex-col group relative"
                  >
                    {/* Card top: Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {item.isVegetarian && (
                        <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                          Vegetarian 🍃
                        </span>
                      )}

                      {/* Floating Add to Cart Button overlapping image bottom right */}
                      <motion.button
                        onClick={() => onAddToCart(item)}
                        whileTap={{ scale: 0.85 }}
                        className="absolute bottom-3 right-3 bg-[#113129] hover:bg-[#1a443a] text-white p-2.5 rounded-full shadow-lg transition-all duration-300 group cursor-pointer z-10"
                        title="Add to Basket"
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>

                    {/* Card bottom: Content */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="text-base font-extrabold text-[#113129] tracking-tight font-sans leading-snug group-hover:text-[#1a443a] transition-colors">
                            {item.title}
                          </h3>
                          
                          <div className="flex items-center gap-1 bg-[#f0f9f4] px-1.5 py-0.5 rounded text-[#113129] text-[10px] font-extrabold shrink-0">
                            <Star className="w-2.5 h-2.5 fill-current text-[#fbc42d]" />
                            <span>{item.rating}</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-400 font-sans font-light leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                        <span className="text-lg font-black text-[#113129] font-mono">
                          {formatNaira(item.price)}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-1 rounded">
                          {item.prepTime}
                        </span>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl border border-gray-100 p-16 text-center select-none"
              >
                <div className="text-4xl mb-4">🍽️</div>
                <h4 className="text-lg font-extrabold text-[#113129] mb-1">No delicacies match your selection</h4>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  Try adjusting your dietary pills or selecting another visual category to reveal Lagos' finest feasts.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setDietary("all");
                    setSortByPrice("default");
                    setSortByRating("default");
                  }}
                  className="mt-6 bg-[#113129] hover:bg-[#1a443a] text-white text-xs font-bold py-3 px-6 rounded-2xl transition-all cursor-pointer shadow-sm"
                >
                  Reset All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
