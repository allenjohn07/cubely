"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { getScrambledState, Color } from "@/lib/cubeLogic";

interface CubeVisualizer2DProps {
  scramble: string;
  className?: string;
  size?: number; // size of each small square in pixels
}

const colorMap: Record<Color, string> = {
  white: "bg-white",
  yellow: "bg-[#FFD700]", // More vibrant yellow
  orange: "bg-[#FF8C00]", // Darker, richer orange
  red: "bg-[#DC2626]",    // Stronger red
  green: "bg-[#16A34A]",  // Better green
  blue: "bg-[#2563EB]",   // Deep blue
};

export function CubeVisualizer2D({ scramble, className, size = 12 }: CubeVisualizer2DProps) {
  const state = useMemo(() => getScrambledState(scramble), [scramble]);

  const renderFace = (face: Color[][]) => (
    <div className="flex flex-col items-center min-w-0">
      <div 
        className="grid grid-cols-3 gap-px p-[1.5px] bg-zinc-950 rounded-md shadow-xl relative group shrink-0" 
        style={{ 
          width: size * 3 + 6, 
          height: size * 3 + 6,
          border: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        {face.map((row, r) => 
          row.map((color, c) => (
            <div 
              key={`${r}-${c}`} 
              className={cn(
                "rounded-[2px] transition-all duration-300 relative overflow-hidden",
                colorMap[color],
                "shadow-[inset_0_-0.5px_1px_rgba(0,0,0,0.2),inset_0_0.5px_0.5px_rgba(255,255,255,0.2)]"
              )}
              style={{ width: size, height: size }}
            >
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-white/10" />
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className={cn("inline-flex flex-col items-center p-2 bg-zinc-900/20 rounded-3xl border border-zinc-800/50 backdrop-blur-md overflow-hidden", className)}>
      <div className="grid grid-cols-4 gap-x-0.5 gap-y-1">
        {/* Row 1: Empty, U, Empty, Empty */}
        <div />
        {renderFace(state.U)}
        <div />
        <div />

        {/* Row 2: L, F, R, B */}
        {renderFace(state.L)}
        {renderFace(state.F)}
        {renderFace(state.R)}
        {renderFace(state.B)}

        {/* Row 3: Empty, D, Empty, Empty */}
        <div />
        {renderFace(state.D)}
        <div />
        <div />
      </div>
    </div>
  );
}
