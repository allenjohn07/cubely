"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserProfile } from "@/lib/types";

interface UserMenuProps {
  user: UserProfile | null;
  onLogin: () => void;
  onLogout: () => void;
}

export function UserMenu({ user, onLogin, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button
        onClick={onLogin}
        className="px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-800 transition-all text-zinc-400 hover:text-white text-xs font-semibold uppercase tracking-wider"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center group p-1 rounded-full bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-800 transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden border border-zinc-700">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            user.name.charAt(0)
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-3 border-b border-zinc-800">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-zinc-500 truncate">{user.email}</p>
            </div>
            
            <div className="p-1">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                <User className="w-3.5 h-3.5" />
                Profile
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                <Settings className="w-3.5 h-3.5" />
                Settings
              </button>
            </div>

            <div className="p-1 border-t border-zinc-800">
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
