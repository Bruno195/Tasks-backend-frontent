import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../entities/tasks.entity';
import { Project } from '../entities/projects.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

 async create(task: Task, projectId: number): Promise<Task> {
   
    task.project = { id: projectId } as Project;

    return this.taskRepository.save(task);
  }

  async update(id: number, updatedTask: Partial<Task>): Promise<void> {
    await this.taskRepository.update(id, updatedTask);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async updateStatus(id: number, status: TaskStatus): Promise<void> {
    await this.taskRepository.update(id, { status });
  }

  async findAllByProject(projectId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { project: { id: projectId } } });
  }

  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }
}
