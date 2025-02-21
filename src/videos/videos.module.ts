import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { VideosRepository } from './videos.repository';

@Module({
  providers: [VideosService, VideosRepository],
  controllers: [VideosController],
})
export class VideosModule {}
