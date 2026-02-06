"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface TimerDisplayProps {
  onStop: (time: number) => void;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ onStop }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const requestRef = useRef<number | null>(null);

  const formatTime = (ms: number) => {
    const seconds = (ms / 1000).toFixed(2);
    return seconds;
  };

  const updateTimer = useCallback(() => {
    if (startTime) {
      setTime(Date.now() - startTime);
    }
    requestRef.current = requestAnimationFrame(updateTimer);
  }, [startTime]);

  const startTimer = useCallback(() => {
    setStartTime(Date.now());
    setIsRunning(true);
    setIsReady(false);
  }, []);

  const stopTimer = useCallback(() => {
    if (startTime) {
      const finalTime = Date.now() - startTime;
      setTime(finalTime);
      onStop(finalTime);
    }
    setIsRunning(false);
    setStartTime(null);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  }, [startTime, onStop]);

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updateTimer);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isRunning, updateTimer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (isRunning) {
          stopTimer();
        } else if (!isReady) {
          setIsReady(true);
          setTime(0);
        }
      } else if (isRunning) {
        stopTimer();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && isReady && !isRunning) {
        startTimer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRunning, isReady, startTimer, stopTimer]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`text-[10rem] md:text-[14rem] font-mono tabular-nums leading-none tracking-tighter transition-all duration-200 ${
          isReady ? "text-green-400 scale-95" : isRunning ? "text-white" : "text-gray-100"
        }`}
        style={{ textShadow: isReady ? "0 0 40px rgba(74, 222, 128, 0.2)" : "none" }}
      >
        {formatTime(time)}
      </div>
    </div>
  );
}
