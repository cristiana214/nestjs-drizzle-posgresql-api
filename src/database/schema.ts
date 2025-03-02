import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  varchar,
  date,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const subjects = pgTable('subjects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  content: text('content').notNull(),
  image: text('image'),
  description: text('description').notNull(),
  seoActive: boolean('seo_active').default(false),
  seoTitle: text('seo_title'),
  seoDesc: text('seo_desc'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const topics = pgTable('topics', {
  id: serial('id').primaryKey(),
  subjectId: integer('subject_id').references(() => subjects.id, {
    onDelete: 'cascade',
  }),
  title: text('title').notNull(),
  url: text('url'),
  content: text('content'),
  image: text('image'),
  videoUrl: text('video_url'),
  description: text('description'),
  seoActive: boolean('seo_active').default(false),
  seoTitle: text('seo_title'),
  seoDesc: text('seo_desc'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updateAt: timestamp('update_at').defaultNow(),
});
export const facts = pgTable('facts', {
  id: serial('id').primaryKey(),
  description: text('description').notNull(),
  topicId: integer('topic_id').references(() => topics.id),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  topicId: integer('topic_id').references(() => topics.id),
  title: text('title').notNull(),
  url: text('url').notNull(),
  content: text('content').notNull(),
  image: text('image'),
  description: text('description').notNull(),
  seoActive: boolean('seo_active').default(false),
  seoTitle: text('seo_title'),
  seoDesc: text('seo_desc'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updateAt: timestamp('update_at').defaultNow(),
});

export const videos = pgTable('videos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  videoUrl: text('video_url').notNull(),
  image: text('image'),
  content: text('content'),
  description: text('description').notNull(),
  seoActive: boolean('seo_active').default(false),
  seoTitle: text('seo_title'),
  seoDesc: text('seo_desc'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
export const videoLessons = pgTable('video_lessons', {
  videoId: integer('video_id')
    .references(() => videos.id)
    .notNull(),
  lessonId: integer('lesson_id')
    .references(() => lessons.id)
    .notNull(),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});
export const emails = pgTable('waitlist', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
export const user = pgTable('user', {
  userId: serial('user_id').primaryKey(),
  displayName: varchar('display_name', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  contact: varchar('contact', { length: 20 }), // Manual input for phone number
  about: text('about'), // Optional, can be NULL
  email: varchar('email', { length: 255 }),
  active: boolean('active').default(true), // Default is active
  blocked: boolean('blocked').default(false), // Default is not blocked
  userType: integer('user_type').notNull().default(1), // 1 = user, 2 = admin
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
export const userAuthTb = pgTable('user_auth', {
  authId: varchar('auth_id', { length: 200 }).primaryKey(), // Primary key, varchar(100)
  userId: serial('user_id').references(() => user.userId),
  typeId: integer('type_id')
    .notNull()
    .default(sql`1`), // smallinteger(2), not null, indexed
  authEmail: varchar('auth_email', { length: 70 }).notNull(), // varchar(70), not null
  authToken: varchar('auth_token', { length: 400 }), // varchar(400), no default value
  authUsername: varchar('auth_username', { length: 30 }).notNull(), // varchar(30), not null
  auth_birthday: date('auth_birthday'), // date, default 1879-01-0
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userImageTb = pgTable('user_image', {
  imageId: serial('image_id').primaryKey(), // Primary key, varchar(100)
  userId: integer('user_id').references(() => user.userId),
  imageUrl: varchar('image_url', { length: 500 }).notNull(), // varchar(500 ), not null
  imageTypeId: integer('image_type_id'), // 1= profile image, 2= gallery, 3=banner
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
export const userEmailTb = pgTable('user_email', {
  emailId: integer('email_id').primaryKey(), // primary key, integer(11)
  email: varchar('email', { length: 70 }).notNull().unique(), // varchar(70), not null
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userPasswordTb = pgTable('user_password', {
  id: integer('id').primaryKey(), // Primary key,
  userId: serial('user_id').references(() => user.userId),
  hashPassword: varchar('hash_password', { length: 350 }).notNull(), // varchar(70), not null
  isPrimary: integer('is_primary').notNull().default(1), // is_primary=1 current password,is_primary=2 means old password
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userLogin = pgTable('user_login', {
  id: integer('id').primaryKey(), // Primary key, integer(11)
  userId: serial('user_id').references(() => user.userId), // varchar(70), not null
  typeId: integer('type_id').notNull(), // type_id(1 google 2=email)
  isSignup: integer('is_signup').notNull().default(1), // 1=login 2=signup
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
