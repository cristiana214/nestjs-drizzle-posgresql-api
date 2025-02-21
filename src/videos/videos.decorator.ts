// video.decorators.ts
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Video } from './video.entity';

export function GetVideosDocs() {
  return applyDecorators(
    ApiTags('videos'),
    ApiOperation({ summary: 'Retrieve a list of videos' }),
    ApiQuery({
      name: 'pageNum',
      required: false,
      description: 'Page number for pagination',
      example: 1,
    }),
    ApiQuery({
      name: 'pageSize',
      required: false,
      description: 'Number of items per page',
      example: 3,
    }),
    ApiQuery({
      name: 'subjectUrl',
      required: false,
      description: 'Filter by subject URL',
      example: 'science',
    }),
    ApiQuery({
      name: 'topicUrl',
      required: false,
      description: 'Filter by topic URL',
    }),
    ApiQuery({
      name: 'lessonUrl',
      required: false,
      description: 'Filter by lesson URL',
    }),
    ApiResponse({
      status: 200,
      description: 'A list of videos.',
      type: [Video],
    }),
  );
}
