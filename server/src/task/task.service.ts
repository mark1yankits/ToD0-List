import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { title } from 'process';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  /* 
    Create a new task object with the provided title and description,
    and associate it with the user identified by the given ID   
  */

  async create(createTaskDto: CreateTaskDto, id:number) {
    const  isExist = await this.taskRepository.findBy({
      user:{id},
      title: createTaskDto.title,
    })

    if(isExist.length) throw new BadRequestException('Task already exist ! ')


    const newTask = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      completed: createTaskDto.completed,
      user: {
        id
      }
    }

    return await this.taskRepository.save(newTask);
  }


  async findAll(userId: number) {

    const tasks = await this.taskRepository.find({
      where: {
        user: { id: userId }, 
      },
    });
    return tasks; 
  }



  async findOne(id: number) {
    const isTask = await this.taskRepository.findOne({
      where:{
        id
      }
    })
    if(!isTask) throw new BadRequestException('Task not found (')

    return isTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskUpdate = await this.taskRepository.findOne({
      where:{
        id
      }
    })
    if (!taskUpdate) throw new BadRequestException('not fount task for update !')
    return await this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    const taskDelete = await this.taskRepository.findOne({
      where:{
        id
      }
    })
    if(!taskDelete) throw new BadRequestException('not found task for delete !')

    return await this.taskRepository.delete(id);
  }

  // pagination for task 

  async fondAllWithPagination(id:number, page:number, limit:number){
    const task = await this.taskRepository.find({
      where:{
        user:{id},
      },
      order:{
        id:'DESC'
      },
      take: limit,
      skip:(page -1)*limit
    })
    return task
  }


}


