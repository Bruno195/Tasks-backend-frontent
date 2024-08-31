import { Controller, Get, Post, Put, Delete, Param, Body, Patch, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from '../entities/tasks.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':projectId')
async findAllByProject(@Param('projectId') projectId: number): Promise<Task[]> {
    console.log('Fetching tasks for project:', projectId);
    const result = await this.tasksService.findAllByProject(+projectId);
    console.log("result",result);
    return result
  }

  @Get('task/:id')
  findOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() task: Task, @Request() req): Promise<Task> {
    console.log('Creating task:', task);
    const projectId = req.body.projectId 
   
    return this.tasksService.create(task, Number(projectId));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() task: Partial<Task>): Promise<void> {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body() body: { status: TaskStatus }): Promise<void> {
    return this.tasksService.updateStatus(id, body.status);
  }
}
