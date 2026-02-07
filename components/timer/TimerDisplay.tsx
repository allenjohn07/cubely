"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TimerDisplayProps {
  time: number;
  state: "IDLE" | "READY" | "RUNNING" | "STOPPED";
  className?: string;
}

export function TimerDisplay({ time, state, className }: TimerDisplayProps) {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    const s = seconds % 60;
    const m = Math.floor(seconds / 60);
    
    if (m > 0) {
      return `${m}:${s.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }
    return `${s}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const getTextColor = () => {
    switch (state) {
      case "READY": return "text-green-500";
      case "RUNNING": return "text-white";
      case "STOPPED": return "text-blue-500";
      default: return "text-zinc-500";
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center mb-32", className)}>
      <h1 className={cn(
        "text-[10rem] md:text-[14rem] font-mono leading-none tabular-nums select-none transition-colors duration-200",
        getTextColor()
      )}>
        {formatTime(time)}
      </h1>
      <p className="text-zinc-600 uppercase tracking-[0.4em] text-xs mt-4">
        {state === "IDLE" && "Hold SPACE to start"}
        {state === "READY" && "Release to start"}
        {state === "RUNNING" && "Press SPACE to stop"}
        {state === "STOPPED" && "Space to Reset"}
      </p>
    </div>
  );
}
