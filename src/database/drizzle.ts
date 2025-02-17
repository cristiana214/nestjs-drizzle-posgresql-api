/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config();
if (!process.env.DATABASE_URL_POOL) {
  throw new Error('DATABASE_URL_POOL is not defined. Check your .env file.');
}

// create a new PostgreSQL client instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL_POOL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined, // Enable SSL in production if needed
});

// initialize Drizzle with the pool
export const db = drizzle(pool, { schema });
