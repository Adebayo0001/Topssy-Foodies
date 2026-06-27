import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { User, Mail, ShoppingBag, LogOut, ChevronRight, MapPin, Calendar, Clock, AlertCircle } from "lucide-react";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

interface UserProfileProps {
  user: { name: string; email: string; isAdmin: boolean } | null;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

export default function UserProfile({ user, onLogout, onNavigate }: UserProfileProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      onNavigate("/login");
      return;
    }

    const fetchUserOrders = async () => {
      setLoading(true);
      try {
        const ordersRef = collection(db, "orders");
        // Try query with orderby
        try {
          const q = query(
            ordersRef,
            where("customerEmail", "==", user.email.toLowerCase().trim()),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const fetchedOrders: any[] = [];
          querySnapshot.forEach((doc) => {
            fetchedOrders.push({ id: doc.id, ...doc.data() });
          });
          setOrders(fetchedOrders);
        } catch (indexErr) {
          console.warn("Index not ready or query failed, falling back to manual sort:", indexErr);
          // Fallback to query without orderBy and sort in memory
          const q = query(
            ordersRef,
            where("customerEmail", "==", user.email.toLowerCase().trim())
          );
          const querySnapshot = await getDocs(q);
          const fetchedOrders: any[] = [];
          querySnapshot.forEach((doc) => {
            fetchedOrders.push({ id: doc.id, ...doc.data() });
          });
          fetchedOrders.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });
          setOrders(fetchedOrders);
        }
      } catch (err) {
        console.error("Error loading user orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user]);

  if (!user) {
    return null;
  }

  const handleTrackOrderClick = (orderId: string) => {
    onNavigate(`/tracking?orderId=${orderId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 font-sans select-none">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_15px_40px_rgba(26,60,52,0.04)] border border-gray-100 relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent-yellow/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-20 h-20 bg-[#1A3C34] text-[#FCD34D] rounded-full flex items-center justify-center font-black text-2xl shadow-md border-4 border-white shrink-0">
            {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
          </div>

          <div className="text-center sm:text-left flex-grow">
            <span className="inline-block bg-[#1A3C34]/10 text-[#1A3C34] text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2">
              Corporate Guest
            </span>
            <h1 className="text-2xl font-black text-[#1A3C34] tracking-tight">{user.name}</h1>
            <p className="text-xs text-gray-500 flex items-center justify-center sm:justify-start gap-1.5 mt-1 font-medium">
              <Mail className="w-3.5 h-3.5" />
              <span>{user.email}</span>
            </p>
          </div>

          <div className="shrink-0 pt-4 sm:pt-0">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-extrabold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Order History Listing Section */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_15px_40px_rgba(26,60,52,0.04)] border border-gray-100">
          <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
            <h3 className="text-sm font-bold text-[#1A3C34] uppercase tracking-[0.2em]">
              Your Order History
            </h3>
            <span className="bg-gray-100 text-gray-600 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="py-12 text-center max-w-sm mx-auto">
              <div className="bg-gray-50 text-gray-400 p-4 rounded-full inline-flex mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-[#1A3C34]">No Past Orders Yet</h4>
              <p className="text-xs text-gray-400 mt-2 font-medium">
                Delicious food options are waiting for you in the menu! Get your workspace lunch delivered now.
              </p>
              <button
                onClick={() => onNavigate("/menu")}
                className="mt-6 bg-[#1A3C34] hover:bg-[#112722] text-white text-[10px] font-black uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors shadow cursor-pointer"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, idx) => {
                // Determine colors based on status
                let statusBg = "bg-gray-100 text-gray-600";
                if (order.status === "Order Confirmed") statusBg = "bg-sky-50 text-sky-700 border border-sky-200/30";
                else if (order.status === "Preparing Your Meal") statusBg = "bg-amber-50 text-amber-700 border border-amber-200/30";
                else if (order.status === "Out for Delivery") statusBg = "bg-purple-50 text-purple-700 border border-purple-200/30";
                else if (order.status === "Delivered") statusBg = "bg-emerald-50 text-emerald-700 border border-emerald-200/30";

                return (
                  <div
                    key={order.id || idx}
                    className="border border-gray-100 rounded-2xl p-5 hover:border-[#1A3C34]/15 hover:shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    {/* Left details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#1A3C34] font-mono">
                          {order.id}
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusBg}`}>
                          {order.status || "Processing"}
                        </span>
                      </div>

                      <div className="text-[11px] text-gray-400 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{order.date}</span>
                        </span>
                        <span>•</span>
                        <span>
                          {order.items?.length || 0} {order.items?.length === 1 ? "Item" : "Items"}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 font-bold max-w-md truncate">
                        {order.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(", ") || "Lunch order"}
                      </p>
                    </div>

                    {/* Right Price & Actions */}
                    <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-0 border-gray-50">
                      <div className="text-left md:text-right">
                        <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider font-mono">Total Paid</span>
                        <span className="text-sm font-black text-[#1A3C34]">
                          ₦{(order.totalAmount || 0).toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => handleTrackOrderClick(order.id)}
                        className="flex items-center gap-1 bg-[#1A3C34]/5 hover:bg-[#1A3C34]/10 text-[#1A3C34] font-bold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        <span>Track Order</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
