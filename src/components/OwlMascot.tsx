"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, Variants, AnimatePresence } from "framer-motion";
import SecretLoginTrigger from "./SecretLoginTrigger";
import { useRetroSound } from "@/hooks/useRetroSound";

export default function OwlMascot() {
  const [owlState, setOwlState] = useState<"idle" | "alert" | "sleepy" | "thinking">("idle");
  const [isLoading, setIsLoading] = useState(true);
  const controls = useAnimation();
  const { playSound } = useRetroSound();

  useEffect(() => {
    // Basic time-based logic to make the owl sleepy at night
    const hour = new Date().getHours();
    if (hour >= 23 || hour <= 5) {
      setOwlState("sleepy");
    }

    // Play boot sound and clear loading after 2.5 seconds
    playSound("boot");
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [playSound]);

  useEffect(() => {
    if (!isLoading) {
      controls.start(owlState);
    }
  }, [owlState, controls, isLoading]);

  // Framer Motion Variants for the Owl
  const bodyVariants: Variants = {
    idle: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } },
    alert: { y: -8, scale: 1.05, transition: { type: "spring", stiffness: 300 } },
    sleepy: { y: 2, scale: 0.95, transition: { duration: 1 } },
    thinking: { rotate: [0, -5, 5, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
  };

  const eyeVariants: Variants = {
    idle: { scaleY: [1, 1, 0.1, 1], transition: { repeat: Infinity, duration: 4, times: [0, 0.95, 0.97, 1] } },
    alert: { scaleY: 1.2, transition: { type: "spring" } },
    sleepy: { scaleY: 0.3, transition: { duration: 0.5 } },
    thinking: { scaleY: 0.8, x: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 2 } }
  };

  return (
    <>
      {/* Full screen loading background that fades out */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-os-bg z-40 crt pointer-events-none"
          />
        )}
      </AnimatePresence>
      
      <motion.div
        layout
        initial={false}
        drag={!isLoading}
        dragConstraints={{ top: -500, bottom: 50, left: -500, right: 50 }}
        whileHover={!isLoading ? { scale: 1.1 } : undefined}
        whileTap={!isLoading ? { scale: 0.9 } : undefined}
        className={`fixed z-50 flex flex-col items-center justify-center drop-shadow-2xl ${
          isLoading 
            ? "inset-0 m-auto w-64 h-64" 
            : "bottom-6 right-6 w-16 h-16 cursor-grab active:cursor-grabbing"
        }`}
        onClick={() => {
          if (!isLoading) {
            playSound("click");
            setOwlState(prev => (prev === "alert" ? "idle" : "alert"));
          }
        }}
      >
        <SecretLoginTrigger>
          <motion.svg
            variants={bodyVariants}
            initial="idle"
            animate={controls}
            viewBox="0 0 100 100"
            className="w-full h-full text-os-text"
          >
            {/* Owl Body - Retro Amber outline/fill */}
            <path 
              d="M 20 80 C 20 40, 80 40, 80 80 Z" 
              fill="var(--os-bg)"
              stroke="currentColor"
              strokeWidth="4"
            />
            {/* Owl Ears */}
            <path 
              d="M 25 50 L 15 25 L 35 40 Z M 75 50 L 85 25 L 65 40 Z" 
              fill="var(--os-bg)"
              stroke="currentColor"
              strokeWidth="4"
            />
            
            {/* Glowing Eyes Container */}
            <motion.g variants={eyeVariants} initial="idle" animate={controls}>
              {/* Left Eye */}
              <circle cx="35" cy="55" r="8" fill="var(--os-bg)" stroke="currentColor" strokeWidth="2" />
              <circle cx="35" cy="55" r="3" fill="currentColor" />
              {/* Right Eye */}
              <circle cx="65" cy="55" r="8" fill="var(--os-bg)" stroke="currentColor" strokeWidth="2" />
              <circle cx="65" cy="55" r="3" fill="currentColor" />
            </motion.g>

            {/* Minimal Beak */}
            <path d="M 47 62 L 53 62 L 50 68 Z" fill="currentColor" />
          </motion.svg>
        </SecretLoginTrigger>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-os-text font-mono text-xl uppercase tracking-widest font-bold animate-pulse"
          >
            &gt; Booting OWL-OS...
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
