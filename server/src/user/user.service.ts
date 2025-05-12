import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly  userRepository:Repository<User>,
    private readonly JwtService: JwtService,
  ){}


  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where:{
        email:createUserDto.email,
      }
    })

    if(existUser) throw new BadRequestException('This email already exists !')
    
    const user = await this.userRepository.save({
      name: createUserDto.name,
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
      role: createUserDto.role as UserRole,
    })


    // take token
    const token = this.JwtService.sign({email: user.email, name: user.name, role: user.role})
    return {user};
  }



  async findOne(email: string) {
    return this.userRepository.findOne({
      where:{
        email
      },
      select: ['id', 'email', 'name', 'password', 'role'], 
    })
  }


  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

}
