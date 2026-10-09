import { Metadata } from "next";
import { Suspense } from "react";
import ClientLogin from "./ClientLogin";

export const metadata: Metadata = {
  title: "Owl Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="crt min-h-screen flex items-center justify-center bg-os-bg font-mono selection:bg-os-text selection:text-os-bg text-os-text p-4">
      <div className="border-2 border-os-border bg-os-bg p-8 shadow-[8px_8px_0_0_var(--os-text)] max-w-md w-full relative overflow-hidden">
        <div className="border-b-2 border-os-border bg-os-header px-3 py-1 mb-6 flex justify-between items-center -mx-8 -mt-8">
          <span className="font-bold uppercase tracking-widest text-xs">login.sys</span>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight mb-1">&gt; OWL_AUTH</h1>
        <p className="text-xs tracking-[0.1em] opacity-70 mb-8">System Restricted Access.</p>
        <Suspense fallback={<div className="text-sm animate-pulse">Initializing...</div>}>
          <ClientLogin />
        </Suspense>
      </div>
    </div>
  );
}
