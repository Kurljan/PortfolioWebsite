"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HiddenLogin({ children }: { children: React.ReactNode }) {
  const [clicks, setClicks] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (clicks >= 5) {
      router.push("/owl/login");
    }
  }, [clicks, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        router.push("/owl/login");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div onClick={() => setClicks(c => c + 1)} className="cursor-pointer inline-block">
      {children}
    </div>
  );
}
