import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  UseGuards,
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

  @Get()
  getAll(@Req() req) {
    return this.toDoListService.findByOwner(+req.user.id);
  }

  @Get(':id')
  getOne(@Param('id') id: number, @Req() req) {
    return this.toDoListService.findOne(id, +req.user.id);
  }
}
