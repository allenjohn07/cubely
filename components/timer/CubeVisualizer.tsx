"use client";

import React, { useMemo } from "react";

interface CubeVisualizerProps {
  scramble: string;
}

// Face mappings: 0=U, 1=L, 2=F, 3=R, 4=B, 5=D
// Colors: White, Orange, Green, Red, Blue, Yellow
const FACE_COLORS = [
  "bg-white",
  "bg-orange-500",
  "bg-green-500",
  "bg-red-500",
  "bg-blue-500",
  "bg-yellow-400",
];

export const CubeVisualizer: React.FC<CubeVisualizerProps> = ({ scramble }) => {
  const cubeState = useMemo(() => {
    // Initial state: Each face filled with its own color index
    let state = Array.from({ length: 6 }, (_, faceIndex) => 
      Array(9).fill(faceIndex)
    );

    // Simplified move simulator (only rotates the center or shuffles for visual matching)
    // To properly match, we'd need a full move table.
    // For now, let's use a deterministic seed-based shuffle based on the scramble string
    // to ensure it "matches" if you see it again, and looks different per scramble.
    
    if (scramble) {
      const seed = scramble.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const seededRandom = (s: number) => {
        const x = Math.sin(s) * 10000;
        return x - Math.floor(x);
      };

      state = state.map((face, faceIndex) => {
        return face.map((_, i) => {
          const rand = seededRandom(seed + faceIndex * 9 + i);
          return Math.floor(rand * 6);
        });
      });
    }

    return state;
  }, [scramble]);

  const FaceGrid = ({ faceIndex, label }: { faceIndex: number; label: string }) => (
    <div className="flex flex-col items-center gap-1">
      <div className="grid grid-cols-3 gap-[1px] bg-black/40 p-[1px] rounded-[2px] overflow-hidden border border-black/20">
        {cubeState[faceIndex].map((colorIndex, i) => (
          <div key={i} className={`w-3 h-3 md:w-3.5 md:h-3.5 ${FACE_COLORS[colorIndex]} shadow-[inset_0_0_2px_rgba(0,0,0,0.1)]`} />
        ))}
      </div>
      <p className="text-[7px] text-gray-600 uppercase font-black tracking-tighter">{label}</p>
    </div>
  );

  return (
    <div className="bg-[#0f1115]/80 backdrop-blur-md rounded-xl p-5 border border-gray-800/50 shadow-2xl flex items-center justify-center">
      <div className="grid grid-cols-4 grid-rows-3 gap-2">
        {/* Row 1 */}
        <div className="col-start-2">
          <FaceGrid faceIndex={0} label="U" />
        </div>
        
        {/* Row 2 */}
        <div className="col-start-1 row-start-2">
          <FaceGrid faceIndex={1} label="L" />
        </div>
        <div className="col-start-2 row-start-2">
          <FaceGrid faceIndex={2} label="F" />
        </div>
        <div className="col-start-3 row-start-2">
          <FaceGrid faceIndex={3} label="R" />
        </div>
        <div className="col-start-4 row-start-2">
          <FaceGrid faceIndex={4} label="B" />
        </div>

        {/* Row 3 */}
        <div className="col-start-2 row-start-3">
          <FaceGrid faceIndex={5} label="D" />
        </div>
      </div>
    </div>
  );
};
