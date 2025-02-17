import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
//https://docs.nestjs.com/techniques/configuration
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot(), VideosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
