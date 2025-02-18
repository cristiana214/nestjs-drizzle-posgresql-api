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

  @Get()
  getVideos(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
  ): Promise<Video[]> {
    return this.videosService.getVideos(parseInt(page), parseInt(pageSize));
  }
  @Get(':url')
  async getVideosByURL(@Param('url') url = ''): Promise<Video> {
    return this.videosService.getVideosByURL(url.toString());
  }
}
