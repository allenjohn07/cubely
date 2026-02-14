"use client";

import { AuthForm } from "@/components/auth-form";
import { motion, Variants } from "framer-motion";
import { User, ShieldCheck, Zap, Globe } from "lucide-react";

const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export default function AuthPage() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex flex-col lg:grid lg:grid-cols-2 overflow-hidden">
      {/* Left Side: Branding/Title */}
      <div className="relative flex flex-col justify-center p-8 md:p-16 lg:p-24 overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] animate-pulse [animation-delay:2s]" />
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="relative z-10 max-w-xl"
        >
          <motion.h1 
            variants={FADE_UP_VARIANTS}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
          >
            Join the <br />
            Next Generation.
          </motion.h1>

          <motion.p 
            variants={FADE_UP_VARIANTS}
            className="text-zinc-500 text-lg md:text-xl font-medium mb-12 leading-relaxed"
          >
            Welcome back to the fastest cubing network. Scale your progress, 
            analyze every turn, and dominate the leaderboards.
          </motion.p>

          <motion.div 
            variants={FADE_UP_VARIANTS}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/50">
              <ShieldCheck className="w-6 h-6 text-orange-500 shrink-0" />
              <div>
                <h3 className="text-white font-bold text-sm">WCA Verified</h3>
                <p className="text-zinc-600 text-xs mt-1">Direct authentication via official WCA OAuth.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/50">
              <Zap className="w-6 h-6 text-blue-500 shrink-0" />
              <div>
                <h3 className="text-white font-bold text-sm">Real-time Stats</h3>
                <p className="text-zinc-600 text-xs mt-1">Instant sync of all your practice sessions.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="relative flex flex-col items-center justify-center p-8 bg-zinc-950/40 lg:border-l lg:border-zinc-900/50 backdrop-blur-sm">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={FADE_UP_VARIANTS}
          className="w-full flex justify-center py-12"
        >
          <AuthForm />
        </motion.div>
        
        {/* Footer info for mobile/bottom */}
        <div className="mt-8 text-center">
          <p className="text-zinc-700 text-xs font-medium flex items-center justify-center gap-2">
            <Globe className="w-3 h-3" />
            Connecting cubers worldwide
          </p>
        </div>
      </div>
    </div>
  );
}
