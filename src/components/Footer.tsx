import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ShieldAlert } from "lucide-react";

interface FooterProps {
  setActiveSection: (sec: string) => void;
}

export default function Footer({ setActiveSection }: FooterProps) {
  const handleLogoClick = () => {
    setActiveSection("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#102420] text-gray-300 border-t border-emerald-950 pt-16 pb-8 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-1 text-left">
            <div 
              onClick={handleLogoClick}
              className="flex items-center gap-2 cursor-pointer mb-5 group w-fit"
            >
              <div className="bg-accent-yellow text-primary-green p-1.5 rounded-lg group-hover:scale-105 transition-all">
                <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Topssy<span className="text-accent-yellow"> Foodies</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
              Crafting premium, authentic Nigerian culinary masterpieces. From our wood-fired hearths to your table, we deliver purely exquisite, smoky, slow-simmered perfection.
            </p>
            
            <div className="flex gap-4 mt-6">
              <a href="#facebook" className="text-gray-400 hover:text-accent-yellow transition-colors" title="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#instagram" className="text-gray-400 hover:text-accent-yellow transition-colors" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#twitter" className="text-gray-400 hover:text-accent-yellow transition-colors" title="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-5">
              Service Links
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a 
                  href="#home" 
                  onClick={() => { setActiveSection("home"); document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="hover:text-accent-yellow transition-colors"
                >
                  Home Office
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={() => { setActiveSection("about"); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="hover:text-accent-yellow transition-colors"
                >
                  About Our Cuisines
                </a>
              </li>
              <li>
                <a 
                  href="#menu" 
                  onClick={() => { setActiveSection("menu"); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="hover:text-accent-yellow transition-colors"
                >
                  Our Top Picks Catalog
                </a>
              </li>
              <li>
                <a 
                  href="#offers" 
                  onClick={() => { setActiveSection("offers"); document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="hover:text-accent-yellow transition-colors"
                >
                  Flash Lunch Deals
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Support */}
          <div className="text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-5">
              Delivery Hours
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
              <li className="flex justify-between">
                <span>Mon — Fri:</span>
                <span className="font-semibold text-white">8:00 AM — 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-semibold text-white">9:00 AM — 4:00 PM</span>
              </li>
              <li className="flex justify-between text-accent-yellow font-medium">
                <span>Sunday:</span>
                <span>Closed (Corp Rest)</span>
              </li>
              <li className="pt-2 border-t border-emerald-950/40 text-[11px] italic">
                *Catering deliveries can be pre-ordered 24h in advance.
              </li>
            </ul>
          </div>

          {/* Col 4: Reach Out */}
          <div className="text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-5">
              Island Logistics
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-5 h-5 text-accent-yellow shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Broad Street Corporate Hub, Marina, Lagos Island, Nigeria.
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-accent-yellow shrink-0" />
                <span className="text-white font-mono">+234 812 707 7777</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-accent-yellow shrink-0" />
                <span className="text-gray-400 font-mono">orders@topssyfoodies.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer & Small notes */}
        <div className="pt-8 border-t border-emerald-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Topssy Foodies Lounge Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-accent-yellow transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-accent-yellow transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
