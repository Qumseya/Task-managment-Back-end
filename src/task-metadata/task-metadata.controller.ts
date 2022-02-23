import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Task } from 'src/tasks/task.entity';
import { CreateMetaTaskDto } from './dto/create-metaTask.dto';
import { GetTaskMetadaDto } from './dto/get-tasks-metadata.dto';
import { TaskMetadata } from './entity/task-metadata.entity';
import { TaskMetadataService } from './task-metadata.service';
import {
  ApiParam,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('task-metadata')
@UseGuards(AuthGuard())
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class TaskMetadataController {
  private logger = new Logger('TasksController');
  constructor(private tasksMetadataService: TaskMetadataService) {}

  @Get('/:id/details')
  @ApiOkResponse({ description: 'Get Task details' })
  @ApiParam({ name: 'id', description: 'Task ID', type: String })
  getDetailsTaskById(
    @Param('id') taskId: string,
    @Query() task: Task,
  ): Promise<TaskMetadata> {
    return this.tasksMetadataService.getTaskDetail(task, taskId);
  }
  @Get()
  @ApiOkResponse({ description: 'Get all task details' })
  getAllTaskDetails(
    @Query() filterDto: GetTaskMetadaDto,
    @Query() task: Task,
  ): Promise<TaskMetadata[]> {
    return this.tasksMetadataService.getAllTasksDetails(filterDto, task);
  }
  @Post()
  @ApiCreatedResponse({ description: 'Create Metadata Task' })
  @ApiBody({ type: CreateMetaTaskDto })
  createMetadataTask(
    @Body() createMetaTaskDto: CreateMetaTaskDto,
  ): Promise<TaskMetadata> {
    return this.tasksMetadataService.createMetadataTask(createMetaTaskDto);
    // }
  }
}
