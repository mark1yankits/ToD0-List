import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('check-email/:email')
  async checkEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return { exists: false, message: 'User not found' };
    }
    return { exists: true, message: 'User exists', userId: user.id };
  }

}
