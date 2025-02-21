/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { Video } from './video.entity';
import { db } from '../database/drizzle';
import { videos } from '../database/schema';
import { eq } from 'drizzle-orm';
import { VideosRepository } from './videos.repository';
@Injectable()
export class VideosService {
  constructor(private readonly videosRepository: VideosRepository) {}

  // todo
  async create(video: Omit<Video, 'id'>) {
    const [newVideo] = await db
      .insert(videos)
      .values({
        ...video,
        url: video.url,
      })
      .returning();
    return newVideo;
  }

  //get all videos by filters with pagination
  async getVideos(
    filters: { lessonUrl?: string; subjectUrl?: string; topicUrl?: string },
    page: number,
    pageSize: number,
  ): Promise<Video[]> {
    return this.videosRepository.findVideos(filters, page, pageSize);
  }

  //get specific video by url
  async getVideosByURL(url: string): Promise<Video> {
    const data = await db.select().from(videos).where(eq(videos.url, url));
    return data?.[0];
  }
}
