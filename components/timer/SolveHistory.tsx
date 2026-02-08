"use client";

import { cn } from "@/lib/utils";
import { X, Clock, Settings, MoreHorizontal } from "lucide-react";
import { Solve, Session, WCAEvent } from "@/lib/types";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus, Pencil, Check, Trash2 } from "lucide-react";

interface SolveHistoryProps {
  currentSession: Session;
  sessions: Session[];
  onSwitchSession: (id: string) => void;
  onAddSession: () => void;
  onRenameSession: (id: string, newName: string) => void;
  onSwitchEvent: (id: string, event: WCAEvent) => void;
  onDelete: (id: string) => void;
  onTogglePenalty: (id: string) => void;
  className?: string;
  height?: string;
}

export function SolveHistory({ 
  currentSession, 
  sessions, 
  onSwitchSession, 
  onAddSession, 
  onRenameSession, 
  onSwitchEvent,
  onDelete, 
  onTogglePenalty, 
  className, 
  height 
}: SolveHistoryProps) {
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [editName, setEditName] = useState(currentSession.name);

  const sessionRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sessionRef.current && !sessionRef.current.contains(event.target as Node)) setIsSessionOpen(false);
      if (eventRef.current && !eventRef.current.contains(event.target as Node)) setIsEventOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedSolves = [...currentSession.solves].reverse();

  const formatTime = (ms: number, penalty?: "none" | "+2") => {
    const totalMs = penalty === "+2" ? ms + 2000 : ms;
    return (totalMs / 1000).toFixed(2);
  };

  const calculateAoN = (solvesArray: Solve[], n: number, currentIndex: number) => {
    if (currentIndex < n - 1) return "-";
    const lastN = solvesArray.slice(currentIndex - n + 1, currentIndex + 1);
    const times = lastN.map(s => s.penalty === "+2" ? s.time + 2000 : s.time);
    
    times.sort((a, b) => a - b);
    times.shift();
    times.pop();
    
    const avg = times.reduce((a, b) => a + b, 0) / (n - 2);
    return (avg / 1000).toFixed(2);
  };

  const stats = {
    count: currentSession.solves.length,
    best: currentSession.solves.length > 0 ? Math.min(...currentSession.solves.map(s => s.penalty === "+2" ? s.time + 2000 : s.time)) : 0,
    current: currentSession.solves.length > 0 ? (currentSession.solves[currentSession.solves.length - 1].penalty === "+2" ? currentSession.solves[currentSession.solves.length - 1].time + 2000 : currentSession.solves[currentSession.solves.length - 1].time) : 0,
  };

  const WCA_EVENTS: WCAEvent[] = [
    "3x3x3", "2x2x2", "4x4x4", "5x5x5", "OH", "3BLD", "Megaminx", "Pyraminx", "Skewb", "Square-1"
  ];

  return (
    <div 
      className={cn("w-full border border-zinc-800 rounded-2xl bg-zinc-900/40 backdrop-blur-sm flex flex-col overflow-hidden shadow-2xl", className)}
      style={{ height: height || "100%" }}
    >
      {/* Session Header */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 relative z-20">
        <div className="flex items-center justify-between mb-4 relative">
          <div className="flex items-center gap-1.5">
            {/* Session Switcher */}
            <div className="relative" ref={sessionRef}>
              <button 
                onClick={() => setIsSessionOpen(!isSessionOpen)}
                className="flex items-center gap-1 text-[10px] uppercase font-black text-orange-500 tracking-widest hover:text-orange-400 transition-colors bg-orange-500/5 px-2 py-1 rounded-md"
              >
                {isRenaming ? (
                  <div className="flex items-center gap-1">
                    <input 
                      autoFocus
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onRenameSession(currentSession.id, editName);
                          setIsRenaming(false);
                        }
                        if (e.key === "Escape") {
                          setIsRenaming(false);
                          setEditName(currentSession.name);
                        }
                      }}
                      onBlur={() => {
                        onRenameSession(currentSession.id, editName);
                        setIsRenaming(false);
                      }}
                      className="bg-zinc-800/50 border border-orange-500/30 outline-none w-24 px-1 rounded text-white"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Check className="w-2.5 h-2.5 text-green-500" />
                  </div>
                ) : (
                  <span className="truncate max-w-[80px]">{currentSession.name}</span>
                )}
                <ChevronDown className={cn("w-3 h-3 transition-transform", isSessionOpen && "rotate-180")} />
              </button>

              {isSessionOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 border-b border-zinc-800/50 mb-1">
                    <span className="text-[9px] uppercase font-black text-zinc-600 tracking-widest">Select Session</span>
                  </div>
                  {sessions.map(s => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onSwitchSession(s.id);
                        setIsSessionOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-[10px] uppercase font-bold transition-all flex items-center justify-between group/item",
                        s.id === currentSession.id ? "text-orange-500 bg-orange-500/5" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                      )}
                    >
                      <span className="truncate">{s.name}</span>
                      <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <Pencil 
                          className="w-2.5 h-2.5 text-zinc-600 hover:text-white" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsRenaming(true);
                            setEditName(s.name);
                            setIsSessionOpen(false);
                          }}
                        />
                      </div>
                    </button>
                  ))}
                  <div className="border-t border-zinc-800 mt-1.5 pt-1.5">
                    <button
                      onClick={() => {
                        onAddSession();
                        setIsSessionOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[10px] uppercase font-black text-zinc-400 hover:text-orange-500 hover:bg-zinc-800 transition-all flex items-center gap-2"
                    >
                      <Plus className="w-3 h-3" />
                      New Session
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="w-1 h-1 bg-zinc-800 rounded-full flex-shrink-0" />

            {/* Event Switcher */}
            <div className="relative" ref={eventRef}>
              <button 
                onClick={() => setIsEventOpen(!isEventOpen)}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-zinc-500 tracking-wider hover:text-zinc-300 transition-colors px-2 py-1 rounded-md bg-zinc-800/20"
              >
                {currentSession.event}
                <ChevronDown className={cn("w-3 h-3 transition-transform", isEventOpen && "rotate-180")} />
              </button>

              {isEventOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-zinc-900 border border-zinc-800 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 border-b border-zinc-800/50 mb-1">
                    <span className="text-[9px] uppercase font-black text-zinc-600 tracking-widest">Select Event</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    {WCA_EVENTS.map(event => (
                      <button
                        key={event}
                        onClick={() => {
                          onSwitchEvent(currentSession.id, event);
                          setIsEventOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 text-[10px] uppercase font-bold transition-all",
                          event === currentSession.event ? "text-orange-500 bg-orange-500/5" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                        )}
                      >
                        {event}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button className="text-zinc-700 hover:text-white transition-colors">
            <Settings className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[9px] uppercase font-bold text-zinc-600 block mb-1">Current</span>
            <span className="text-lg font-mono font-black text-white">
              {stats.current ? (stats.current / 1000).toFixed(2) : "-"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[9px] uppercase font-bold text-zinc-600 block mb-1">Best</span>
            <span className="text-lg font-mono font-black text-orange-500">
              {stats.best ? (stats.best / 1000).toFixed(2) : "-"}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
          <span className="text-[9px] uppercase font-bold text-zinc-600">solves: <span className="text-zinc-400">{stats.count}</span></span>
          <span className="text-[9px] uppercase font-bold text-zinc-600">mean: <span className="text-zinc-400">
            {currentSession.solves.length > 0 ? (currentSession.solves.reduce((acc, s) => acc + (s.penalty === "+2" ? s.time + 2000 : s.time), 0) / currentSession.solves.length / 1000).toFixed(2) : "DNF"}
          </span></span>
        </div>
      </div>

      <div className="overflow-y-auto overflow-x-hidden custom-scrollbar flex-1">
        <table className="w-full text-left text-sm border-collapse table-fixed">
          <thead className="sticky top-0 z-10">
            <tr className="bg-zinc-900 border-b border-zinc-800 shadow-sm">
              <th className="px-4 py-3 font-bold text-zinc-600 w-12 text-nowrap">
                <div className="text-[9px] uppercase tracking-wider">#</div>
              </th>
              <th className="px-2 py-3 font-bold text-zinc-600">
                <div className="text-[9px] uppercase tracking-wider">Time</div>
              </th>
              <th className="px-2 py-3 font-bold text-zinc-600">
                <div className="text-[9px] uppercase tracking-wider">ao5</div>
              </th>
              <th className="px-2 py-3 font-bold text-zinc-600">
                <div className="text-[9px] uppercase tracking-wider">ao12</div>
              </th>
              <th className="px-2 py-3 font-bold text-zinc-600 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/30">
            {currentSession.solves.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-600 text-xs italic">
                  No solves in this session.
                </td>
              </tr>
            ) : (
              sortedSolves.map((solve, idx) => (
                <tr key={solve.id} className="hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-4 py-2.5 font-mono text-zinc-700 text-[10px]">{currentSession.solves.length - idx}</td>
                  <td className="px-2 py-2.5">
                    <span className={cn(
                      "font-mono font-bold text-xs",
                      solve.penalty === "+2" ? "text-orange-500" : "text-white"
                    )}>
                      {formatTime(solve.time, solve.penalty)}
                    </span>
                  </td>
                  <td className="px-2 py-2.5 font-mono text-zinc-600 text-[10px]">
                    {calculateAoN(currentSession.solves, 5, currentSession.solves.length - 1 - idx)}
                  </td>
                  <td className="px-2 py-2.5 font-mono text-zinc-600 text-[10px]">
                    {calculateAoN(currentSession.solves, 12, currentSession.solves.length - 1 - idx)}
                  </td>
                  <td className="px-2 py-2.5 text-right">
                    <button 
                      onClick={() => onDelete(solve.id)}
                      className="p-1 rounded hover:bg-red-500/10 text-zinc-800 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
