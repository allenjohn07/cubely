"use client";

import { Variants, motion } from "framer-motion";
import { Timer, BarChart3, LineChart, Zap, History, Target } from "lucide-react";

const FEATURES = [
  {
    title: "Practice Timer",
    description: "High-precision timer with WCA-standard scrambles for all official event types.",
    icon: Timer,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Progress Tracking",
    description: "Every solve is saved. Track your Ao5, Ao12, and lifetime PB progress automatically.",
    icon: History,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Data Visualization",
    description: "Identify weak points with heatmaps, session trends, and global rank comparisons.",
    icon: BarChart3,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Session Stats",
    description: "Deep dive into your session history with specific stats for LL, F2L, and cross.",
    icon: LineChart,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Rapid Scrambles",
    description: "Instant scramble generation for 2x2 up to 7x7, Megaminx, and more.",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Goal Setting",
    description: "Set target times and milestones. We'll show you exactly how close you are.",
    icon: Target,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export function FeaturesGrid() {
  return (
    <section id="timer" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4"
          >
            Built for <span className="text-white/40">Performance.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-lg max-w-2xl mx-auto"
          >
            Stop guessing your progress. Get the data you need to reach sub-10.
          </motion.p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={FADE_UP_VARIANTS}
              className="group p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl hover:border-zinc-700 transition-all hover:translate-y-[-4px]"
            >
              <div className={`w-12 h-12 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-zinc-700 transition-colors`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-zinc-500 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
