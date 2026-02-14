"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function onWcaLogin() {
    setIsLoading(true);
    // Simulation of WCA Auth
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <Card className="w-full max-w-[450px] border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl shadow-2xl p-4">
      <CardHeader className="space-y-4 pb-8">
        <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center mb-2 shadow-xl">
          <User className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-3xl font-black tracking-tight text-white">
            Secure Access
          </CardTitle>
          <CardDescription className="text-zinc-500 text-base font-medium">
            Join the community using your official World Cube Association profile.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={onWcaLogin}
          className="w-full h-10 md:h-14 bg-white hover:bg-zinc-200 text-black font-bold text-xs md:text-base rounded-2xl transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3 group px-4 overflow-hidden"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              <span>Connecting...</span>
            </div>
          ) : (
            <>
              <span>Authenticate with WCA Account</span>
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </>
          )}
        </Button>
        
        <p className="text-[10px] text-center text-zinc-600 uppercase tracking-[0.2em] font-bold">
          Encrypted & Secure OAuth 2.0
        </p>
      </CardContent>
    </Card>
  );
}
