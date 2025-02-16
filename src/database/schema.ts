import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';
export const subjects = pgTable('subjects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
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
  name: text('name').notNull(),
  content: text('content').notNull(),
  image: text('image'),
  videoUrl: text('video_url'),
  description: text('description').notNull(),
  seoActive: boolean('seo_active').default(false),
  seoTitle: text('seo_title'),
  seoDesc: text('seo_desc'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updateAt: timestamp('update_at').defaultNow(),
});

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  topicId: integer('topic_id').references(() => topics.id),
  title: text('title').notNull(),
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
  lessonId: integer('lesson_id').references(() => lessons.id),
  title: text('title').notNull(),
  url: text('url').notNull(),
  videoUrl: text('video_url').notNull(),
  image: text('image'),
  content: text('content').notNull(),
  description: text('description').notNull(),
  seoActive: boolean('seo_active').default(false),
  seoTitle: text('seo_title'),
  seoDesc: text('seo_desc'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
