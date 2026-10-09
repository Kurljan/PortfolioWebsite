import { Metadata } from "next";
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
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-gray-bg)]">
      <div className="bg-[var(--color-brand-white)] p-12 drop-shadow-2xl border border-[var(--color-brand-gray-light)] text-center max-w-sm w-full relative overflow-hidden">
        <h1 className="text-2xl font-bold tracking-[0.2em] mb-2">OWL</h1>
        <p className="text-xs tracking-[0.1em] text-gray-500 mb-8 italic">Restricted Access</p>
        <ClientLogin />
      </div>
    </div>
  );
}
