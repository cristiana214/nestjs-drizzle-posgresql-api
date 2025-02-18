/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { Video } from './video.entity';
import { db } from '../database/drizzle';
import { videos } from '../database/schema';
import { eq } from 'drizzle-orm';
@Injectable()
export class VideosService {
  private videos: Video[] = [];

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
  //get all videos with pagination
  async getVideos(page: number, pageSize: number): Promise<Video[]> {
    const offset = (page - 1) * pageSize;

    return await db.select().from(videos).limit(pageSize).offset(offset);
  }
  //get videos by url
  async getVideosByURL(url: string): Promise<Video> {
    const data = await db.select().from(videos).where(eq(videos.url, url));
    return data?.[0];
  }
}
