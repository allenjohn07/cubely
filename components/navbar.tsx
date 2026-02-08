"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { User } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-zinc-900"
    >
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center">
          <User className="text-zinc-100 w-5 h-5" />
        </div>
        <span className="font-bold text-lg tracking-tight text-white">Cubely</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {[
          { name: "Timer", href: "/timer" },
          { name: "Statistics", href: "/#statistics" },
          { name: "Leaderboards", href: "/#statistics" },
          { name: "Scrambles", href: "/timer" },
          { name: "Community", href: "/#community" },
        ].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="group relative inline-flex items-center gap-2 px-6 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-all font-sans"
        >
          Login
        </Link>
      </div>
    </motion.nav>
  );
}
