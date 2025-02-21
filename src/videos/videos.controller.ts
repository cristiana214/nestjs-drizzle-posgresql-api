import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './video.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() video: Omit<Video, 'id'>): Promise<Video> {
    return this.videosService.create(video);
  }

  //retrieve all videos by filters and pagination
  @Get()
  getVideos(
    @Query('lessonUrl') lessonUrl?: string,
    @Query('subjectUrl') subjectUrl?: string,
    @Query('topicUrl') topicUrl?: string,
    @Query('pageNum') pageNum = '1',
    @Query('pageSize') pageSize = '3',
  ): Promise<Video[]> {
    const page = Number(pageNum);
    const size = Number(pageSize);
    return this.videosService.getVideos(
      { lessonUrl, subjectUrl, topicUrl },
      page,
      size,
    );
  }
  @Get(':url')
  async getVideosByURL(@Param('url') url = ''): Promise<Video> {
    return this.videosService.getVideosByURL(url.toString());
  }
}
