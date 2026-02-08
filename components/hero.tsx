"use client";

import { Variants, motion } from "framer-motion";
import { Play, Star, Trophy } from "lucide-react";
import Image from "next/image";

const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center pt-24 pb-20 px-6 text-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-orange-500/10 blur-[120px] rounded-full -z-10" />
      
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl mb-12 shadow-2xl backdrop-blur-sm"
        >
          <Trophy className="w-4 h-4 text-orange-500" />
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">New Release</span>
            <span className="text-sm font-semibold text-zinc-200">The Ultimate Cuber's Toolkit</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]"
        >
          Master the Cube. <br />
          <span className="text-white/40">Track every edge.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
        >
          Cubely is the all-in-one platform for speedcubers. From high-accuracy timing 
          to advanced analytics and community competition.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button className="h-12 px-8 bg-white text-black rounded-xl font-bold text-base hover:bg-zinc-200 transition-all shadow-xl shadow-white/10 group">
            Start Timing <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
          <button className="h-12 px-6 bg-zinc-900 border border-zinc-800 text-white rounded-xl font-bold text-base hover:border-zinc-700 hover:bg-zinc-800/50 transition-all flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center">
              <Play className="w-3 h-3 text-white fill-white translate-x-0.5" />
            </div>
            See how it works
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
}
