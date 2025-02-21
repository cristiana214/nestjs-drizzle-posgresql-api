/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { db } from '../database/drizzle'; // Import Drizzle instance
import { eq } from 'drizzle-orm';
import {
  videos,
  videoLessons,
  lessons,
  topics,
  subjects,
} from '../database/schema'; // Import schema
import { Video } from './video.entity';

@Injectable()
export class VideosRepository {
  private getBaseQuery() {
    return db
      .select({
        id: videos.id,
        title: videos.title,
        content: videos.content,
        description: videos.description,
        url: videos.url,
        videoUrl: videos.videoUrl,
        updatedAt: videos.updatedAt,
        subjectUrl: subjects.url, // get subject URL
        subjectTitle: subjects.title, // get subject Title
        topicUrl: topics.url, // get topic URL
        topicTitle: topics.title, // get topic Title
      })
      .from(videos)
      .leftJoin(videoLessons, eq(videos.id, videoLessons.videoId))
      .leftJoin(lessons, eq(lessons.id, videoLessons.lessonId))
      .leftJoin(topics, eq(topics.id, lessons.topicId))
      .leftJoin(subjects, eq(subjects.id, topics.subjectId));
  }

  async findVideos(
    filters: { lessonUrl?: string; subjectUrl?: string; topicUrl?: string },
    page: number,
    pageSize: number,
  ): Promise<Video[]> {
    const offset = (page - 1) * pageSize;
    let videosQuery;

    if (filters.lessonUrl) {
      videosQuery = this.getBaseQuery()
        .where(eq(topics.url, filters.lessonUrl))
        .limit(pageSize)
        .offset(offset);
    } else if (filters.subjectUrl) {
      videosQuery = this.getBaseQuery()
        .where(eq(subjects.url, filters.subjectUrl))
        .limit(pageSize)
        .offset(offset);
    } else if (filters.topicUrl) {
      videosQuery = this.getBaseQuery()
        .where(eq(topics.url, filters.topicUrl))
        .limit(pageSize)
        .offset(offset);
    } else {
      videosQuery = this.getBaseQuery().limit(pageSize).offset(offset);
    }
    const videosResult: Video[] = await videosQuery;
    return videosResult;
  }
}
