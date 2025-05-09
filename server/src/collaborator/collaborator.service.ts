import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly  collaboratorRepository: Repository<Collaborator>,

    private readonly  userRepository: Repository<User>,

    private readonly listRepository: Repository<Task>
  ){}
  async addCollaborator(email: string, toDoListId: number, role: Role) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new Error('User not found');
  
    const list = await this.listRepository.findOne({ where: { id: toDoListId } });
    if (!list) throw new Error('List not found');
  
    const existing = await this.collaboratorRepository.findOne({
      where: { user: { id: user.id }, list: { id: list.id } },
    });
  
    if (existing) throw new Error('Already a collaborator');
  
    const collab = this.collaboratorRepository.create({ user, list, role });
    return await this.collaboratorRepository.save(collab);
  }
}
