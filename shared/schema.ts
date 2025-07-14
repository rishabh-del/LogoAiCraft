import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const logoRequests = pgTable("logo_requests", {
  id: serial("id").primaryKey(),
  logoName: text("logo_name").notNull(),
  tagline: text("tagline"),
  description: text("description"),
  businessName: text("business_name").notNull(),
  industry: text("industry").notNull(),
  style: text("style").notNull(),
  color: text("color"),
  audience: text("audience"),
  requirements: text("requirements"),
  generatedLogos: jsonb("generated_logos"),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLogoRequestSchema = createInsertSchema(logoRequests).omit({
  id: true,
  generatedLogos: true,
  createdAt: true,
});

export const logoRequestFormSchema = insertLogoRequestSchema.extend({
  logoName: z.string().min(1, "Logo name is required"),
  tagline: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  businessName: z.string().min(1, "Business name is required"),
  industry: z.string().min(1, "Please select an industry"),
  style: z.string().min(1, "Please select a logo style"),
  color: z.string().optional(),
  audience: z.string().optional(),
  requirements: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLogoRequest = z.infer<typeof insertLogoRequestSchema>;
export type LogoRequest = typeof logoRequests.$inferSelect;
export type LogoRequestForm = z.infer<typeof logoRequestFormSchema>;

export interface GeneratedLogo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  style: string;
}
