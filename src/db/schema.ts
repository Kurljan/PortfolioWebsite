import { pgTable, serial, text, timestamp, integer, boolean, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const areas = pgTable("areas", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  color: text("color"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  areaId: uuid("area_id").references(() => areas.id),
  title: text("title").notNull(),
  description: text("description"),
  priority: integer("priority").default(0), // 0: normal, 1: high
  dueAt: timestamp("due_at"),
  startAt: timestamp("start_at"),
  estimatedMinutes: integer("estimated_minutes"),
  firstStep: text("first_step"),
  status: text("status").default("todo").notNull(), // todo, doing, done, snoozed, needs_reschedule, deleted
  completedAt: timestamp("completed_at"),
  googleEventId: text("google_event_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reminders = pgTable("reminders", {
  id: uuid("id").primaryKey().defaultRandom(),
  taskId: uuid("task_id").references(() => tasks.id).notNull(),
  scheduledFor: timestamp("scheduled_for").notNull(),
  sentAt: timestamp("sent_at"),
  status: text("status").default("pending").notNull(), // pending, sent, cancelled
  message: text("message").notNull(),
});
