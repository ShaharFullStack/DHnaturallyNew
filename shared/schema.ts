import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name_he: text("name_he").notNull(),
  name_en: text("name_en").notNull(),
  description_he: text("description_he").notNull(),
  description_en: text("description_en").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image_url: text("image_url").notNull(),
  category: text("category").notNull(),
  in_stock: boolean("in_stock").default(true),
  featured: boolean("featured").default(false),
  created_at: timestamp("created_at").default(sql`now()`),
});

export const articles = pgTable("articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title_he: text("title_he").notNull(),
  title_en: text("title_en").notNull(),
  excerpt_he: text("excerpt_he").notNull(),
  excerpt_en: text("excerpt_en").notNull(),
  content_he: text("content_he").notNull(),
  content_en: text("content_en").notNull(),
  image_url: text("image_url").notNull(),
  category: text("category").notNull(),
  read_time: integer("read_time").notNull(),
  featured: boolean("featured").default(false),
  created_at: timestamp("created_at").default(sql`now()`),
});

export const contact_submissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").default(sql`now()`),
});

export const cart_items = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  session_id: text("session_id").notNull(),
  product_id: varchar("product_id").references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  created_at: timestamp("created_at").default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  created_at: true,
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  created_at: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contact_submissions).omit({
  id: true,
  created_at: true,
});

export const insertCartItemSchema = createInsertSchema(cart_items).omit({
  id: true,
  created_at: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contact_submissions.$inferSelect;

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cart_items.$inferSelect;
