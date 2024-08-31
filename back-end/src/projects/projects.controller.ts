import { Controller, Get, Post, Put, Delete, Param, Body, Request, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from '../entities/projects.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(@Request() req): Promise<Project[]> {
    return this.projectsService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Project> {
    console.log("CAINDO AQUI", id)
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() project: Project, @Request() req): Promise<Project> {
    return this.projectsService.create(project, req.user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() project: Partial<Project>): Promise<void> {
    return this.projectsService.update(id, project);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.projectsService.remove(id);
  }
}
