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
  white: "bg-zinc-100",
  yellow: "bg-yellow-400",
  orange: "bg-orange-500",
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-600",
};

export function CubeVisualizer2D({ scramble, className, size = 10 }: CubeVisualizer2DProps) {
  const state = useMemo(() => getScrambledState(scramble), [scramble]);

  const renderFace = (face: Color[][]) => (
    <div 
      className="grid grid-cols-3 gap-[1px]" 
      style={{ width: size * 3 + 2, height: size * 3 + 2 }}
    >
      {face.map((row, r) => 
        row.map((color, c) => (
          <div 
            key={`${r}-${c}`} 
            className={cn("rounded-[1px]", colorMap[color])}
            style={{ width: size, height: size }}
          />
        ))
      )}
    </div>
  );

  return (
    <div className={cn("inline-flex flex-col items-center gap-1 p-2 rounded-xl", className)}>
      <div className="grid grid-cols-4 gap-1">
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
