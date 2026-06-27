import React, { useState } from "react";
import { ShoppingCart, LogIn, Menu, X, MapPin } from "lucide-react";
import { CartItem } from "../types";

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenLogin: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  user?: { name?: string; email: string; isAdmin?: boolean } | null;
}

export default function Header({
  cart,
  onOpenCart,
  onOpenLogin,
  activeSection,
  setActiveSection,
  currentPath = "/",
  onNavigate,
  user,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Menu & Flavors", id: "menu" },
    { name: "Locations", id: "locations" },
    { name: "Offers", id: "offers" },
    { name: "Reviews", id: "reviews" },
  ];

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    
    if (id === "locations") {
      if (onNavigate) {
        onNavigate("/locations");
      } else {
        setActiveSection("locations");
      }
      return;
    }
    
    if (id === "menu") {
      if (onNavigate) {
        onNavigate("/menu");
      } else {
        setActiveSection("menu");
        const element = document.getElementById("menu");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      if (onNavigate && currentPath !== "/") {
        onNavigate("/");
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      } else {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const handleLogoClick = () => {
    if (onNavigate && currentPath !== "/") {
      onNavigate("/");
    } else {
      handleLinkClick("home");
    }
  };

  return (
    <header id="header" className="sticky top-0 z-40 bg-primary-green text-white shadow-xl border-b border-primary-green/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-[80px] flex items-center justify-between">
        {/* Left: Brand Logo with styling and local reference */}
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 bg-[#fbc42d] rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300">
            {/* Elegant organic leaf icon inside gold circle */}
            <svg 
              className="w-6 h-6 text-[#113129] fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17 8C8 10 6 19 6 19s7-1 11-8c1-1.75 1.5-3.5 1-5-.5.5-1 1-1 2zm-5 6c-2.5 0-4.5-2-4.5-4.5S9.5 5 12 5s4.5 2 4.5 4.5-2 4.5-4.5 4.5z" opacity="0.15" />
              <path d="M21 3s-3.5-.5-7.5 3C9.5 9.5 8 13.5 8 18.5c0 1 .5 1.5 1.5 1.5.5 0 2-.5 4.5-3C18 13 19.5 9.5 21 3z" />
              <path d="M3 21s5-1 9-5c-1-1-2.5-1.5-4-1.5-1.5 0-3 .5-5 1.5v5z" />
            </svg>
          </div>
          <div>
            <span className="text-[25px] font-black tracking-tight font-sans text-white leading-none">
              Topssy Foodies
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`relative py-1 text-[15px] font-medium transition-all duration-300 hover:text-accent-yellow cursor-pointer ${
                activeSection === link.id ? "text-accent-yellow font-semibold" : "text-gray-200/90"
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right: Cart and Login */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenCart}
            id="cart-btn"
            className="flex items-center gap-2 bg-[#1b352f] hover:bg-[#152a25] px-5 py-2 rounded-full border border-white/10 transition-all duration-300 shadow-sm group cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm text-white">Cart</span>
            {totalCartItems > 0 ? (
              <span className="bg-[#fbc42d] text-[#113129] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {totalCartItems}
              </span>
            ) : (
              <span className="text-gray-400 text-xs">(0)</span>
            )}
          </button>

          {user ? (
            <button
              onClick={() => onNavigate && onNavigate(user.isAdmin ? "/admin" : "/profile")}
              id="profile-btn"
              className="flex items-center justify-center bg-[#FCD34D] text-[#1A3C34] hover:bg-[#ebd03d] border-none px-6 py-2 rounded-full text-sm font-extrabold transition-all duration-300 cursor-pointer shadow-sm"
            >
              <span>{user.isAdmin ? "Admin Portal" : "My Profile"}</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate ? onNavigate("/login") : onOpenLogin()}
              id="login-btn"
              className="flex items-center justify-center border border-white hover:bg-white hover:text-primary-green px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
            >
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenCart}
            className="relative p-2.5 bg-[#142e28] rounded-xl text-white"
          >
            <ShoppingCart className="w-5 h-5 text-accent-yellow" />
            <span className="absolute -top-1 -right-1 bg-accent-yellow text-primary-green text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalCartItems}
            </span>
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 hover:bg-white/5 rounded-xl text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-green border-t border-white/10 px-4 pt-4 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? "bg-accent-yellow/10 text-accent-yellow font-bold"
                    : "text-gray-200 hover:bg-white/5"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate && onNavigate(user.isAdmin ? "/admin" : "/profile");
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#FCD34D] text-[#1A3C34] py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer"
              >
                <span>{user.isAdmin ? "Admin Portal" : "My Profile"}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigate) {
                    onNavigate("/login");
                  } else {
                    onOpenLogin();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 border border-white/40 hover:border-accent-yellow py-3 rounded-xl text-sm font-medium transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
