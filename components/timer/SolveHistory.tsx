"use client";

import { cn } from "@/lib/utils";
import { X, Hash, Clock } from "lucide-react";
import { Solve } from "@/lib/types";

interface SolveHistoryProps {
  solves: Solve[];
  onDelete: (id: string) => void;
  onTogglePenalty: (id: string) => void;
  className?: string;
  height?: string;
}

export function SolveHistory({ solves, onDelete, onTogglePenalty, className, height }: SolveHistoryProps) {
  const sortedSolves = [...solves].reverse();

  const formatTime = (ms: number, penalty?: "none" | "+2") => {
    const totalMs = penalty === "+2" ? ms + 2000 : ms;
    return (totalMs / 1000).toFixed(2) + "s" + (penalty === "+2" ? "+" : "");
  };

  return (
    <div 
      className={cn("w-full border border-zinc-800 rounded-xl bg-zinc-900/20 flex flex-col overflow-hidden", className)}
      style={{ height }}
    >
      <div className="overflow-y-auto overflow-x-hidden custom-scrollbar flex-1">
        <table className="w-full text-left text-sm border-collapse table-fixed">
          <thead className="sticky top-0 z-10">
            <tr className="bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 shadow-sm">
              <th className="px-3 py-2.5 font-semibold text-zinc-400 w-12 text-nowrap">
                <div className="flex items-center gap-2 text-[10px]">
                  <Hash className="w-2.5 h-2.5" />
                  No.
                </div>
              </th>
              <th className="px-3 py-2.5 font-semibold text-zinc-400">
                <div className="flex items-center gap-2 text-[10px]">
                  <Clock className="w-2.5 h-2.5" />
                  Time
                </div>
              </th>
              <th className="px-3 py-2.5 font-semibold text-zinc-400 w-16 text-center text-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {solves.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-3 py-4 text-left text-zinc-500 text-[12px]">
                  Start solving to see your times here.
                </td>
              </tr>
            ) : (
              sortedSolves.map((solve, idx) => (
                <tr key={solve.id} className="hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-3 py-2.5 font-mono text-zinc-500 text-[10px]">#{solves.length - idx}</td>
                  <td className="px-3 py-2.5">
                    <span className={cn(
                      "font-mono font-bold text-sm text-nowrap",
                      solve.penalty === "+2" ? "text-red-400" : "text-white"
                    )}>
                      {formatTime(solve.time, solve.penalty)}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => onTogglePenalty(solve.id)}
                        className={cn(
                          "px-1.5 py-0.5 rounded text-[10px] font-bold transition-all",
                          solve.penalty === "+2" 
                            ? "bg-red-500/20 text-red-500" 
                            : "text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300"
                        )}
                      >
                        +2
                      </button>
                      <button 
                        onClick={() => onDelete(solve.id)}
                        className="p-1 rounded-md hover:bg-red-500/10 text-zinc-600 hover:text-red-500 transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
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
