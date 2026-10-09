"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SecretLoginTrigger({ children }: { children: React.ReactNode }) {
  const [clicks, setClicks] = useState(0);
  const router = useRouter();

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks >= 5) {
      router.push("/owl/login");
      setClicks(0); // Reset
    }
  };

  return (
    <div onClick={handleClick} className="inline-block cursor-pointer">
      {children}
    </div>
  );
}
