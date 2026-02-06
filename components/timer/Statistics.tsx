"use client";

import React from "react";

interface StatsProps {
  best: number;
  avg: number;
  worst: number;
  ao5: number;
  ao12: number;
  ao50: number;
  ao100: number;
}

export const Statistics: React.FC<StatsProps> = ({ best, avg, worst, ao5, ao12, ao50, ao100 }) => {
  const formatTime = (ms: number) => {
    if (!ms || ms === 0) return "--";
    return (ms / 1000).toFixed(2);
  };

  const StatItem = ({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) => (
    <div className="flex flex-col">
      <span className="text-gray-500 text-[9px] uppercase font-black tracking-widest leading-none mb-1">{label}</span>
      <span className={`text-xl font-mono ${highlight ? "text-green-400" : "text-gray-200"}`}>
        {formatTime(value)}
      </span>
    </div>
  );

  return (
    <div className="bg-[#0f1115]/80 backdrop-blur-md rounded-xl p-6 border border-gray-800/50 shadow-2xl flex flex-col gap-4 w-72 h-64 box-border">
      <div className="flex justify-between items-center border-b border-gray-800/50 pb-3">
        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Session Stats</span>
        <div className="text-right flex flex-col">
          <span className="text-xs font-mono text-green-500">{formatTime(best)}</span>
          <span className="text-[8px] text-gray-600 font-bold uppercase">Personal Best</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 mt-1">
        <StatItem label="Avg" value={avg} />
        <StatItem label="Ao5" value={ao5} />
        <StatItem label="Ao12" value={ao12} />
        <StatItem label="Ao50" value={ao50} />
      </div>
    </div>
  );
};
