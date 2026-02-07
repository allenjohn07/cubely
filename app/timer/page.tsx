"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { TimerDisplay } from "@/components/timer/TimerDisplay";
import { SolveHistory } from "@/components/timer/SolveHistory";
import { CubeVisualizer2D } from "@/components/timer/CubeVisualizer2D";
import { UserMenu } from "@/components/timer/UserMenu";
import { useTimer } from "@/hooks/useTimer";
import { generateScramble } from "@/lib/cubeLogic";
import { Solve, UserProfile } from "@/lib/types";
import { RefreshCw, LayoutPanelLeft, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TimerPage() {
  const [solves, setSolves] = useState<Solve[]>([]);
  const [currentScramble, setCurrentScramble] = useState("");
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentScramble(generateScramble());
  }, []);

  const handleLogin = useCallback(() => {
    setUser({
      name: "Demo Cuber",
      email: "demo@cubely.app"
    });
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  const handleSolveStop = useCallback((time: number) => {
    const newSolve: Solve = {
      id: Math.random().toString(36).substr(2, 9),
      time,
      date: new Date(),
    };
    setSolves((prev) => [...prev, newSolve]);
    setCurrentScramble(generateScramble());
  }, []);

  const handleTogglePenalty = useCallback((id: string) => {
    setSolves((prev) => prev.map(s => {
      if (s.id === id) {
        return { ...s, penalty: s.penalty === "+2" ? "none" : "+2" };
      }
      return s;
    }));
  }, []);

  const { time, state, start, stop, reset, setReady } = useTimer(handleSolveStop);

  const stats = useMemo(() => {
    const times = solves.map(s => s.penalty === "+2" ? s.time + 2000 : s.time);
    const best = times.length > 0 ? Math.min(...times) : 0;
    
    const getAo5 = () => {
      if (times.length < 5) return 0;
      const last5 = times.slice(-5).sort((a, b) => a - b);
      last5.shift();
      last5.pop();
      return last5.reduce((a, b) => a + b, 0) / 3;
    };

    return { best, ao5: getAo5() };
  }, [solves]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (state === "IDLE") setReady(true);
        else if (state === "RUNNING") stop();
        else if (state === "STOPPED") reset();
      } else if (e.key === "Escape") reset();
      else if (e.key === "r" || e.key === "R") setCurrentScramble(generateScramble());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && state === "READY") {
        e.preventDefault();
        start();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [state, setReady, start, stop, reset]);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col p-4 md:p-8 font-sans overflow-hidden items-center justify-center">
        <div className="animate-pulse text-zinc-800 font-mono text-xl tracking-widest uppercase">Initializing...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col p-4 md:p-8 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50">
        <Link 
          href="/"
          className="group flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-800 transition-all text-zinc-400 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Back</span>
        </Link>
      </div>

      {/* User Menu */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
        <UserMenu user={user} onLogin={handleLogin} onLogout={handleLogout} />
      </div>

      {/* Top: Scramble */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600">Current Scramble</span>
        <div className="flex items-center justify-center gap-4 max-w-2xl w-full">
          <p className="text-xl md:text-2xl font-mono text-zinc-100 tracking-wider text-center leading-tight">
            {currentScramble}
          </p>
          <button 
            onClick={() => setCurrentScramble(generateScramble())}
            className="p-2 rounded-full hover:bg-zinc-800/50 text-zinc-600 hover:text-white transition-all flex-shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area: Centered Timer with peripheral boxes */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Left Peripheral: Solve History */}
        <div className="hidden lg:block absolute left-0 bottom-0 w-72">
          <SolveHistory 
            solves={solves} 
            onDelete={(id) => setSolves(prev => prev.filter(s => s.id !== id))}
            onTogglePenalty={handleTogglePenalty}
            height="415px"
          />
        </div>

        {/* Center: Main Timer */}
        <div className="z-10">
          <TimerDisplay time={time} state={state} />
        </div>

        {/* Right Peripheral: Stats & Scramble Box */}
        <div className="hidden lg:flex absolute right-0 bottom-0 w-72 flex-col gap-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-3">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-0.5">Best</span>
              <span className="text-2xl font-mono text-white">{(stats.best / 1000).toFixed(2)}s</span>
            </div>
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-3">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-0.5">Ao5</span>
              <span className="text-2xl font-mono text-white">{(stats.ao5 / 1000).toFixed(2)}s</span>
            </div>
          </div>

          {/* Scramble Box */}
          <div className="space-y-3">
            <div className="flex items-end justify-start gap-2 text-zinc-500">
              <LayoutPanelLeft className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Scramble Box</span>
            </div>
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-4 flex justify-center">
              <CubeVisualizer2D scramble={currentScramble} size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Peripheral (Fallback) */}
      <div className="lg:hidden flex flex-col gap-6 mt-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-3">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-0.5">Best</span>
            <span className="text-2xl font-mono text-white">{(stats.best / 1000).toFixed(2)}s</span>
          </div>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-3">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-0.5">Ao5</span>
            <span className="text-2xl font-mono text-white">{(stats.ao5 / 1000).toFixed(2)}s</span>
          </div>
        </div>
        {solves.length > 0 && (
          <SolveHistory 
            solves={solves} 
            onDelete={(id) => setSolves(prev => prev.filter(s => s.id !== id))} 
            onTogglePenalty={handleTogglePenalty}
          />
        )}
      </div>
    </main>
  );
}
