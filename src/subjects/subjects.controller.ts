import { Controller, Get } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from './subject.entity';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  getVideos(): Promise<Subject[]> {
    return this.subjectsService.getSubjects();
  }
}
