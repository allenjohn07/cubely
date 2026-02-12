"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { TimerDisplay } from "@/components/timer/TimerDisplay";
import { SolveHistory } from "@/components/timer/SolveHistory";
import { CubeVisualizer2D } from "@/components/timer/CubeVisualizer2D";
import { UserMenu } from "@/components/timer/UserMenu";
import { useTimer } from "@/hooks/useTimer";
import { generateScramble } from "@/lib/cubeLogic";
import { Solve, UserProfile, Session, WCAEvent } from "@/lib/types";
import { RefreshCw, LayoutPanelLeft, ChevronLeft, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
export default function TimerPage() {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "session-1",
      name: "Session 1",
      event: "3x3x3",
      solves: [],
      dateCreated: new Date(),
    }
  ]);
  const [currentSessionId, setCurrentSessionId] = useState("session-1");
  const [currentScramble, setCurrentScramble] = useState("");
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const currentSession = useMemo(() => 
    sessions.find(s => s.id === currentSessionId) || sessions[0],
    [sessions, currentSessionId]
  );

  useEffect(() => {
    setMounted(true);
    setCurrentScramble(generateScramble(currentSession.event));
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

  // Use the same animation variants as landing page for consistency
  const FADE_UP_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const handleSolveStop = useCallback((time: number) => {
    const newSolve: Solve = {
      id: Math.random().toString(36).substr(2, 9),
      time,
      date: new Date(),
    };
    setSessions(prev => prev.map(s => 
      s.id === currentSessionId ? { ...s, solves: [...s.solves, newSolve] } : s
    ));
    setCurrentScramble(generateScramble(currentSession.event));
  }, [currentSessionId, currentSession.event]);

  const handleTogglePenalty = useCallback((id: string) => {
    setSessions(prev => prev.map(s => 
      s.id === currentSessionId ? {
        ...s,
        solves: s.solves.map(solve => 
          solve.id === id ? { ...solve, penalty: solve.penalty === "+2" ? "none" : "+2" } : solve
        )
      } : s
    ));
  }, [currentSessionId]);

  const handleDeleteSolve = useCallback((id: string) => {
    setSessions(prev => prev.map(s => 
      s.id === currentSessionId ? {
        ...s,
        solves: s.solves.filter(solve => solve.id !== id)
      } : s
    ));
  }, [currentSessionId]);

  const handleAddSession = useCallback(() => {
    const newSession: Session = {
      id: `session-${Date.now()}`,
      name: `Session ${sessions.length + 1}`,
      event: "3x3x3",
      solves: [],
      dateCreated: new Date(),
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
    setCurrentScramble(generateScramble("3x3x3"));
  }, [sessions.length]);

  const handleRenameSession = useCallback((id: string, newName: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, name: newName } : s));
  }, []);

  const handleSwitchEvent = useCallback((id: string, event: WCAEvent) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, event } : s));
    if (id === currentSessionId) {
      setCurrentScramble(generateScramble(event));
    }
  }, [currentSessionId]);

  const { time, state, start, stop, reset, setReady } = useTimer(handleSolveStop);

  const stats = useMemo(() => {
    const times = currentSession.solves.map(s => s.penalty === "+2" ? s.time + 2000 : s.time);
    const best = times.length > 0 ? Math.min(...times) : 0;
    
    const getAo5 = () => {
      if (times.length < 5) return 0;
      const last5 = times.slice(-5).sort((a, b) => a - b);
      last5.shift();
      last5.pop();
      return last5.reduce((a, b) => a + b, 0) / 3;
    };

    return { best, ao5: getAo5() };
  }, [currentSession.solves]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (state === "IDLE") setReady(true);
        else if (state === "RUNNING") stop();
        else if (state === "STOPPED") reset();
      } else if (e.key === "Escape") reset();
      else if (e.key === "r" || e.key === "R") setCurrentScramble(generateScramble(currentSession.event));
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
    <main className="flex-1 bg-black text-white flex flex-col p-4 md:p-8 font-sans selection:bg-orange-500/30 overflow-hidden relative">
      {/* Background Glow - Same as landing page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-orange-500/5 blur-[120px] rounded-full -z-0 pointer-events-none" />

      {/* Top: Scramble */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={FADE_UP_VARIANTS}
        className="flex flex-col items-center gap-2 mb-4 relative z-0"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600">Scramble</span>
        <div className="flex items-center justify-center gap-4 max-w-2xl w-full px-4">
          <p className={cn(
            "font-mono text-white font-medium tracking-wider text-center leading-tight transition-all duration-300",
            currentScramble.length > 250 ? "text-xs md:text-sm" : 
            currentScramble.length > 180 ? "text-sm md:text-base" : 
            currentScramble.length > 100 ? "text-base md:text-xl" : 
            "text-xl md:text-3xl"
          )}>
            {currentScramble}
          </p>
          <button 
            onClick={() => setCurrentScramble(generateScramble(currentSession.event))}
            className="p-2 md:p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-800 text-zinc-500 hover:text-orange-500 transition-all flex-shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Main Content Area: Centered Timer with peripheral boxes */}
      <div className="flex-1 relative flex flex-col items-center justify-center">
        {/* Left Peripheral: Solve History */}
        <div className="hidden lg:block absolute left-0 bottom-0 w-72 z-20">
          <SolveHistory 
            currentSession={currentSession}
            sessions={sessions}
            onSwitchSession={setCurrentSessionId}
            onAddSession={handleAddSession}
            onRenameSession={handleRenameSession}
            onSwitchEvent={handleSwitchEvent}
            onDelete={handleDeleteSolve}
            onTogglePenalty={handleTogglePenalty}
            height="520px"
          />
        </div>

        {/* Center: Main Timer */}
        <div className="z-10">
          <TimerDisplay time={time} state={state} />
        </div>

        {/* Right Peripheral: Stats & Scramble Box */}
        <div className="hidden lg:flex absolute right-0 bottom-0 w-72 flex-col gap-6 z-20">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5 shadow-xl">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black block mb-2">Best Solves</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-mono text-white font-black">{(stats.best / 1000).toFixed(2)}</span>
                <span className="text-sm text-zinc-600 font-mono">sec</span>
              </div>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5 shadow-xl border-l-orange-500/50">
              <span className="text-[10px] uppercase tracking-[0.2em] text-orange-500/70 font-black block mb-2">Avg of 5</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-mono text-orange-500 font-black">{(stats.ao5 / 1000).toFixed(2)}</span>
                <span className="text-sm text-zinc-600 font-mono">sec</span>
              </div>
            </div>
          </div>

          {/* Scramble Box */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-500 px-1">
              <LayoutPanelLeft className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">2D Preview</span>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 rounded-[32px] p-6 flex justify-center shadow-xl">
              <CubeVisualizer2D scramble={currentScramble} size={14} />
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
        {currentSession.solves.length > 0 && (
          <SolveHistory 
            currentSession={currentSession}
            sessions={sessions}
            onSwitchSession={setCurrentSessionId}
            onAddSession={handleAddSession}
            onRenameSession={handleRenameSession}
            onSwitchEvent={handleSwitchEvent}
            onDelete={handleDeleteSolve}
            onTogglePenalty={handleTogglePenalty}
          />
        )}
      </div>
    </main>
  );
}
