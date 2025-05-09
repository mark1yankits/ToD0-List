import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';


import * as asrgon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { IUser } from './types/type';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ){}

  async validateUser(email: string, password: string){
    const user = await this.userService.findOne(email);

    if (!user) {
      return null;
    }

    const passwordIsMatch = await asrgon2.verify(user.password , password);

    if (user && passwordIsMatch) {
      return user
    }

    throw new UnauthorizedException('User or password are incorect !')
  }

  async login(user: IUser) {
    const {id, email, name} =  user
    return{
      id, 
      email, 
      name,
      token: this.jwtService.sign({id: user.id, email:user.email, name: user.name})
    }
  }
}
