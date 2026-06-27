import React from "react";
import { motion } from "motion/react";
import { MapPin, Building2, Navigation, Compass, ArrowLeft, Shield } from "lucide-react";

interface LocationsProps {
  onBackToHome: () => void;
}

export default function Locations({ onBackToHome }: LocationsProps) {
  const serviceZones = [
    {
      name: "Victoria Island",
      description: "Premium corporate delivery",
      status: "Active Delivery Zone",
      eta: "15-25 mins",
      icon: Building2,
      color: "bg-emerald-50 text-emerald-700 border-emerald-100"
    },
    {
      name: "Ikoyi",
      description: "Fast lunch drops",
      status: "Active Delivery Zone",
      eta: "20-30 mins",
      icon: Compass,
      color: "bg-amber-50 text-amber-700 border-amber-100"
    },
    {
      name: "Marina",
      description: "Downtown business hub",
      status: "Active Delivery Zone",
      eta: "15-20 mins",
      icon: Navigation,
      color: "bg-sky-50 text-sky-700 border-sky-100"
    },
    {
      name: "Lekki Phase 1",
      description: "Expanding soon!",
      status: "Launch Phase (Q3 2026)",
      eta: "Pre-registering Offices",
      icon: Shield,
      color: "bg-purple-50 text-purple-700 border-purple-100"
    }
  ];

  return (
    <div className="bg-[#FAF9F7] min-h-screen py-16 px-4 sm:px-6 md:px-8 font-sans select-none animate-fade-in">
      <div className="max-w-4xl mx-auto">
        
        {/* Back navigation */}
        <button
          onClick={onBackToHome}
          className="group mb-8 flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#1A3C34] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Homepage</span>
        </button>

        {/* Centered Premium White Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-[0_20px_50px_rgba(26,60,52,0.04)] overflow-hidden"
        >
          {/* Header Section */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
              Delivery Logistics & Coverage
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1A3C34] tracking-tight mt-2 mb-3">
              Where We Deliver
            </h1>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              We coordinate desk-to-desk gourmet runners specifically for the core business districts of Lagos Island. Check your office location status below.
            </p>
          </div>

          {/* Interactive Map Iframe Container */}
          <div className="mb-12 rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 relative aspect-video sm:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.91978255959!2d3.4079459247656247!3d6.428751500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8ad786e2eb9d%3A0x633513364f8ca8f8!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1719488000000!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Service Area Grid Header */}
          <div className="border-t border-gray-100 pt-10 mb-8">
            <h2 className="text-xs font-bold text-[#1A3C34] tracking-[0.2em] uppercase mb-1">
              Active Corporate Service Zones
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              Daily coverage operates Monday - Friday from 10:00 AM to 4:00 PM.
            </p>
          </div>

          {/* Service Area List: 4 column / 3 column responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {serviceZones.map((zone, i) => {
              const IconComp = zone.icon;
              return (
                <div
                  key={i}
                  className="bg-[#FAF9F7]/60 border border-gray-100 hover:border-[#1A3C34]/15 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-10 h-10 ${zone.color} rounded-xl flex items-center justify-center border mb-4`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-[#1A3C34] mb-1">
                      {zone.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-normal mb-3">
                      {zone.description}
                    </p>
                  </div>
                  <div className="border-t border-gray-100/80 pt-3 mt-3 flex flex-col gap-1">
                    <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                      {zone.status}
                    </span>
                    <span className="text-[10px] font-black text-[#1A3C34]">
                      {zone.eta}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Business Location at the bottom */}
          <div className="bg-[#1A3C34] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FCD34D] text-[#1A3C34] rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest font-mono block">
                  HQ Headquarters Office
                </span>
                <p className="text-sm font-bold mt-0.5">
                  Delish HQ
                </p>
                <p className="text-xs text-gray-200 mt-1 leading-relaxed max-w-md">
                  15 Adeola Odeku Street, Victoria Island, Lagos, Nigeria
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto shrink-0">
              <a
                href="https://maps.google.com/?q=15+Adeola+Odeku+Street+Victoria+Island+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto text-center bg-[#FCD34D] text-[#1A3C34] hover:bg-[#ebd03d] font-bold py-3 px-5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Get Directions
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
