"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-zinc-900 border border-zinc-800 p-12 md:p-20 rounded-[48px] overflow-hidden text-center shadow-2xl"
        >

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 border border-zinc-800 rounded-2xl mb-8 text-zinc-400 text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Join 5,000+ speedcubers
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
              Ready to break your <br />
              <span className="text-white font-black">personal best?</span>
            </h2>
            
            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
              Start tracking your progress today. Sign up for free and join the 
              most advanced cubing platform on the web.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button className="h-12 px-8 bg-white text-black rounded-xl font-bold text-base hover:bg-zinc-200 transition-all flex items-center gap-2 group shadow-xl shadow-white/5">
                Get Started for Free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="h-12 px-6 bg-zinc-900/50 border border-zinc-800 text-zinc-400 rounded-xl font-bold text-base hover:border-zinc-700 hover:text-white transition-all">
                Learn more
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
