import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AuthPagesProps {
  mode: "login" | "register";
  onNavigate: (path: string) => void;
  onLoginSuccess: (user: { name: string; email: string; isAdmin: boolean }) => void;
  triggerToast: (msg: string, type?: "success" | "info" | "login") => void;
}

export default function AuthPages({ mode, onNavigate, onLoginSuccess, triggerToast }: AuthPagesProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "register") {
        if (!fullName.trim() || !email.trim() || !password.trim()) {
          setError("Please fill in all details.");
          setIsLoading(false);
          return;
        }

        // Firebase Auth Create User
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const user = userCredential.user;

        // Is admin flag check
        const isAdminUser = email.trim().toLowerCase() === "admin@delishdrop.com";

        // Create user profile in Firestore
        const userProfile = {
          uid: user.uid,
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          isAdmin: isAdminUser,
          deliveryAddresses: ["Lagos Island Office", "VI High-Rise Building", "Ikoyi Penthouse Suite"]
        };

        await setDoc(doc(db, "users", user.uid), userProfile);

        triggerToast(`Welcome to DelishDrop, ${fullName.trim()}!`, "success");
        onLoginSuccess({
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          isAdmin: isAdminUser
        });
        
        onNavigate("/profile");
      } else {
        // Login Logic
        if (!email.trim() || !password.trim()) {
          setError("Please provide your email and password.");
          setIsLoading(false);
          return;
        }

        // Firebase Auth Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
        const user = userCredential.user;

        // Fetch user profile from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        let userName = fullName || user.email || "Corporate User";
        let isAdmin = email.trim().toLowerCase() === "admin@delishdrop.com";

        if (userDocSnap.exists()) {
          const profileData = userDocSnap.data();
          userName = profileData.name || userName;
          isAdmin = !!profileData.isAdmin;
        } else {
          // If no document exists in Firestore (e.g. legacy auth or developer preset), create one
          const defaultProfile = {
            uid: user.uid,
            name: userName,
            email: user.email?.toLowerCase() || "",
            isAdmin: isAdmin,
            deliveryAddresses: ["Lagos Island Office"]
          };
          await setDoc(userDocRef, defaultProfile);
        }

        const loginUser = {
          name: userName,
          email: user.email || "",
          isAdmin: isAdmin
        };

        triggerToast(`Welcome back, ${userName}!`, "login");
        onLoginSuccess(loginUser);
        
        if (isAdmin) {
          onNavigate("/admin");
        } else {
          onNavigate("/profile");
        }
      }
    } catch (err: any) {
      console.error("Firebase Authentication Error: ", err);
      let errMsg = err.message || "Authentication failed. Please verify credentials.";
      if (err.code === "auth/email-already-in-use") {
        errMsg = "This email address is already in use. Try signing in instead.";
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        errMsg = "Invalid email or password combination. Please try again.";
      } else if (err.code === "auth/user-not-found") {
        errMsg = "No account found with this email. Please register first.";
      } else if (err.code === "auth/weak-password") {
        errMsg = "Password is too weak. Please use at least 6 characters.";
      }
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsAdminDefault = () => {
    setEmail("admin@delishdrop.com");
    setPassword("admin123");
    triggerToast("Admin credentials filled. Press Sign In to access.", "info");
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-4 py-16 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(26,60,52,0.06)] border border-gray-100 select-none relative overflow-hidden"
      >
        {/* Subtle decorative circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FCD34D]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="inline-flex bg-[#1A3C34]/10 p-3.5 rounded-3xl text-[#1A3C34] mb-3">
            <Sparkles className="w-6 h-6 text-[#1A3C34]" />
          </div>
          <h2 className="text-2xl font-black text-[#1A3C34] tracking-tight">
            {mode === "login" ? "Corporate Login" : "Create Account"}
          </h2>
          <p className="text-xs text-gray-400 mt-1.5 font-medium">
            {mode === "login"
              ? "Access your corporate desk dining dashboard"
              : "Register your Lagos Island office for premium delivery"}
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-[#E34B35] rounded-r-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-[#E34B35] shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 font-medium leading-relaxed">
              {error}
            </p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "register" && (
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Abidemi Babajide"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-xl text-xs font-sans focus:border-[#1A3C34] focus:ring-1 focus:ring-[#1A3C34]/20 outline-none transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono">
              Workspace Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                placeholder="e.g. name@pwc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-xl text-xs font-sans focus:border-[#1A3C34] focus:ring-1 focus:ring-[#1A3C34]/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">
                Secure Password
              </label>
              {mode === "login" && (
                <button
                  type="button"
                  onClick={loginAsAdminDefault}
                  className="text-[10px] text-[#E34B35] hover:underline font-mono font-bold uppercase tracking-wider"
                >
                  Quick Admin Preset
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-xl text-xs font-sans focus:border-[#1A3C34] focus:ring-1 focus:ring-[#1A3C34]/20 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-13 bg-[#1A3C34] hover:bg-[#112722] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-300"
          >
            <span>{isLoading ? "Validating secure session..." : mode === "login" ? "Sign In" : "Create Account"}</span>
            <ArrowRight className="w-4 h-4 text-[#FCD34D]" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs">
          {mode === "login" ? (
            <p className="text-gray-400 font-medium">
              New to Topssy Foodies?{" "}
              <button
                onClick={() => onNavigate("/register")}
                className="text-[#E34B35] font-extrabold hover:underline"
              >
                Create an Account
              </button>
            </p>
          ) : (
            <p className="text-gray-400 font-medium">
              Already have an account?{" "}
              <button
                onClick={() => onNavigate("/login")}
                className="text-[#E34B35] font-extrabold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        {/* Secure compliance badge */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2 justify-center text-[10px] text-gray-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>ISO-27001 Certified Enterprise Portal</span>
        </div>
      </motion.div>
    </div>
  );
}
