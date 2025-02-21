import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from './subject.entity';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  //   @Post()
  //   create(@Body() video: Omit<Subject, 'id'>): Promise<Subject> {
  //     return this.subjectsService.create(video);
  //   }

  @Get()
  getVideos(): Promise<Subject[]> {
    return this.subjectsService.getSubjects();
  }
  @Get(':url')
  async getSubjectByURL(@Param('url') url = ''): Promise<Subject> {
    return this.subjectsService.getSubjectByURL(url.toString());
  }
}
