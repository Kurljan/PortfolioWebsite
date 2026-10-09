"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRetroSound } from "@/hooks/useRetroSound";

export default function ClientLogin() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [booting, setBooting] = useState(true);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const { playSound } = useRetroSound();

  const bootSequence = [
    "Loading OWL-OS kernel...",
    "Mounting file systems... [OK]",
    "Initializing neural net protocols... [OK]",
    "Establishing secure connection...",
    "Auth module ready.",
  ];

  useEffect(() => {
    let currentLog = 0;
    playSound("boot");

    const interval = setInterval(() => {
      if (currentLog < bootSequence.length) {
        setBootLog((prev) => [...prev, bootSequence[currentLog]]);
        playSound("type");
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [playSound]);

  if (booting) {
    return (
      <div className="flex flex-col gap-2 font-mono text-sm min-h-[150px]">
        {bootLog.map((log, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="opacity-80"
          >
            &gt; {log}
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-os-text"
        />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      {error && (
        <div className="text-red-500 text-xs tracking-widest mb-4 border border-red-500 p-2 uppercase animate-pulse">
          &gt; ERROR: Access Denied.
        </div>
      )}
      <button
        onClick={() => {
          playSound("click");
          signIn("google", { callbackUrl: "/owl" });
        }}
        onMouseEnter={() => playSound("hover")}
        className="w-full border-2 border-os-border py-3 text-xs font-bold tracking-[0.2em] transition-colors hover:bg-os-text hover:text-os-bg uppercase flex items-center justify-center gap-2 group"
      >
        <span className="group-hover:animate-pulse">&gt;</span> AUTHENTICATE
      </button>
    </motion.div>
  );
}
