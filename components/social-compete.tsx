"use client";

import { motion } from "framer-motion";
import { Users, Trophy, MessageSquare, Handshake, Globe, Star } from "lucide-react";

const COMMUNITY_FEATURES = [
  {
    title: "Global Leaderboards",
    description: "Compare your times with cubers around the world. Filter by cube type and region.",
    icon: Globe,
    color: "text-blue-400",
  },
  {
    title: "Add Friends",
    description: "Follow your rivals and friends to see their latest achievements and PBs in your feed.",
    icon: Users,
    color: "text-emerald-400",
  },
  {
    title: "Live Competitions",
    description: "Join real-time races against friends or random opponents to test your speed under pressure.",
    icon: Trophy,
    color: "text-orange-500",
  },
];

export function SocialCompete() {
  return (
    <section id="statistics" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
                <Users className="w-3 h-3" />
                Community
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                Cubing is better <br />
                <span className="text-white/40">with friends.</span>
              </h2>
              <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-lg">
                Connect with the global speedcubing network. Share your progress, 
                compete in brackets, and find your next practice partner.
              </p>
            </motion.div>

            <div className="space-y-8">
              {COMMUNITY_FEATURES.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-zinc-500 font-medium">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Visual Element (Leaderboard Mockup) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full" />
            <div className="relative bg-zinc-900/80 border border-zinc-800 p-8 rounded-[40px] backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-white font-bold text-xl">Global Rankings</h4>
                <div className="px-3 py-1 bg-zinc-800 rounded-lg text-zinc-400 text-xs font-bold">3x3x3</div>
              </div>
              
              <div className="space-y-4">
                {[
                  { rank: 1, name: "Max Park", time: "3.13", status: "PB" },
                  { rank: 2, name: "Yiheng Wang", time: "3.47", status: "WR" },
                  { rank: 3, name: "Tymon K.", time: "4.11", status: "NR" },
                  { rank: 4, name: "You", time: "8.42", status: "PB", self: true },
                ].map((user, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${user.self ? 'bg-orange-500/10 border-orange-500/30' : 'bg-black/40 border-zinc-800'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-6 text-sm font-bold ${user.self ? 'text-orange-500' : 'text-zinc-600'}`}>{user.rank}</span>
                      <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700" />
                      <span className="text-white font-bold">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400 font-mono text-sm">{user.time}s</span>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${user.status === 'PB' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'}`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center">
                <p className="text-zinc-500 text-sm font-medium">
                  + 12,492 more cubers competing right now
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
