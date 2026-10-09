"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function ClientLogin() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="text-red-500 text-xs tracking-widest mb-4">
          Access Denied.
        </div>
      )}
      <button
        onClick={() => signIn("google", { callbackUrl: "/owl" })}
        className="w-full border-2 border-black py-3 text-xs font-bold tracking-[0.2em] transition-colors hover:bg-black hover:text-white"
      >
        LOGIN WITH GOOGLE
      </button>
    </div>
  );
}
