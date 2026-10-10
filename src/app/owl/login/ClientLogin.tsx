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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    playSound("click");

    const result = await signIn("credentials", {
      username,
      password,
      callbackUrl: "/owl",
      redirect: false,
    });

    if (result?.error) {
      setLoginError("ACCESS DENIED. Invalid credentials.");
      playSound("hover");
    } else if (result?.url) {
      window.location.href = result.url;
    }

    setLoading(false);
  };

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
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      {(error || loginError) && (
        <div className="text-red-500 text-xs tracking-widest mb-2 border border-red-500 p-2 uppercase animate-pulse">
          &gt; ERROR: {loginError || "Access Denied."}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-[0.2em] uppercase opacity-70">
          &gt; Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
          className="bg-transparent border-2 border-os-border px-3 py-2 text-xs font-mono tracking-widest outline-none focus:border-os-text transition-colors w-full"
          placeholder="ENTER USERNAME_"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-[0.2em] uppercase opacity-70">
          &gt; Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="bg-transparent border-2 border-os-border px-3 py-2 text-xs font-mono tracking-widest outline-none focus:border-os-text transition-colors w-full"
          placeholder="••••••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        onMouseEnter={() => playSound("hover")}
        className="w-full border-2 border-os-border py-3 text-xs font-bold tracking-[0.2em] transition-colors hover:bg-os-text hover:text-os-bg uppercase flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        <span className="group-hover:animate-pulse">&gt;</span>{" "}
        {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}
      </button>
    </motion.form>
  );
}
