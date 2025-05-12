import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDoList } from './entities/to-do-list.entity';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { User } from 'src/user/entities/user.entity';
import { lutimes } from 'fs';

@Injectable()
export class ToDoListService {
  constructor(
    @InjectRepository(ToDoList)
    private readonly toDoListRepository: Repository<ToDoList>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createToDoListDto: CreateToDoListDto, userId: number) {
    const owner = await this.userRepository.findOne({ where: { id: userId } });

    if (!owner) {
      throw new BadRequestException('Owner not found!');
    }

    const isExist = await this.toDoListRepository.findOne({
      where: {
        title: createToDoListDto.title,
        description: createToDoListDto.description,
        owner: { id: userId },
      },
    });

    if (isExist) {
      throw new BadRequestException('ToDoList with this title and description already exists');
    }

    const newToDoList = this.toDoListRepository.create({
      ...createToDoListDto,
      owner,
    });

    return await this.toDoListRepository.save(newToDoList);
  }

  


 

  // id user found one

  async findByUserId(userId: number) {
    const list = this.toDoListRepository.find({
      where:{
        owner:{id:userId}
      }
    }) 

    if(!list) throw new BadRequestException('no ToDO list foune for this user !');

    return list

  }

  async remove(listId: number, userId:number) {
    const listRemove = await this.toDoListRepository.findOne({
      where:{
        id:listId, 
        owner:{id:userId}
      },
      relations: ['owner', 'tasks', 'collaborators']
    })

    if(!listRemove) throw new BadRequestException('ToDo List not found or access denied !')

    if (listRemove.tasks.length > 0) {
      console.log('Removing tasks associated with the list');
      await this.toDoListRepository.manager.remove(listRemove.tasks);
    }
  
    if (listRemove.collaborators.length > 0) {
      console.log('Removing collaborators associated with the list');
      await this.toDoListRepository.manager.remove(listRemove.collaborators);
    }
      await this.toDoListRepository.remove(listRemove);
  
      console.log('ToDo List successfully deleted');
      return { message: 'ToDo List successfully deleted' };
  }
}
