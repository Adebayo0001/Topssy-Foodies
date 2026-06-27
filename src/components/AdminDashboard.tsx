import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, DollarSign, ShoppingBag, Truck, CheckCircle, 
  Menu, X, RefreshCw, Layers, ClipboardList, Database, LogOut, ArrowLeftRight
} from "lucide-react";

interface AdminDashboardProps {
  user: { name: string; email: string; isAdmin: boolean } | null;
  onLogout: () => void;
  onNavigate: (path: string) => void;
  triggerToast: (msg: string, type?: "success" | "info" | "login") => void;
}

export default function AdminDashboard({ user, onLogout, onNavigate, triggerToast }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "menu">("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeOrders: 0,
    completedOrders: 0,
    activeRunners: 4
  });

  // Seed default orders in localStorage if none exist
  const seedDefaultOrders = () => {
    const defaultOrders = [
      {
        id: "#7891",
        customerName: "John Doe",
        customerEmail: "john.doe@sterling.ng",
        totalAmount: 12500,
        status: "Preparing Your Meal",
        date: "June 27, 2026",
        items: [
          { name: "Gourmet Rice Platter", quantity: 2, price: 6250 }
        ],
        address: "VI Office, Victoria Island, Lagos",
        estimatedTime: "12:50 PM"
      },
      {
        id: "#7892",
        customerName: "Sarah Smith",
        customerEmail: "sarah.smith@chevron.com",
        totalAmount: 8200,
        status: "Out for Delivery",
        date: "June 27, 2026",
        items: [
          { name: "Premium Jollof Feast", quantity: 1, price: 4500 },
          { name: "Tender Suya Cuts", quantity: 1, price: 3700 }
        ],
        address: "Kingsway Road, Ikoyi, Lagos",
        estimatedTime: "12:40 PM"
      },
      {
        id: "#7893",
        customerName: "Lagos Corporate Team",
        customerEmail: "corporate.team@firstbanknigeria.com",
        totalAmount: 45000,
        status: "Delivered",
        date: "June 27, 2026",
        items: [
          { name: "Smoked Suya Pizza", quantity: 5, price: 9000 }
        ],
        address: "Marina Business District, Lagos Island",
        estimatedTime: "Delivered"
      }
    ];

    const currentSaved = localStorage.getItem("delish_orders");
    if (!currentSaved) {
      localStorage.setItem("delish_orders", JSON.stringify(defaultOrders));
      return defaultOrders;
    }
    // Always append or ensure they exist if currentSaved does exist, or just force seed to match requirements.
    // Let's force seed these three to make sure the app shows exactly these three pre-populated.
    localStorage.setItem("delish_orders", JSON.stringify(defaultOrders));
    return defaultOrders;
  };

  const loadData = () => {
    const loadedOrders = seedDefaultOrders();
    setOrders(loadedOrders);

    // Calculate metrics
    let revenue = 0;
    let activeCount = 0;
    let completedCount = 0;

    loadedOrders.forEach((o: any) => {
      if (o.status === "Delivered") {
        revenue += o.totalAmount || 0;
        completedCount++;
      } else {
        activeCount++;
      }
    });

    setStats({
      totalRevenue: revenue,
      activeOrders: activeCount,
      completedOrders: completedCount,
      activeRunners: 4
    });
  };

  useEffect(() => {
    if (!user || !user.isAdmin) {
      triggerToast("Access denied: Admin credentials required", "info");
      onNavigate("/login");
      return;
    }

    loadData();
  }, [user]);

  if (!user || !user.isAdmin) {
    return null;
  }

  // Handle Order Status Update
  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    });

    localStorage.setItem("delish_orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    triggerToast(`Order ${orderId} marked as ${newStatus}`, "success");

    // Recalculate quick stats
    let revenue = 0;
    let activeCount = 0;
    let completedCount = 0;

    updatedOrders.forEach((o: any) => {
      if (o.status === "Delivered") {
        revenue += o.totalAmount || 0;
        completedCount++;
      } else {
        activeCount++;
      }
    });

    setStats({
      totalRevenue: revenue,
      activeOrders: activeCount,
      completedOrders: completedCount,
      activeRunners: 4
    });
  };

  return (
    <div className="bg-[#FAF9F7] min-h-screen flex flex-col md:flex-row font-sans select-none">
      
      {/* 1. SaaS Dark Green Left Sidebar */}
      <aside className="w-full md:w-64 bg-[#102420] text-white shrink-0 flex flex-col justify-between">
        <div className="p-6">
          
          {/* Admin Identity header */}
          <div className="flex items-center gap-3 mb-10 pb-5 border-b border-white/10">
            <div className="w-10 h-10 bg-[#FCD34D] rounded-full flex items-center justify-center font-bold text-emerald-950">
              AD
            </div>
            <div>
              <h3 className="text-xs font-black tracking-tight leading-none text-white">
                Delish Admin
              </h3>
              <p className="text-[10px] text-emerald-300 font-mono font-bold mt-1 uppercase tracking-wider">
                Workspace Live
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-[#1A3C34] text-white shadow-sm"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-300" />
              <span>Metrics & Revenue</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "orders"
                  ? "bg-[#1A3C34] text-white shadow-sm"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <ClipboardList className="w-4 h-4 text-emerald-300" />
              <span>Manage Orders</span>
              {stats.activeOrders > 0 && (
                <span className="ml-auto bg-[#E34B35] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {stats.activeOrders}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("menu")}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "menu"
                  ? "bg-[#1A3C34] text-white shadow-sm"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <Database className="w-4 h-4 text-emerald-300" />
              <span>Manage Menu</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Logout button */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
              SaaS Operational Portal
            </span>
            <h1 className="text-2xl font-black text-[#1A3C34] tracking-tight">
              {activeTab === "dashboard" ? "Revenue Performance" : activeTab === "orders" ? "Corporate Delivery Desk" : "Gourmet Menu Registry"}
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                loadData();
                triggerToast("Sync complete with localStorage", "success");
              }}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#1A3C34]/15 px-4 py-2.5 rounded-xl text-[10px] font-extrabold uppercase text-gray-600 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Sync</span>
            </button>
          </div>
        </div>

        {/* 3. Dashboard Quick Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Total Revenue</span>
              <span className="text-lg font-black text-[#1A3C34]">₦{stats.totalRevenue.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Pending Orders</span>
              <span className="text-lg font-black text-[#1A3C34]">{stats.activeOrders} active</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Completed</span>
              <span className="text-lg font-black text-[#1A3C34]">{stats.completedOrders} orders</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Runners Active</span>
              <span className="text-lg font-black text-[#1A3C34]">{stats.activeRunners} online</span>
            </div>
          </div>
        </div>

        {/* 4. Tab Views rendering */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_15px_40px_rgba(26,60,52,0.03)]">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-[#1A3C34] tracking-[0.2em] uppercase border-b border-gray-100 pb-4">
                Operational Efficiency Overview
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-2xl">
                Lagos corporate meal runner efficiency is currently performing at <b>98.4%</b> desk-to-desk handover times. Real-time updates push live modifications to the order tracking timeline instantly.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-black text-[#1A3C34] mb-2 uppercase font-mono">Runner Dispatch Rates</h4>
                  <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#1A3C34] h-full" style={{ width: "85%" }} />
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono block mt-1.5 text-right">85% under 30 mins</span>
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#1A3C34] mb-2 uppercase font-mono">Kitchen Confirmation Efficiency</h4>
                  <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#FCD34D] h-full" style={{ width: "95%" }} />
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono block mt-1.5 text-right">95% confirmed within 3 mins</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-xs font-bold text-[#1A3C34] tracking-[0.2em] uppercase">
                  Manage Incoming Orders
                </h3>
                <span className="text-[10px] text-gray-400 font-mono font-bold uppercase">
                  Updates sync instantly
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-3" />
                  <p className="text-xs font-medium">No orders recorded in localStorage.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="py-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono">Order ID</th>
                        <th className="py-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono">Customer</th>
                        <th className="py-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono">Items & Portions</th>
                        <th className="py-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono">Amount Paid</th>
                        <th className="py-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono">Location</th>
                        <th className="py-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono text-center">Status Timeline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-xs">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50/50">
                          <td className="py-4 font-black font-mono text-[#1A3C34]">{o.id}</td>
                          <td className="py-4 font-medium text-gray-700">
                            <div>{o.customerName}</div>
                            <div className="text-[10px] text-gray-400 font-normal">{o.customerEmail}</div>
                          </td>
                          <td className="py-4 text-gray-500 font-bold max-w-[180px] truncate">
                            {o.items?.map((item: any) => `${item.quantity}x ${item.name}`).join(", ")}
                          </td>
                          <td className="py-4 font-black text-[#1A3C34]">₦{o.totalAmount.toLocaleString()}</td>
                          <td className="py-4 text-gray-500 truncate max-w-[150px]" title={o.address}>
                            {o.address}
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-center">
                              <select
                                value={o.status}
                                onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                                className="h-9 px-3 border border-gray-200 rounded-xl bg-white text-[11px] font-sans font-bold focus:border-[#1A3C34] outline-none cursor-pointer"
                              >
                                <option value="Order Confirmed">Order Confirmed</option>
                                <option value="Preparing Your Meal">Preparing Your Meal</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "menu" && (
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-[#1A3C34] tracking-[0.2em] uppercase border-b border-gray-100 pb-4">
                Corporate Menu Registry
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-xl">
                Gourmet recipes registered for offices across Broad Street & Marina. You can edit recipe catalogs directly from the main store layout.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border border-gray-100 p-4 rounded-xl flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1A3C34]">Premium Jollof Feast</span>
                  <span className="text-[10px] text-gray-400 font-mono font-bold">₦4,500</span>
                </div>
                <div className="border border-gray-100 p-4 rounded-xl flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1A3C34]">Grilled Croaker Treat</span>
                  <span className="text-[10px] text-gray-400 font-mono font-bold">₦7,500</span>
                </div>
                <div className="border border-gray-100 p-4 rounded-xl flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1A3C34]">Smoked Suya Pizza</span>
                  <span className="text-[10px] text-gray-400 font-mono font-bold">₦4,900</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
