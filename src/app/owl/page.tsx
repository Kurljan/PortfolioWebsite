import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Owl Command Center",
  robots: {
    index: false,
    follow: false,
  },
};

export const instant = false;

export default async function OwlDashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/owl/login");
  }

  return (
    <div className="min-h-screen bg-[var(--color-brand-gray-light)] p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 flex justify-between items-center border-b-2 border-black pb-4">
          <h1 className="text-3xl font-bold tracking-[0.2em]">COMMAND CENTER</h1>
          <div className="text-sm font-semibold tracking-widest">{session.user?.email}</div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white p-6 shadow-sm border border-gray-300">
              <h2 className="text-sm font-bold tracking-widest mb-4">TODAY'S PRIORITIES</h2>
              <div className="text-gray-500 italic text-xs">No priorities set yet.</div>
            </section>
          </div>
          
          <div className="space-y-8">
            <section className="bg-white p-6 shadow-sm border border-gray-300">
              <h2 className="text-sm font-bold tracking-widest mb-4">QUICK CAPTURE</h2>
              <input 
                type="text" 
                placeholder="Press Enter to save..." 
                className="w-full border-b-2 border-black bg-transparent py-2 outline-none text-sm focus:border-gray-500 transition-colors"
              />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
