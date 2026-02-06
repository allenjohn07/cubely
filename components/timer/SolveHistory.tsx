"use client";

import React from "react";

interface Solve {
  id: string;
  time: number;
  scramble: string;
  date: Date;
  isDNF?: boolean;
  isPlusTwo?: boolean;
}

interface SolveHistoryProps {
  solves: Solve[];
}

export const SolveHistory: React.FC<SolveHistoryProps> = ({ solves }) => {
  const formatTime = (ms: number, isPlusTwo?: boolean) => {
    let displayTime = ms;
    if (isPlusTwo) displayTime += 2000;
    return (displayTime / 1000).toFixed(2);
  };

  return (
    <div className="bg-[#0f1115]/80 backdrop-blur-md rounded-xl p-6 w-72 h-64 border border-gray-800/50 shadow-2xl flex flex-col box-border">
      <div className="flex justify-between items-center mb-4 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
        <span>History</span>
        <span className="text-gray-600">{solves.length} Solves</span>
      </div>
      <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        {solves.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-700 text-[10px] uppercase font-black tracking-widest">
            No solves yet
          </div>
        ) : (
          solves.slice().reverse().map((solve, index) => (
            <div key={solve.id} className="flex items-center justify-between py-2 border-b border-gray-800/20 group text-xs">
              <span className="text-gray-600 tabular-nums w-6">{(solves.length - index).toString().padStart(2, '0')}</span>
              <div className="flex-1 px-3">
                <span className={`font-mono font-bold ${solve.isDNF ? "text-red-500/70 line-through" : "text-gray-200"}`}>
                  {solve.isDNF ? "DNF" : formatTime(solve.time, solve.isPlusTwo)}
                  {solve.isPlusTwo && <span className="text-[10px] ml-1 text-gray-500">+2</span>}
                </span>
              </div>
              <button className="text-gray-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 font-bold px-1">×</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
