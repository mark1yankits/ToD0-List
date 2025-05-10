import { Module } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { ToDoList } from 'src/to-do-list/entities/to-do-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collaborator, User, ToDoList, Task])],
  controllers: [CollaboratorController],
  providers: [CollaboratorService],
})
export class CollaboratorModule {}
