import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetVideosDto {
  @IsString()
  @IsOptional()
  lessonUrl?: string;

  @IsString()
  @IsOptional()
  subjectUrl?: string;

  @IsString()
  @IsOptional()
  topicUrl?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pageNum: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pageSize: number = 3;
}
