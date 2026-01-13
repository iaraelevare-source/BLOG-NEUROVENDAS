import { mysqlTable, varchar, text, int, timestamp, boolean, decimal } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

// Users table
export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  name: varchar('name', { length: 255 }),
  isBetaUser: boolean('is_beta_user').default(false),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

// Projects table
export const projects = mysqlTable('projects', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  platform: varchar('platform', { length: 50 }), // WordPress, Wix, etc
  language: varchar('language', { length: 50 }),
  niche: varchar('niche', { length: 255 }),
  mainKeyword: varchar('main_keyword', { length: 255 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

// Saved prompts table (prompts as assets)
export const savedPrompts = mysqlTable('saved_prompts', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  promptTemplate: text('prompt_template').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // post, artigo, script, etc
  version: int('version').default(1),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

// Contents table
export const contents = mysqlTable('contents', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  projectId: int('project_id'),
  title: varchar('title', { length: 500 }),
  keyword: varchar('keyword', { length: 255 }),
  type: varchar('type', { length: 50 }), // procedimento, autoridade_clinica, etc
  status: varchar('status', { length: 50 }).default('pending'), // pending, generated, optimized, published, error
  content: text('content'),
  seoScore: int('seo_score'),
  generationId: int('generation_id'),
  channels: text('channels'), // JSON string: {blog, pinterest, linkedin, audio}
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

// Generations table (track AI usage)
export const generations = mysqlTable('generations', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  contentId: int('content_id'),
  promptId: int('prompt_id'),
  promptVariables: text('prompt_variables'), // JSON string
  tokensEstimated: int('tokens_estimated'),
  tokensUsed: int('tokens_used'),
  provider: varchar('provider', { length: 50 }), // gemini, openai, mock
  status: varchar('status', { length: 50 }).notNull(), // success, error, pending
  errorMessage: text('error_message'),
  executionTime: int('execution_time'), // milliseconds
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Credit usage table
export const creditUsage = mysqlTable('credit_usage', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  action: varchar('action', { length: 100 }).notNull(), // generate_article, convert_youtube, etc
  creditsUsed: int('credits_used').notNull(),
  creditsBefore: int('credits_before').notNull(),
  creditsAfter: int('credits_after').notNull(),
  generationId: int('generation_id'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// User credits table
export const userCredits = mysqlTable('user_credits', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull().unique(),
  totalCredits: int('total_credits').default(180), // Default for beta users
  usedCredits: int('used_credits').default(0),
  remainingCredits: int('remaining_credits').default(180),
  plan: varchar('plan', { length: 50 }).default('beta'), // free, beta, pro
  resetDate: timestamp('reset_date'),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

// Automations table
export const automations = mysqlTable('automations', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  projectId: int('project_id'),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // schedule, trigger, webhook
  frequency: varchar('frequency', { length: 50 }), // daily, weekly, custom
  postsPerWeek: int('posts_per_week'),
  autoPublish: boolean('auto_publish').default(false),
  isActive: boolean('is_active').default(false),
  lastRun: timestamp('last_run'),
  nextRun: timestamp('next_run'),
  config: text('config'), // JSON string
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});
