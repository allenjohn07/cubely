"use client";

import Link from "next/link";
import { User, Twitter, Github, Globe, MessageSquare } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { name: "Practice Timer", href: "#timer" },
      { name: "Statistics", href: "#statistics" },
      { name: "Scrambles", href: "#timer" },
      { name: "Leaderboards", href: "#statistics" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Discord", href: "#" },
      { name: "Global Feed", href: "#community" },
      { name: "Find Friends", href: "#community" },
      { name: "Achievements", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Keyboard Shortcuts", href: "#" },
      { name: "API Documentation", href: "#" },
      { name: "Feature Request", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-24">
          {/* Logo & Description */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center">
                <User className="text-zinc-100 w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Cubely</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-8 font-medium">
              The ultimate toolkit for speedcubers. Track your progress, 
              visualize your stats, and compete with the global community.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Link Groups */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="col-span-1">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">{group.title}</h3>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-zinc-500 hover:text-white text-sm transition-colors font-medium">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-xs font-medium">
            © {new Date().getFullYear()} Cubely Platform. Made for speedcubers, by speedcubers.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-900 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">System Operational</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-600 text-xs">
              <Globe className="w-3 h-3" />
              <span>English (US)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
