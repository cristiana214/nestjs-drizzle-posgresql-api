import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';

@Module({
  providers: [VideosService],
  controllers: [VideosController]
})
export class VideosModule {}
