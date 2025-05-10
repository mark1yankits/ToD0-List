import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDoList } from './entities/to-do-list.entity';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { User } from 'src/user/entities/user.entity';

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

  async findByOwner(userId: number) {
    return this.toDoListRepository.find({
      where: { owner: { id: userId } },
      relations: ['tasks', 'collaborators'],
    });
  }

  async findOne(id: number, userId: number) {
    const list = await this.toDoListRepository.findOne({
      where: { id, owner: { id: userId } },
      relations: ['tasks', 'collaborators'],
    });

    if (!list) {
      throw new BadRequestException('List not found or access denied');
    }

    return list;
  }
}
