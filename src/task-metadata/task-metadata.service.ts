import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { TaskRepository } from 'src/tasks/tasks.repository';
import { CreateMetaTaskDto } from './dto/create-metaTask.dto';
import { GetTaskMetadaDto } from './dto/get-tasks-metadata.dto';
import { TaskMetadata } from './entity/task-metadata.entity';
import { TaskMetadataRepository } from './metatasks.repository';

@Injectable()
export class TaskMetadataService {
  constructor(
    @InjectRepository(TaskMetadataRepository)
    private taskMetadataRepository: TaskMetadataRepository,
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository, // or just  private locationRepository: Repository<Location>,
  ) {}

  async getAllTasksDetails(
    filterDto: GetTaskMetadaDto,
    task: Task,
  ): Promise<TaskMetadata[]> {
    return await this.taskMetadataRepository.getAllTasksDetails(
      filterDto,
      task,
    );
  }

  async getTaskDetail(task: Task, id: string): Promise<TaskMetadata> {
    return await this.taskMetadataRepository.getTaskDetail(id);
  }

  async createMetadataTask(
    createMetaTaskDto: CreateMetaTaskDto,
  ): Promise<TaskMetadata> {
    const { taskId } = createMetaTaskDto;
    const task = await this.taskRepository.getTaskById(taskId);
    return this.taskMetadataRepository.createMetadataTask(
      createMetaTaskDto,
      task,
    );
  }
}