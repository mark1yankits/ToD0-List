import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe)
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.taskService.create(createTaskDto, +req.user.id);
  }
  
  // pagination 
  // task/pagination?page=1&limit=3
  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  fondAllWithPagination(
    @Req() req, 
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 3) {
    return this.taskService.fondAllWithPagination(+req.user.id, +page, +limit); 
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {

    return this.taskService.findAll(+req.user.id);
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  
}
