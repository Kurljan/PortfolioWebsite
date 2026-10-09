"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export type OwlState = "idle" | "alert" | "celebrate" | "sleepy" | "thinking";

export default function OwlMascot({ defaultState = "idle" }: { defaultState?: OwlState }) {
  const [state, setState] = useState<OwlState>(defaultState);

  // Time-based sleepy logic
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      if (hour >= 23 || hour < 5) setState("sleepy");
      else setState(defaultState);
    };
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [defaultState]);

  const eyeVariants = {
    idle: { scaleY: [1, 0.1, 1], transition: { repeat: Infinity, repeatDelay: 4, duration: 0.2 } },
    alert: { scaleY: 1.2, scaleX: 1.2 },
    celebrate: { scaleY: [1, 0.5, 1], transition: { repeat: Infinity, duration: 0.3 } },
    sleepy: { scaleY: 0.3 },
    thinking: { y: [-2, 2, -2], transition: { repeat: Infinity, duration: 1.5 } }
  };

  const wingVariants = {
    idle: { rotate: 0 },
    alert: { rotate: -10 },
    celebrate: { rotate: [-20, 20, -20], transition: { repeat: Infinity, duration: 0.4 } },
    sleepy: { rotate: 5 },
    thinking: { rotate: 0 }
  };

  const bodyVariants = {
    idle: { y: [0, -2, 0], transition: { repeat: Infinity, duration: 2 } },
    alert: { y: -10, transition: { type: "spring", stiffness: 300 } },
    celebrate: { y: [0, -15, 0], transition: { repeat: Infinity, duration: 0.4 } },
    sleepy: { y: 2 },
    thinking: { rotate: [0, -5, 5, 0], transition: { repeat: Infinity, duration: 2 } }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      className="fixed bottom-6 right-6 w-24 h-24 z-50 cursor-grab drop-shadow-xl"
      onClick={() => setState(s => (s === "idle" ? "alert" : "idle"))}
    >
      <motion.svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
        variants={bodyVariants}
        animate={state}
        className="w-full h-full text-brand-black"
      >
        {/* Body */}
        <path d="M20 45 C 20 20, 80 20, 80 45 C 80 80, 70 90, 50 90 C 30 90, 20 80, 20 45 Z" fill="currentColor" />
        
        {/* Belly */}
        <path d="M35 55 C 35 45, 65 45, 65 55 C 65 75, 55 85, 50 85 C 45 85, 35 75, 35 55 Z" fill="var(--color-brand-gray-light)" />
        
        {/* Left Wing */}
        <motion.path 
          variants={wingVariants} 
          style={{ transformOrigin: "20px 45px" }}
          d="M20 45 Q 10 55 15 70 Q 25 70 25 55 Z" 
          fill="var(--color-brand-gray-mid)" 
        />
        {/* Right Wing */}
        <motion.path 
          variants={wingVariants} 
          style={{ transformOrigin: "80px 45px" }}
          d="M80 45 Q 90 55 85 70 Q 75 70 75 55 Z" 
          fill="var(--color-brand-gray-mid)" 
        />

        {/* Beak */}
        <path d="M47 50 L 53 50 L 50 56 Z" fill="var(--color-brand-white)" />

        {/* Eyes Background */}
        <circle cx="37" cy="40" r="8" fill="var(--color-brand-white)" />
        <circle cx="63" cy="40" r="8" fill="var(--color-brand-white)" />

        {/* Pupils */}
        <motion.g variants={eyeVariants} style={{ transformOrigin: "37px 40px" }}>
          <circle cx="37" cy="40" r="3.5" fill="currentColor" />
        </motion.g>
        <motion.g variants={eyeVariants} style={{ transformOrigin: "63px 40px" }}>
          <circle cx="63" cy="40" r="3.5" fill="currentColor" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}
