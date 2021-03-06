import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { TaskMetadata } from '../task-metadata/entity/task-metadata.entity';
import { TaskMetadataRepository } from '../task-metadata/metatasks.repository';
import { UsersRepository } from '../auth/users.respository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      TaskRepository,
      TaskMetadata,
      TaskMetadataRepository,
      UsersRepository,
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
