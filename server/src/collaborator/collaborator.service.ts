import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { ToDoList } from 'src/to-do-list/entities/to-do-list.entity';

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ToDoList)
    private readonly toDoListRepository: Repository<ToDoList>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(
    createCollaboratorDto: CreateCollaboratorDto,
    requesterId: number,
    listId: number,
  ) {
    const { email, role } = createCollaboratorDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    const list = await this.toDoListRepository.findOne({
      where: { id: listId },
      relations: ['owner'],
    });

    if (!list) {
      throw new NotFoundException('ToDoList not found');
    }

    if (list.owner.id !== requesterId) {
      throw new BadRequestException('Only the owner can add collaborators');
    }

    const isExist = await this.collaboratorRepository.findOne({
      where: {
        user: { id: user.id },
        list: { id: list.id },
      },
    });

    if (isExist) {
      throw new BadRequestException('This user is already added to this list');
    }

    const newCollaborator = this.collaboratorRepository.create({
      user,
      list,
      role,
    });

    return await this.collaboratorRepository.save(newCollaborator);
  }

  findAll() {
    return this.collaboratorRepository.find({
      relations: ['user', 'list'],
    });
  }

  findOne(id: number) {
    return this.collaboratorRepository.findOne({
      where: { id },
      relations: ['user', 'list'],
    });
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    return this.collaboratorRepository.find({
      where: { user: { id: user.id } },
      relations: ['list'],
    });
  }

  remove(id: number) {
    return this.collaboratorRepository.delete(id);
  }
}
