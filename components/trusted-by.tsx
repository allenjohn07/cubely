"use client";

import { motion } from "framer-motion";

const LOGOS = [
  { name: "WCA", style: "italic tracking-tighter" },
  { name: "SPEEDCUBING.RU", style: "tracking-tighter underline decoration-orange-500" },
  { name: "CUBERS.IO", style: "tracking-tight" },
  { name: "THECUBICLE", style: "border-2 border-white px-2 py-0.5" },
  { name: "GAN CUBE", style: "" },
];

export function TrustedBy() {
  return (
    <div className="py-8 border-y border-zinc-900 bg-zinc-950/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.2em]">
          Trusted by the community
        </p>
      </div>

      <div className="flex relative items-center">
        {/* Infinite Scroll Container */}
        <div 
          className="flex gap-16 md:gap-24 items-center whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-pointer"
        >
          {/* Double the logos to create the infinite loop effect */}
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
            <span 
              key={idx} 
              className={`text-white/60 font-black text-2xl md:text-3xl transition-colors hover:text-white cursor-default ${logo.style}`}
            >
              {logo.name}
            </span>
          ))}
        </div>
        
      </div>
    </div>
  );
}
