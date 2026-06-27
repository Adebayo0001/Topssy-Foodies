import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Lock, Mail, ArrowRight, ShieldCheck, Check, AlertCircle } from "lucide-react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
      
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess(user.email || email);
        setSuccess(false);
        setEmail("");
        setPassword("");
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error(err);
      let friendlyMessage = "Invalid workspace email or password.";
      if (err.code === "auth/user-not-found") {
        friendlyMessage = "No workspace account found with this email.";
      } else if (err.code === "auth/wrong-password") {
        friendlyMessage = "Incorrect secure password.";
      } else if (err.code === "auth/invalid-email") {
        friendlyMessage = "The email address is invalid.";
      }
      setError(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Ensure user document exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || user.email?.split("@")[0] || "Corporate Client",
          email: user.email?.toLowerCase().trim() || "",
          isAdmin: user.email?.toLowerCase().trim() === "admin@delishdrop.com",
          deliveryAddresses: []
        });
      }

      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess(user.email || "exec@google.com");
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setError("Google Workspace authentication dismissed or failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:max-w-md md:mx-auto bg-white rounded-[32px] p-6 sm:p-8 z-50 shadow-2xl overflow-hidden border border-gray-100 select-none"
          >
            {/* Header info */}
            <div className="flex justify-between items-start mb-6">
              <div className="text-left">
                <h3 className="text-xl font-extrabold text-primary-green tracking-tight font-sans">
                  Corporate Login
                </h3>
                <p className="text-xs text-gray-400 font-body mt-1">
                  Connect to your Delish office workspace.
                </p>
              </div>
              
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                title="Close Modal"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3.5 bg-red-50 border border-red-200/50 rounded-xl flex items-center gap-2.5 text-xs text-red-700 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {success ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full mb-4">
                  <Check className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-primary-green">Welcome Back!</h4>
                <p className="text-xs text-gray-500 font-body mt-1">Authenticating office token...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* SSO options */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2.5 border border-gray-200 hover:border-primary-green hover:bg-gray-50 h-12 rounded-xl text-xs font-semibold text-gray-700 transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.59 5.59 0 01-2.42 3.66v3.04h3.91c2.28-2.1 3.56-5.17 3.56-8.55z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.91-3.04c-1.08.73-2.47 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.39 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.32 14.25a7.16 7.16 0 010-4.5V6.6H1.21a11.94 11.94 0 000 10.8l4.11-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.12 1.21 6.6l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z"
                      />
                    </svg>
                    <span>Login with Google Workspace</span>
                  </button>
                </div>

                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-100" />
                  <span className="px-3 text-[10px] uppercase font-mono font-bold text-gray-400">or work email</span>
                  <div className="flex-grow border-t border-gray-100" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 font-mono">
                    Workspace Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@pwc.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-xl text-xs font-body focus:border-primary-green focus:ring-1 focus:ring-primary-green outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">
                      Secure Password
                    </label>
                    <a href="#forgot" className="text-[10px] text-accent-red-orange hover:underline font-mono">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-xl text-xs font-body focus:border-primary-green focus:ring-1 focus:ring-primary-green outline-none"
                    />
                  </div>
                </div>

                {/* Remember Me & Consent */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-primary-green focus:ring-primary-green" />
                    <span>Keep me logged in</span>
                  </label>
                </div>

                {/* Login CTA */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-primary-green hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-300"
                >
                  <span>{isLoading ? "Validating security token..." : "Login to Workspace"}</span>
                  <ArrowRight className="w-4 h-4 text-accent-yellow" />
                </button>

                {/* Secure certificate reassurance */}
                <div className="pt-3 border-t border-gray-100 flex items-center gap-2 justify-center text-[10px] text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ISO-27001 Certified Enterprise Portal</span>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
