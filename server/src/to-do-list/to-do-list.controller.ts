import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth/jwt-auth.guard';

@Controller('toDoList')
@UseGuards(JwtAuthGuard)
export class ToDoListController {
  constructor(private readonly toDoListService: ToDoListService) {}

  @Post()
  create(@Body() dto: CreateToDoListDto, @Req() req) {
    return this.toDoListService.create(dto, +req.user.id);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  findByUserId(@Param('userId') userId:number){
    return this.toDoListService.findByUserId(userId)
  }
  
  @Delete(':listId')
  @UseGuards(JwtAuthGuard)
  remove(@Param('listId') listId: number, @Req() req) {
    return this.toDoListService.remove(listId, +req.user.id);
  }
}
