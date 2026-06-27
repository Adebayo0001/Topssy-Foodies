import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertCircle, ShoppingBag, X, LogOut, Sparkles } from "lucide-react";

import { FoodItem, CartItem } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PromoBanners from "./components/PromoBanners";
import TopPicks from "./components/TopPicks";
import CategoryExplore from "./components/CategoryExplore";
import FlashDeals from "./components/FlashDeals";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import LoginModal from "./components/LoginModal";
import MenuPage from "./components/MenuPage";
import CheckoutModal from "./components/CheckoutModal";
import OrderTracking from "./components/OrderTracking";
import AIChatbot from "./components/AIChatbot";
import AuthPages from "./components/AuthPages";
import UserProfile from "./components/UserProfile";
import AdminDashboard from "./components/AdminDashboard";
import Locations from "./components/Locations";
import Subscription from "./components/Subscription";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState("home");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutAmount, setCheckoutAmount] = useState(0);
  const [user, setUser] = useState<{ name: string; email: string; isAdmin: boolean } | null>(() => {
    const saved = localStorage.getItem("delish_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Client-side lightweight routing state
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname;
    const allowed = ["/menu", "/order-tracking", "/tracking", "/login", "/register", "/profile", "/admin", "/locations"];
    return allowed.includes(path) ? path : "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const allowed = ["/menu", "/order-tracking", "/tracking", "/login", "/register", "/profile", "/admin", "/locations"];
      setCurrentPath(allowed.includes(path) ? path : "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  
  // Custom interactive toast state
  const [toast, setToast] = useState<{
    id: string;
    message: string;
    type: "success" | "info" | "login";
  } | null>(null);

  // Scroll spy to update active section in header
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "menu", "offers", "reviews"];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show customized floating toast
  const triggerToast = (message: string, type: "success" | "info" | "login" = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToast({ id, message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Add Item to Cart (reactive supporting top picks + flash deals + promo cards)
  const handleAddToCart = (product: FoodItem, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      
      if (existingIndex > -1) {
        // Increment quantity
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        // Add new item
        return [...prevCart, { product, quantity }];
      }
    });

    triggerToast(`Added ${quantity}x ${product.title} to your basket!`, "success");
  };

  // Adjust basket quantity from Drawer
  const handleUpdateQty = (productId: string, diff: number) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === productId);
      if (existingIndex === -1) return prevCart;

      const updated = [...prevCart];
      const currentQty = updated[existingIndex].quantity;
      const nextQty = currentQty + diff;

      if (nextQty <= 0) {
        // Remove item if quantity falls to zero
        triggerToast(`Removed ${updated[existingIndex].product.title} from basket`, "info");
        return prevCart.filter((item) => item.product.id !== productId);
      } else {
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: nextQty
        };
        return updated;
      }
    });
  };

  const handleRemoveItem = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    if (item) {
      triggerToast(`Removed ${item.product.title} from basket`, "info");
    }
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleLoginSuccess = (userData: { name: string; email: string; isAdmin: boolean }) => {
    setUser(userData);
    triggerToast(`Welcome back, ${userData.name || userData.email}!`, "login");
  };

  const handleLogout = () => {
    localStorage.removeItem("delish_current_user");
    setUser(null);
    triggerToast("Logged out of enterprise workspace", "info");
    handleNavigate("/");
  };

  const handlePaymentSuccess = (email: string, amount: number) => {
    setIsCheckoutOpen(false);
    setCart([]);
    setCheckoutEmail(email);
    setCheckoutAmount(amount);
    setIsCartOpen(false);
    triggerToast("Order Confirmed! Your premium gourmet lunch is being queued.", "success");
    handleNavigate("/order-tracking");
  };

  if (currentPath === "/admin") {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF9F7]">
        <AdminDashboard
          user={user}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          triggerToast={triggerToast}
        />
        {/* Global Floating AI Chatbot Widget */}
        <AIChatbot />
        
        {/* FLOATING INTERACTIVE TOAST SYSTEM */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-6 right-6 z-50 bg-[#102420] text-white py-4 px-6 rounded-2xl shadow-[0_15px_40px_rgba(16,36,32,0.15)] flex items-center gap-3.5 border border-emerald-950/20 max-w-sm select-none"
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-[#FCD34D] shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-emerald-300 shrink-0" />
              )}
              <span className="text-xs font-sans font-extrabold tracking-tight">
                {toast.message}
              </span>
              <button onClick={() => setToast(null)} className="ml-auto text-emerald-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-deep-charcoal flex flex-col font-sans">
      
      {/* 1. Sticky Navigation Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentPath={currentPath}
        onNavigate={handleNavigate}
        user={user}
      />

      {/* Corporate User Indicator Bar */}
      {user && (
        <div className="bg-[#142e28] text-white px-4 py-2 border-b border-emerald-950/20 text-xs flex justify-between items-center select-none shrink-0 font-mono">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Workspace Active: <b>{user.email}</b></span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1 hover:text-accent-yellow transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* Main Body Content Blocks */}
      <main className="flex-grow animate-fade-in-up pb-20 md:pb-0">
        {currentPath === "/order-tracking" || currentPath === "/tracking" ? (
          <OrderTracking
            onBackToHome={() => handleNavigate("/")}
            userEmail={checkoutEmail}
            orderAmount={checkoutAmount}
          />
        ) : currentPath === "/menu" ? (
          <MenuPage onAddToCart={handleAddToCart} />
        ) : currentPath === "/login" ? (
          <AuthPages
            mode="login"
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
            triggerToast={triggerToast}
          />
        ) : currentPath === "/register" ? (
          <AuthPages
            mode="register"
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
            triggerToast={triggerToast}
          />
        ) : currentPath === "/profile" ? (
          <UserProfile
            user={user}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        ) : currentPath === "/locations" ? (
          <Locations onBackToHome={() => handleNavigate("/")} />
        ) : (
          <>
            {/* 2. Hero Section (3-part responsive design) */}
            <Hero />

            {/* 3. Promotional Banners Grid (3 columns) */}
            <PromoBanners onAddToCart={handleAddToCart} />

            {/* 4. Top Picks Section (Catalog grid with circular "+" add triggers) */}
            <TopPicks onAddToCart={handleAddToCart} />

            {/* 5. Explore Cuisine by Category Section (Circular arrangement pizza slice layout) */}
            <CategoryExplore onSelectCategory={(catName) => triggerToast(`Filtered menu by: ${catName}`, "info")} />

            {/* 6. Flash Deals Section (Countdown timers and direct adds) */}
            <FlashDeals onAddToCart={handleAddToCart} />

            {/* 7. Corporate Reviews Section */}
            <Reviews />

            {/* Email Subscription Component */}
            <Subscription triggerToast={triggerToast} />
          </>
        )}
      </main>

      {/* 8. Modern Footer */}
      <Footer setActiveSection={setActiveSection} />

      {/* Slidout Shopping Cart Sidebar Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Popover Login Authentication Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(email) => {
          const savedUsersStr = localStorage.getItem("delish_users");
          const savedUsers = savedUsersStr ? JSON.parse(savedUsersStr) : [];
          const matched = savedUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
          
          const profile = matched || {
            name: email.split("@")[0].split(".")[0].toUpperCase(),
            email,
            isAdmin: email.toLowerCase() === "admin@delishdrop.com" || email.toLowerCase().includes("admin")
          };
          
          localStorage.setItem("delish_current_user", JSON.stringify(profile));
          handleLoginSuccess(profile);
        }}
      />

      {/* Premium 3-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onPaymentSuccess={handlePaymentSuccess}
        triggerToast={triggerToast}
      />

      {/* Global Floating AI Chatbot Widget */}
      <AIChatbot />

       {/* FLOATING INTERACTIVE TOAST SYSTEM (TOP-RIGHT) */}
       <AnimatePresence>
         {toast && (
           <motion.div
             initial={{ opacity: 0, y: -50, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: -20, scale: 0.95 }}
             className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#1A3C34] border border-[#FCD34D]/30 text-white px-5 py-4 rounded-2xl shadow-2xl max-w-sm select-none"
           >
             {toast.type === "success" && (
               <CheckCircle className="w-5 h-5 text-[#FCD34D] shrink-0" />
             )}
             {toast.type === "info" && (
               <AlertCircle className="w-5 h-5 text-[#FCD34D] shrink-0" />
             )}
             {toast.type === "login" && (
               <Sparkles className="w-5 h-5 text-[#FCD34D] shrink-0 fill-current" />
             )}
             
             <div className="text-xs font-semibold leading-normal font-sans pr-4">
               {toast.message}
             </div>

             <button
               onClick={() => setToast(null)}
               className="text-white/60 hover:text-white p-0.5 rounded-lg transition-colors cursor-pointer"
             >
               <X className="w-4 h-4" />
             </button>
           </motion.div>
         )}
       </AnimatePresence>

    </div>
  );
}
