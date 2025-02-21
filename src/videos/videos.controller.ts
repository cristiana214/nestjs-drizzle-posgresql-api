import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './video.entity';
import { GetVideosDto } from './dto/videos.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() video: Omit<Video, 'id'>): Promise<Video> {
    return this.videosService.create(video);
  }

  //retrieve all videos by filters and pagination
  @Get()
  getVideos(@Query() query: GetVideosDto): Promise<Video[]> {
    return this.videosService.getVideos(query);
  }

  // @Get(':url')
  // async getVideosByURL(@Param('url') url = ''): Promise<Video> {
  //   return this.videosService.getVideosByURL(url.toString());
  // }
}
