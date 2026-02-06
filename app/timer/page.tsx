"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Scramble } from "@/components/timer/Scramble";
import { TimerDisplay } from "@/components/timer/TimerDisplay";
import { SolveHistory } from "@/components/timer/SolveHistory";
import { Statistics } from "@/components/timer/Statistics";
import { CubeVisualizer } from "@/components/timer/CubeVisualizer";

interface Solve {
  id: string;
  time: number;
  scramble: string;
  date: Date;
  isDNF?: boolean;
  isPlusTwo?: boolean;
}

const generateScramble = () => {
  const moves = ["U", "D", "L", "R", "F", "B"];
  const modifiers = ["", "'", "2"];
  const scrambleMoves = [];
  let lastMove = "";

  for (let i = 0; i < 20; i++) {
    let move = moves[Math.floor(Math.random() * moves.length)];
    while (move === lastMove) {
      move = moves[Math.floor(Math.random() * moves.length)];
    }
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scrambleMoves.push(move + modifier);
    lastMove = move;
  }

  return scrambleMoves.join(" ");
};

export default function TimerPage() {
  const [solves, setSolves] = useState<Solve[]>([]);
  const [currentScramble, setCurrentScramble] = useState(generateScramble());

  const handleSolveStop = useCallback((time: number) => {
    const newSolve: Solve = {
      id: Math.random().toString(36).substr(2, 9),
      time,
      scramble: currentScramble,
      date: new Date(),
    };
    setSolves((prev) => [...prev, newSolve]);
    setCurrentScramble(generateScramble());
  }, [currentScramble]);

  const stats = useMemo(() => {
    const times = solves.filter(s => !s.isDNF).map(s => s.time + (s.isPlusTwo ? 2000 : 0));
    const best = times.length > 0 ? Math.min(...times) : 0;
    const worst = times.length > 0 ? Math.max(...times) : 0;
    const avg = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;

    const getAverage = (n: number) => {
      if (times.length < n) return 0;
      const lastN = times.slice(-n);
      // For AoN, usually we remove best and worst if n > 3
      if (n > 3) {
        lastN.sort((a, b) => a - b);
        lastN.shift();
        lastN.pop();
        return lastN.reduce((a, b) => a + b, 0) / lastN.length;
      }
      return lastN.reduce((a, b) => a + b, 0) / lastN.length;
    };

    return {
      best,
      avg,
      worst,
      ao5: getAverage(5),
      ao12: getAverage(12),
      ao50: getAverage(50),
      ao100: getAverage(100),
    };
  }, [solves]);

  return (
    <main className="min-h-screen bg-[#05070a] text-white flex flex-col font-sans overflow-hidden relative">
      {/* Top Section: Scramble */}
      <div className="absolute top-0 left-0 right-0 z-10 text-nowrap">
        <Scramble scramble={currentScramble} />
      </div>

      {/* Main Timer Area - Centered */}
      <div className="flex-1 flex items-center justify-center mb-40">
        <TimerDisplay onStop={handleSolveStop} />
      </div>

      {/* Bottom Left: Cube Visualizer */}
      <div className="fixed bottom-8 left-8 z-20">
        <CubeVisualizer scramble={currentScramble} />
      </div>

      {/* Bottom Right: Stats and History */}
      <div className="fixed bottom-8 right-8 flex items-end gap-6 z-20">
        <Statistics {...stats} />
        <SolveHistory solves={solves} />
      </div>

      {/* Subtle background glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(26,29,35,0.12),transparent)] pointer-events-none" />
    </main>
  );
}
