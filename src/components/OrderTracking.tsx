import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, Flame, Bike, CheckCircle, ArrowLeft, Phone, MapPin, Clock, ShieldAlert, CreditCard, Loader2 } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

interface OrderTrackingProps {
  onBackToHome: () => void;
  userEmail?: string;
  orderAmount?: number;
}

export default function OrderTracking({ onBackToHome }: OrderTrackingProps) {
  const [orderId, setOrderId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [retryPaying, setRetryPaying] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<any>(null);

  // Parse order ID from query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("orderId") || params.get("ref") || params.get("reference") || params.get("trxref");
    if (id) {
      setOrderId(id);
    } else {
      setLoading(false);
      setError("No active order reference found in your browser address bar.");
    }
  }, []);

  // Check transaction verification with Paystack as a fallback load
  useEffect(() => {
    if (!orderId) return;

    const verifyTransactionOnLoad = async () => {
      try {
        console.log(`Fallback-checking transaction status for reference: ${orderId}`);
        const res = await fetch(`/api/paystack/verify/${orderId}`);
        const data = await res.json();
        console.log("Paystack verification result on mount:", data);
      } catch (err) {
        console.warn("Could not auto-verify Paystack on mount. This is fine, webhook will handle it.", err);
      }
    };

    verifyTransactionOnLoad();
  }, [orderId]);

  // Listen to Firestore document in real-time
  useEffect(() => {
    if (!orderId) return;

    setLoading(true);
    const orderDocRef = doc(db, "orders", orderId);

    const unsubscribe = onSnapshot(orderDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setActiveOrder({
          id: docSnap.id,
          statusString: data.status || "Payment Pending",
          currentStep: statusToStepNum(data.status),
          items: data.items || [],
          address: data.address || "Lagos Island, Nigeria",
          estimatedTime: data.status === "Delivered" ? "Delivered" : (data.estimatedTime || "Approx. 20 mins remaining"),
          driverName: data.driverName || "Babajide S.",
          driverPhone: data.driverPhone || "+234 803 123 4567",
          totalAmount: data.totalAmount || 0,
          customerEmail: data.customerEmail || ""
        });
        setError("");
      } else {
        setError(`Order document '${orderId}' could not be located in Firestore.`);
      }
      setLoading(false);
    }, (err) => {
      console.error("Firestore order tracking error: ", err);
      setError("Failed to stream order tracking status in real-time.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  const statusToStepNum = (status: string): number => {
    switch (status) {
      case "Payment Pending": return 0;
      case "Order Confirmed": return 1;
      case "Preparing Your Meal": return 2;
      case "Out for Delivery": return 3;
      case "Delivered": return 4;
      default: return 1;
    }
  };

  const handleRetryPayment = async () => {
    if (!activeOrder) return;
    setRetryPaying(true);
    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: activeOrder.customerEmail,
          amount: activeOrder.totalAmount,
          orderId: activeOrder.id
        })
      });

      const data = await response.json();
      if (!response.ok || !data.authorization_url) {
        throw new Error(data.error || "Could not spin up payment transaction.");
      }

      // Redirect user back to Paystack checkout
      window.location.href = data.authorization_url;
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to initialize Paystack checkout. Please try again.");
    } finally {
      setRetryPaying(false);
    }
  };

  // Steps configuration requested by the user
  const steps = [
    { label: "Order Confirmed", sub: "Kitchen has confirmed your desk order", stepNum: 1 },
    { label: "Preparing Your Meal", sub: "Our corporate executive chef is cooking", stepNum: 2 },
    { label: "Out for Delivery", sub: "Lagos Island runner navigating corridors", stepNum: 3 },
    { label: "Delivered", sub: "Handed over safely at your workspace", stepNum: 4 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-[#1A3C34] animate-spin" />
        <p className="text-xs text-gray-500 font-mono mt-4">Connecting to live tracking database...</p>
      </div>
    );
  }

  if (error || !activeOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
          <ShieldAlert className="w-12 h-12 text-[#E34B35] mx-auto mb-4" />
          <h2 className="text-sm font-bold text-[#1A3C34] uppercase tracking-wider mb-2">Tracking Error</h2>
          <p className="text-xs text-gray-500 leading-relaxed mb-6">{error || "No order details found."}</p>
          <button
            onClick={onBackToHome}
            className="bg-[#1A3C34] text-white hover:bg-[#112722] text-[10px] font-black uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all"
          >
            Go back to Gourmet Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 animate-fade-in select-none font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-[#1A3C34] text-xs font-black hover:text-accent-red-orange transition-colors mb-8 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Gourmet Hub</span>
        </button>

        {/* Master Tracking Container */}
        <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_15px_40px_rgba(26,60,52,0.05)]">
          
          {/* Dark Green Elegant Header */}
          <div className="bg-[#1A3C34] text-white p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
              <div>
                <span className="inline-block bg-[#245348] text-[#FCD34D] text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 border border-[#1f4239]">
                  Lagos Island Express
                </span>
                <h1 className="text-3xl font-black tracking-tight leading-none mb-1">
                  Order {activeOrder.id}
                </h1>
                <p className="text-xs text-emerald-200">
                  Real-time corporate desk runner delivery
                </p>
              </div>

              <div className="bg-emerald-950/40 border border-[#245348] p-4 rounded-2xl shrink-0">
                <span className="block text-[9px] font-bold text-emerald-300 uppercase tracking-wider font-mono">Current Status</span>
                <span className="text-sm font-black text-[#FCD34D] block mt-1 animate-pulse">
                  {activeOrder.statusString}
                </span>
              </div>
            </div>
          </div>

          {/* Pending Payment Callout (Step 0) */}
          {activeOrder.statusString === "Payment Pending" && (
            <div className="p-6 bg-amber-50 border-b border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-amber-800">Your Checkout Payment Is Pending</p>
                  <p className="text-[10px] text-amber-600 font-medium">Please finish authenticating transaction via Paystack to dispatch the kitchen.</p>
                </div>
              </div>
              <button
                onClick={handleRetryPayment}
                disabled={retryPaying}
                className="bg-amber-600 hover:bg-amber-700 text-white font-black text-[10px] uppercase tracking-wider px-5 py-3 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5 disabled:bg-gray-300"
              >
                {retryPaying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CreditCard className="w-3.5 h-3.5" />}
                <span>Retry Pay Now</span>
              </button>
            </div>
          )}

          {/* Stepper Timeline Area */}
          <div className="p-8 sm:p-10 border-b border-gray-100">
            <h3 className="text-xs font-bold text-[#1A3C34] tracking-[0.2em] uppercase mb-10">
              Delivery Progress
            </h3>

            {/* Stepper Layout */}
            <div className="relative">
              {/* Vertical connecting line for visual stepper */}
              <div className="absolute left-[21px] top-4 bottom-4 w-1 bg-gray-100" />

              <div className="space-y-8 relative">
                {steps.map((s) => {
                  const isCurrent = s.stepNum === activeOrder.currentStep;
                  const isPast = s.stepNum < activeOrder.currentStep;
                  const isFuture = s.stepNum > activeOrder.currentStep;

                  // Define colors:
                  // Past steps: Dark Green (#1A3C34)
                  // Current step: Accent Yellow (#FCD34D)
                  // Future steps: light gray (#E5E7EB)
                  let indicatorBg = "bg-[#E5E7EB]";
                  let iconColor = "text-gray-400";
                  let labelColor = "text-gray-400";
                  let subColor = "text-gray-400";

                  if (isPast) {
                    indicatorBg = "bg-[#1A3C34]";
                    iconColor = "text-white";
                    labelColor = "text-[#1A3C34] font-bold";
                    subColor = "text-gray-500";
                  } else if (isCurrent) {
                    indicatorBg = "bg-[#FCD34D]";
                    iconColor = "text-[#1A3C34]";
                    labelColor = "text-[#1A3C34] font-black scale-105 origin-left";
                    subColor = "text-gray-600 font-medium";
                  }

                  // Pick icons per step
                  const renderIcon = () => {
                    if (s.stepNum === 1) return <Check className="w-4 h-4" />;
                    if (s.stepNum === 2) return <Flame className="w-4 h-4" />;
                    if (s.stepNum === 3) return <Bike className="w-4 h-4" />;
                    return <CheckCircle className="w-4 h-4" />;
                  };

                  return (
                    <div key={s.stepNum} className="flex gap-6 items-start">
                      {/* Round indicator bubble */}
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-500 shadow-sm ${indicatorBg} ${iconColor}`}>
                        {renderIcon()}
                      </div>

                      {/* Labels */}
                      <div className="pt-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm tracking-tight ${labelColor}`}>
                            {s.label}
                          </h4>
                          {isCurrent && (
                            <span className="bg-[#FCD34D]/20 text-[#1A3C34] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full animate-pulse">
                              Active Step
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-0.5 ${subColor}`}>
                          {s.sub}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Delivery Details Summary Block */}
          <div className="p-8 sm:p-10 bg-gray-50/50 space-y-6">
            <h4 className="text-xs font-bold text-[#1A3C34] tracking-[0.2em] uppercase">
              Delivery Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Address & Time */}
              <div className="space-y-4">
                <div className="flex gap-3.5 items-start">
                  <div className="bg-[#1A3C34]/10 p-2.5 rounded-xl text-[#1A3C34]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Office Destination</span>
                    <p className="text-xs text-gray-700 font-sans font-bold mt-1 leading-relaxed">
                      {activeOrder.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="bg-[#1A3C34]/10 p-2.5 rounded-xl text-[#1A3C34]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Estimated Arrival</span>
                    <p className="text-xs text-gray-700 font-sans font-bold mt-1">
                      {activeOrder.estimatedTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Driver Details & Call Action */}
              <div className="bg-white border border-gray-100 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1A3C34]/5 rounded-full flex items-center justify-center font-bold text-[#1A3C34] text-xs">
                    {activeOrder.driverName ? activeOrder.driverName.split(" ").map((n: string) => n[0]).join("") : "BS"}
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold text-[#1A3C34]">
                      {activeOrder.driverName}
                    </h5>
                    <p className="text-[10px] text-gray-400 font-medium">
                      DelishDrop Gourmet Desk Runner
                    </p>
                  </div>
                </div>

                {/* Contact Driver Button */}
                <a
                  href={`tel:${activeOrder.driverPhone}`}
                  className="mt-4 w-full bg-white hover:bg-gray-50 border border-gray-200 text-[#1A3C34] hover:text-[#112722] font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact Driver</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Back home action button */}
        <div className="text-center mt-10">
          <button
            onClick={onBackToHome}
            className="bg-[#1A3C34] hover:bg-[#112722] text-white text-xs font-bold py-4 px-8 rounded-2xl uppercase tracking-wider transition-all shadow"
          >
            Return to Gourmet Hub
          </button>
        </div>

      </div>
    </div>
  );
}
