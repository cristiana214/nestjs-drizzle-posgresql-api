import { Controller, Get, Post, Body } from '@nestjs/common';
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
  findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }
}
