import {
  Controller,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth/jwt-auth.guard';

@Controller('collaborator')
@UseGuards(JwtAuthGuard)
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post(':listId')
  create(
    @Body() createCollaboratorDto: CreateCollaboratorDto,
    @Req() req,
    @Param('listId') listId: number,
  ) {
    return this.collaboratorService.create(
      createCollaboratorDto,
      +req.user.id,
      listId,
    );
  }

  @Get()
  findAll() {
    return this.collaboratorService.findAll();
  }

  @Get('user/:email')
  findByEmail(@Param('email') email: string) {
    return this.collaboratorService.findByEmail(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collaboratorService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collaboratorService.remove(+id);
  }
}
