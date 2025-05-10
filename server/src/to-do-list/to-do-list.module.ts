import { Module } from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { ToDoListController } from './to-do-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoList } from './entities/to-do-list.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoList, User])],
  controllers: [ToDoListController],
  providers: [ToDoListService],
})
export class ToDoListModule {}
