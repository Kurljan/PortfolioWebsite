import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { 
  createQuickTask, markTaskDone, rescheduleTask, deleteTask,
  saveNote, addHabit, deleteHabit, updateProfile 
} from "./actions";
import { db } from "@/db";
import { tasks, users, habits, notes } from "@/db/schema";
import { eq, desc, and, gte } from "drizzle-orm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConfirmForm from "@/components/ConfirmForm";

export const metadata: Metadata = {
  title: "Owl Command Center",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function OwlDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/owl/login");

  let dbError = false;
  let userTasks: any[] = [];
  let userHabits: any[] = [];
  let pinnedNote: any = null;
  let needsReschedule: any[] = [];
  let nextEvent: any = null;
  let calendarError: any = null;
  let completedThisWeek = 0;
  let userName = session.user?.name || "Owl Master";

  try {
    const userRecord = await db.query.users.findFirst({
      where: eq(users.email, session.user!.email!)
    });
    
    if (userRecord) {
      userName = userRecord.name || userName;
      
      userTasks = await db.query.tasks.findMany({
        where: and(eq(tasks.userId, userRecord.id), eq(tasks.status, "todo")),
        orderBy: [desc(tasks.createdAt)]
      });

      // 2. Needs Reschedule
      needsReschedule = await db.query.tasks.findMany({
        where: and(eq(tasks.userId, userRecord.id), eq(tasks.status, "needs_reschedule")),
        orderBy: [desc(tasks.createdAt)]
      });

      // 3. Habits
      userHabits = await db.query.habits.findMany({
        where: eq(habits.userId, userRecord.id),
      });

      // 4. Pinned Note
      pinnedNote = await db.query.notes.findFirst({
        where: and(eq(notes.userId, userRecord.id), eq(notes.isPinned, true))
      });

      // 5. Weekly Summary
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const completed = await db.query.tasks.findMany({
        where: and(
          eq(tasks.userId, userRecord.id), 
          eq(tasks.status, "done"),
          gte(tasks.completedAt, oneWeekAgo)
        )
      });
      completedThisWeek = completed.length;
    }

    // 6. Fetch Next Google Calendar Event
    const accessToken = (session as any).accessToken;
    if (accessToken) {
      try {
        const timeMin = new Date().toISOString();
        const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&maxResults=1&singleEvents=true&orderBy=startTime`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        if (data.error) {
          calendarError = data.error.message;
        } else if (data.items && data.items.length > 0) {
          nextEvent = data.items[0];
        }
      } catch(e: any) { 
        calendarError = e.message; 
        console.error("GCal fetch failed", e); 
      }
    }

  } catch (e) {
    dbError = true;
  }

  return (
    <div className="min-h-screen bg-os-bg p-4 md:p-8 crt text-os-text font-mono pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-os-text/50 pb-4 gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 border-2 border-os-text rounded flex items-center justify-center font-bold text-xl shrink-0">
              {"{O}"}
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase">COMMAND CENTER</h1>
              <div className="text-[10px] md:text-xs opacity-70 tracking-widest uppercase">System Online // {new Date().toLocaleDateString()}</div>
            </div>
          </div>
          <div className="w-full md:w-auto flex flex-col items-stretch md:items-end gap-2">
            <div className="text-xs md:text-sm font-semibold tracking-widest bg-os-text/10 px-3 md:px-4 py-2 border border-os-text/30 flex items-center justify-between gap-4">
              <span className="truncate max-w-[140px] sm:max-w-[200px] md:max-w-none">[ USER: {userName} ]</span>
              <a href="/api/auth/signout" className="text-[10px] md:text-xs border border-os-text px-2 py-1 hover:bg-os-text hover:text-os-bg transition-colors shrink-0">LOGOUT</a>
            </div>
          </div>
        </header>

        {dbError && (
          <div className="bg-red-900/50 border-2 border-red-500 p-4 text-sm animate-pulse">
            <span className="font-bold tracking-widest">&gt; SYSTEM ERROR:</span> Database connection failed. Please check DATABASE_URL.
          </div>
        )}

        {/* MAIN LAYOUT */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          
          {/* LEFT COLUMN: Main Focus */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* NEXT EVENT */}
            <section className="bg-os-text/5 p-4 md:p-6 shadow-[0_0_15px_rgba(255,176,0,0.1)] border border-os-text/30">
              <div className="flex justify-between items-center mb-4 border-b border-os-text/30 pb-2">
                <h2 className="text-sm font-bold tracking-widest text-os-text">
                  &gt; NEXT_EVENT.exe
                </h2>
                {nextEvent?.start?.dateTime && (
                  <span className="text-xs bg-os-text text-os-bg px-2 py-1 font-bold">
                    {new Date(nextEvent.start.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                )}
              </div>
              {nextEvent ? (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border-2 border-os-text flex flex-col items-center justify-center text-xs shrink-0">
                    <span className="uppercase">{new Date(nextEvent.start.dateTime || nextEvent.start.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="font-bold text-lg">{new Date(nextEvent.start.dateTime || nextEvent.start.date).getDate()}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold line-clamp-1">{nextEvent.summary}</h3>
                    <p className="text-sm opacity-70 mt-1">Google Calendar • {nextEvent.start.dateTime ? Math.max(0, Math.floor((new Date(nextEvent.start.dateTime).getTime() - new Date().getTime()) / 60000)) + " mins remaining" : "All Day Event"}</p>
                  </div>
                </div>
              ) : (
                <div className="text-os-text/60 italic text-sm py-4 border border-dashed border-os-text/30 px-4 text-center">
                  {calendarError ? (
                    <span className="text-red-500 font-bold opacity-100">SYNC ERROR: {calendarError}</span>
                  ) : (
                    "No upcoming events found on Google Calendar."
                  )}
                </div>
              )}
            </section>

            {/* ACTIVE TASKS */}
            <section className="bg-os-bg p-4 md:p-6 shadow-[0_0_15px_rgba(255,176,0,0.1)] border border-os-text/30 relative">
              <h2 className="text-sm font-bold tracking-widest mb-6 text-os-text border-b border-os-text/30 pb-2 flex justify-between">
                <span>&gt; ACTIVE_TASKS.exe</span>
                <span className="opacity-50">[{userTasks.length} TASKS]</span>
              </h2>
              
              {userTasks.length > 0 ? (
                <ul className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {userTasks.map((task, idx) => (
                    <li key={task.id} className="flex flex-col gap-2 p-3 border border-os-text/20 hover:border-os-text/60 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <ConfirmForm action={markTaskDone} confirmMessage="Mark this task as completed?">
                            <input type="hidden" name="taskId" value={task.id} />
                            <button type="submit" className="w-6 h-6 border-2 border-os-text flex items-center justify-center shrink-0 transition-colors hover:bg-os-text group-hover:border-os-text" title="Complete Task">
                              <span className="opacity-0 group-hover:opacity-100 hover:text-os-bg font-bold">✓</span>
                            </button>
                          </ConfirmForm>
                          <span className="text-lg font-semibold">{task.title}</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="text-xs opacity-50 hidden sm:block">PRIORITY_{idx + 1}</span>
                          <ConfirmForm action={deleteTask} confirmMessage={`Are you sure you want to permanently delete '${task.title}'?`}>
                            <input type="hidden" name="taskId" value={task.id} />
                            <button type="submit" className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:underline" title="Delete Task">
                              [DEL]
                            </button>
                          </ConfirmForm>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-os-text/60 italic text-sm py-4 border border-dashed border-os-text/30 px-4 text-center">
                  No active tasks found. System idling...
                </div>
              )}
            </section>

            {/* WEEKLY SUMMARY */}
            <section className="bg-os-bg p-4 md:p-6 border border-os-text/30">
              <h2 className="text-sm font-bold tracking-widest mb-4 text-os-text border-b border-os-text/30 pb-2">
                &gt; WEEKLY_REPORT.log
              </h2>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="text-4xl font-bold tracking-tighter">
                  {completedThisWeek}
                </div>
                <div>
                  <div className="text-sm uppercase tracking-widest opacity-80">Tasks Completed This Week</div>
                  {completedThisWeek > 0 ? (
                    <div className="text-xs text-green-500 mt-1 font-bold">SUCCESS: Keep the momentum going!</div>
                  ) : (
                    <div className="text-xs opacity-60 mt-1">Awaiting productivity data...</div>
                  )}
                </div>
              </div>
            </section>
          </div>
          
          {/* RIGHT COLUMN: Sidebar Tools */}
          <div className="space-y-8">
            
            {/* QUICK CAPTURE */}
            <section className="bg-os-bg p-4 md:p-6 shadow-[0_0_20px_rgba(255,176,0,0.15)] border-2 border-os-text relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-os-text/20" />
              <h2 className="text-sm font-bold tracking-widest mb-4 text-os-text flex items-center gap-2">
                <span className="animate-pulse">_</span> QUICK_CAPTURE
              </h2>
              <form action={createQuickTask} className="flex flex-col gap-3">
                <input 
                  type="text" 
                  name="title"
                  required
                  placeholder="Task description..." 
                  className="w-full border-b-2 border-os-text/50 bg-os-text/5 py-3 px-2 outline-none text-sm focus:border-os-text transition-colors placeholder:text-os-text/30"
                />
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="time" 
                    name="time"
                    style={{ colorScheme: "dark" }}
                    className="flex-1 border-b-2 border-os-text/50 bg-os-text/5 py-2 px-2 outline-none text-xs focus:border-os-text text-os-text/70 w-full"
                  />
                  <input 
                    type="date" 
                    name="date"
                    style={{ colorScheme: "dark" }}
                    className="flex-1 border-b-2 border-os-text/50 bg-os-text/5 py-2 px-2 outline-none text-xs focus:border-os-text text-os-text/70 w-full"
                  />
                </div>
                <button type="submit" className="mt-2 w-full py-2 bg-os-text text-os-bg font-bold tracking-widest text-xs hover:bg-os-text/80 transition-colors">
                  [ SUBMIT_TASK ]
                </button>
              </form>
            </section>

            {/* PINNED NOTE */}
            <section className="bg-os-text/5 p-4 md:p-6 border border-os-text/30">
              <h2 className="text-sm font-bold tracking-widest mb-4 text-os-text border-b border-os-text/30 pb-2">
                &gt; PINNED_NOTE.txt
              </h2>
              <form action={saveNote} className="flex flex-col gap-2">
                <textarea 
                  name="content"
                  defaultValue={pinnedNote?.content || ""}
                  placeholder="Type your pinned note here..."
                  className="w-full h-32 bg-transparent border border-os-text/30 p-2 text-sm outline-none focus:border-os-text resize-none"
                />
                <button type="submit" className="self-end text-xs tracking-widest border border-os-text px-3 py-1 hover:bg-os-text hover:text-os-bg transition-colors">
                  SAVE NOTE
                </button>
              </form>
            </section>

            {/* NEEDS A NEW TIME */}
            <section className="bg-os-bg p-4 md:p-6 border border-os-text/30">
              <h2 className="text-sm font-bold tracking-widest mb-4 text-os-text border-b border-os-text/30 pb-2">
                &gt; RESCHEDULE_QUEUE
              </h2>
              {needsReschedule.length > 0 ? (
                <ul className="space-y-3">
                  {needsReschedule.map(task => (
                    <li key={task.id} className="text-sm flex flex-col gap-1 border-l-2 border-os-text pl-3 py-1">
                      <span className="opacity-90">{task.title}</span>
                      <ConfirmForm action={rescheduleTask} confirmMessage="Reschedule this task?" className="flex gap-2 mt-1">
                        <input type="hidden" name="taskId" value={task.id} />
                        <button type="submit" name="when" value="today" className="text-[10px] bg-os-text/10 px-2 py-1 hover:bg-os-text/20">TODAY</button>
                        <button type="submit" name="when" value="tomorrow" className="text-[10px] bg-os-text/10 px-2 py-1 hover:bg-os-text/20">TOMORROW</button>
                      </ConfirmForm>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs opacity-50 italic">Queue is empty.</div>
              )}
            </section>

            {/* HABITS */}
            <section className="bg-os-bg p-4 md:p-6 border border-os-text/30">
              <h2 className="text-sm font-bold tracking-widest mb-4 text-os-text border-b border-os-text/30 pb-2">
                &gt; HABIT_TRACKER
              </h2>
              {userHabits.length > 0 ? (
                <ul className="space-y-3 mb-4">
                  {userHabits.map(habit => (
                    <li key={habit.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <button className="w-4 h-4 border border-os-text hover:bg-os-text/30 transition-colors shrink-0 flex items-center justify-center">
                          {/* We would toggle a habit log here. For now, it's visual. */}
                        </button>
                        <span className="text-sm">{habit.title}</span>
                      </div>
                      <ConfirmForm action={deleteHabit} confirmMessage={`Delete habit '${habit.title}'?`}>
                        <input type="hidden" name="habitId" value={habit.id} />
                        <button type="submit" className="text-xs opacity-0 group-hover:opacity-100 hover:text-red-500">x</button>
                      </ConfirmForm>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs opacity-50 italic mb-4">No habits configured.</div>
              )}
              <form action={addHabit} className="flex gap-2">
                <input 
                  type="text" 
                  name="title" 
                  required 
                  placeholder="New habit..." 
                  className="flex-1 bg-transparent border-b border-os-text/50 outline-none text-sm px-1"
                />
                <button type="submit" className="text-xs font-bold bg-os-text text-os-bg px-2 py-1">ADD</button>
              </form>
            </section>

            {/* SETTINGS / PROFILE */}
            <section className="bg-os-bg p-4 md:p-6 border border-os-text/30">
              <h2 className="text-sm font-bold tracking-widest mb-4 text-os-text border-b border-os-text/30 pb-2">
                &gt; USER_PROFILE.cfg
              </h2>
              <form action={updateProfile} className="flex flex-col gap-3">
                <div>
                  <label className="text-[10px] opacity-70 block mb-1">DISPLAY NAME</label>
                  <input type="text" name="name" defaultValue={userName} className="w-full bg-transparent border-b border-os-text/50 outline-none text-sm px-1 py-1" />
                </div>
                <button type="submit" className="text-xs tracking-widest border border-dashed border-os-text/50 w-full py-2 hover:bg-os-text/10 transition-colors">
                  SAVE PROFILE
                </button>
              </form>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
