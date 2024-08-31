import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/projects.entity';
import { User } from '../entities/users.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  findAll(user: User): Promise<Project[]> {
    return this.projectRepository.find({ where: { user }, relations: ['tasks'] });
  }

  findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({ where: { id }, relations: ['tasks'] });
  }

  create(project: Project, user: User): Promise<Project> {
    project.user = user;
    return this.projectRepository.save(project);
  }

  async update(id: number, updatedProject: Partial<Project>): Promise<void> {
    await this.projectRepository.update(id, updatedProject);
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
