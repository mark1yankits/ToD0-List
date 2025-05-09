import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';

@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  
}
