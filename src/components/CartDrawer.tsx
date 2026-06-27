import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, ArrowRight } from "lucide-react";
import { CartItem } from "../types";
import { formatNaira, getNormalizedPrice } from "../utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  
  // Calculate subtotal using normalized prices
  const subtotal = cart.reduce((acc, item) => {
    return acc + getNormalizedPrice(item.product.price) * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay with custom opacity/blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 pointer-events-auto"
            id="cart-backdrop"
          />

          {/* Drawer Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white z-50 shadow-2xl flex flex-col justify-between overflow-hidden select-none"
            id="cart-drawer-panel"
          >
            {/* Header Area */}
            <div className="p-6 bg-[#102420] text-white flex items-center justify-between border-b border-emerald-950 shrink-0">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-accent-yellow animate-bounce" />
                <div>
                  <h2 className="text-lg font-extrabold tracking-tight font-sans">
                    Your Gourmet Basket
                  </h2>
                  <p className="text-[10px] text-emerald-300 font-mono tracking-wider uppercase">
                    Marina Express Hub
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all cursor-pointer"
                title="Close Basket"
                id="close-cart-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product List Content */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                /* Empty basket state */
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="bg-emerald-50 text-[#113129]/60 p-5 rounded-full mb-6 ring-8 ring-emerald-50/50">
                    <ShoppingBag className="w-12 h-12" />
                  </div>
                  <h3 className="text-lg font-bold text-[#113129]">Your basket is empty</h3>
                  <p className="text-xs text-gray-400 mt-2 max-w-[260px] leading-relaxed font-sans">
                    Corporate power-lunches await! Add mouthwatering delicacies from our catalog to get started.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 bg-[#1A3C34] hover:bg-[#112722] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow"
                    id="empty-view-catalog-btn"
                  >
                    View Cuisines Catalog
                  </button>
                </div>
              ) : (
                /* Selected products */
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <p className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">
                      Selected Delicacies ({cart.reduce((s, i) => s + i.quantity, 0)})
                    </p>
                    <button
                      onClick={() => {
                        // Clear cart items via negative updates
                        cart.forEach(item => onUpdateQty(item.product.id, -item.quantity));
                      }}
                      className="text-xs text-red-500 hover:text-red-700 font-bold transition-colors cursor-pointer"
                      id="clear-all-cart-btn"
                    >
                      Clear All
                    </button>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {cart.map((item) => (
                      <div key={item.product.id} className="py-4 flex gap-4 items-center group" id={`cart-item-${item.product.id}`}>
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-16 h-16 object-cover rounded-2xl border border-gray-100/80 shrink-0 shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        
                        <div className="flex-grow min-w-0">
                          <h4 className="text-sm font-bold text-primary-green truncate font-sans">
                            {item.product.title}
                          </h4>
                          <p className="text-xs text-gray-400 font-mono mt-0.5">
                            {formatNaira(item.product.price)} each
                          </p>
                          
                          {/* Item Quantity counter and delete trigger */}
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center bg-gray-50 rounded-xl px-2 py-1 border border-gray-100">
                              <button
                                onClick={() => onUpdateQty(item.product.id, -1)}
                                className="p-1 text-gray-400 hover:text-primary-green transition-colors cursor-pointer"
                                title="Decrease"
                                id={`dec-qty-${item.product.id}`}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-xs font-bold font-mono text-primary-green">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQty(item.product.id, 1)}
                                className="p-1 text-gray-400 hover:text-primary-green transition-colors cursor-pointer"
                                title="Increase"
                                id={`inc-qty-${item.product.id}`}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Delete Item"
                              id={`remove-item-${item.product.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Line Total */}
                        <div className="text-right shrink-0">
                          <span className="text-sm font-black text-primary-green font-mono">
                            {formatNaira(getNormalizedPrice(item.product.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Aesthetic local logistics note */}
                  <div className="bg-emerald-50/50 border border-emerald-100/30 p-4 rounded-2xl text-[11px] text-[#113129] leading-relaxed mt-6">
                    ⚡ <b>Express Hub active:</b> Delivering hot, fresh gourmet power-lunches directly to desks in Marina, Broad Street, and surrounding towers.
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Checkout Summary Area */}
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100 shrink-0 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Office Subtotal:</span>
                    <span className="font-mono font-bold text-gray-700">{formatNaira(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Desk Courier Service:</span>
                    <span className="font-mono font-bold text-gray-700">
                      {subtotal > 15000 ? (
                        <span className="text-emerald-600 font-extrabold font-sans uppercase">FREE</span>
                      ) : (
                        formatNaira(1500)
                      )}
                    </span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200 flex justify-between text-base font-extrabold text-[#113129]">
                    <span>Total Basket:</span>
                    <span className="font-mono text-xl text-primary-green">
                      {formatNaira(subtotal > 15000 ? subtotal : subtotal + 1500)}
                    </span>
                  </div>
                </div>

                {/* Prominent Proceed to Checkout button */}
                <button
                  onClick={onProceedToCheckout}
                  className="w-full bg-[#1A3C34] hover:bg-[#112722] text-white font-extrabold py-4 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  id="proceed-to-checkout-btn"
                >
                  <CreditCard className="w-4 h-4 text-white" />
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
