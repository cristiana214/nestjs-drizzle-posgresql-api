/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { Subject } from './subject.entity';
import { subjects } from 'src/database/schema';
import { db } from '../database/drizzle';
import { desc, eq } from 'drizzle-orm';
@Injectable()
export class SubjectsService {
  //get all Subjects, only 3 subjects
  async getSubjects(): Promise<Subject[]> {
    return await db
      .select()
      .from(subjects)
      .limit(3)
      .orderBy(desc(subjects.id), desc(subjects.active));
  }
  //get subject by url
  async getSubjectByURL(url: string): Promise<Subject> {
    const data = await db.select().from(subjects).where(eq(subjects.url, url));
    return data?.[0];
  }
}
