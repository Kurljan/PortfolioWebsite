"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { tasks, users, habits, notes } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function getUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  const userRecord = await db.query.users.findFirst({
    where: eq(users.email, session.user.email)
  });
  return userRecord || null;
}

export async function createQuickTask(formData: FormData) {
  const session = await getServerSession(authOptions);
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
  
  const title = formData.get("title") as string;
  if (!title) return;

  const dateStr = formData.get("date") as string;
  const timeStr = formData.get("time") as string;
  let dueAt: Date | undefined = undefined;
  if (dateStr || timeStr) {
    const now = new Date();
    const datePart = dateStr ? dateStr : now.toISOString().split('T')[0];
    const timePart = timeStr ? timeStr : "23:59";
    try { dueAt = new Date(`${datePart}T${timePart}:00`); } catch(e) {}
  }
  
  let googleEventId = null;
  let apiErrors = "";

  if (dueAt && (session as any).accessToken) {
    const endAt = new Date(dueAt.getTime() + 60 * 60 * 1000);
    try {
      const gcalRes = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${(session as any).accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: `[Owl] ${title}`,
          start: { dateTime: dueAt.toISOString() },
          end: { dateTime: endAt.toISOString() },
        })
      });
      const data = await gcalRes.json();
      if (data.id) {
        googleEventId = data.id;
      } else {
        apiErrors += `GCal Error: ${JSON.stringify(data.error)}\n`;
      }
    } catch (e: any) {
      apiErrors += `GCal Exception: ${e.message}\n`;
    }
  }

  await db.insert(tasks).values({ 
    userId: user.id, 
    title, 
    status: "todo", 
    dueAt,
    googleEventId
  });

  // Send Confirmation Email
  if (session && (session as any).accessToken && session.user?.email) {
    const rawMessage = Buffer.from(
      `To: ${session.user.email}\n` +
      `From: ${session.user.email}\n` +
      `Subject: [Owl System] Task Scheduled: ${title}\n\n` +
      `Owl Command Center has successfully recorded your task.\n\n` +
      `Task: ${title}\n` +
      `Scheduled For: ${dueAt ? dueAt.toLocaleString() : "Unscheduled"}\n` +
      `Google Calendar Sync: ${googleEventId ? "SUCCESS" : (dueAt ? "FAILED" : "SKIPPED")}\n`
    ).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

    try {
      const gmailRes = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${(session as any).accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw: rawMessage })
      });
      const data = await gmailRes.json();
      if (!gmailRes.ok) {
        apiErrors += `Gmail Error: ${JSON.stringify(data.error)}\n`;
      }
    } catch (e: any) {
      apiErrors += `Gmail Exception: ${e.message}\n`;
    }
  }

  if (apiErrors) {
    await db.insert(notes).values({
      userId: user.id,
      content: `⚠️ SYSTEM SYNC ERRORS:\n\n${apiErrors}\n\n(Tip: Go to Google Cloud Console and enable the "Gmail API" and "Google Calendar API"!)`,
      isPinned: true
    });
  }

  revalidatePath("/owl");
}

export async function markTaskDone(formData: FormData) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
  const taskId = formData.get("taskId") as string;
  if (!taskId) return;

  await db.update(tasks)
    .set({ status: "done", completedAt: new Date() })
    .where(and(eq(tasks.id, taskId), eq(tasks.userId, user.id)));
  
  revalidatePath("/owl");
}

export async function deleteTask(formData: FormData) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
  const taskId = formData.get("taskId") as string;
  if (!taskId) return;

  await db.delete(tasks)
    .where(and(eq(tasks.id, taskId), eq(tasks.userId, user.id)));
  
  revalidatePath("/owl");
}

export async function rescheduleTask(formData: FormData) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
  const taskId = formData.get("taskId") as string;
  const when = formData.get("when") as string;
  if (!taskId || !when) return;

  const now = new Date();
  if (when === "tomorrow") {
    now.setDate(now.getDate() + 1);
  }
  
  await db.update(tasks)
    .set({ status: "todo", dueAt: now })
    .where(and(eq(tasks.id, taskId), eq(tasks.userId, user.id)));

  revalidatePath("/owl");
}

export async function saveNote(formData: FormData) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
  const content = formData.get("content") as string;
  
  const existing = await db.query.notes.findFirst({
    where: and(eq(notes.userId, user.id), eq(notes.isPinned, true))
  });

  if (existing) {
    await db.update(notes).set({ content }).where(eq(notes.id, existing.id));
  } else {
    await db.insert(notes).values({ userId: user.id, content, isPinned: true });
  }
  revalidatePath("/owl");
}

export async function addHabit(formData: FormData) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
  const title = formData.get("title") as string;
  if (!title) return;

  await db.insert(habits).values({ userId: user.id, title, frequency: "daily" });
  revalidatePath("/owl");
}

export async function deleteHabit(formData: FormData) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
  const habitId = formData.get("habitId") as string;
  if (!habitId) return;

  await db.delete(habits).where(and(eq(habits.id, habitId), eq(habits.userId, user.id)));
  revalidatePath("/owl");
}

export async function updateProfile(formData: FormData) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
  const name = formData.get("name") as string;
  if (!name) return;

  await db.update(users).set({ name }).where(eq(users.id, user.id));
  revalidatePath("/owl");
}
