import { Injectable } from '@nestjs/common';
import { Video } from './video.entity';
import { db } from '../database/drizzle';
import { videos } from '../database/schema';
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
  async findAll(): Promise<Video[]> {
    return await db.select().from(videos);
  }
}
