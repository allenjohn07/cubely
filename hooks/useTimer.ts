import { useState, useEffect, useCallback, useRef } from "react";

export type TimerState = "IDLE" | "READY" | "RUNNING" | "STOPPED";

interface UseTimerReturn {
  time: number;
  state: TimerState;
  start: () => void;
  stop: () => void;
  reset: () => void;
  setReady: (ready: boolean) => void;
}

export function useTimer(onStop?: (time: number) => void): UseTimerReturn {
  const [time, setTime] = useState(0);
  const [state, setState] = useState<TimerState>("IDLE");
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  const update = useCallback(() => {
    if (startTimeRef.current !== null) {
      setTime(Date.now() - startTimeRef.current);
      requestRef.current = requestAnimationFrame(update);
    }
  }, []);

  const start = useCallback(() => {
    setState("RUNNING");
    startTimeRef.current = Date.now();
    requestRef.current = requestAnimationFrame(update);
  }, [update]);

  const stop = useCallback(() => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
    }
    const finalTime = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
    setTime(finalTime);
    setState("STOPPED");
    startTimeRef.current = null;
    requestRef.current = null;
    if (onStop) onStop(finalTime);
  }, [onStop]);

  const reset = useCallback(() => {
    setState("IDLE");
    setTime(0);
    startTimeRef.current = null;
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  }, []);

  const setReady = useCallback((ready: boolean) => {
    if (state === "RUNNING") return;
    setState(ready ? "READY" : "IDLE");
  }, [state]);

  useEffect(() => {
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return { time, state, start, stop, reset, setReady };
}
