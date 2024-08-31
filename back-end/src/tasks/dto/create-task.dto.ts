import { TaskStatus } from "src/entities/tasks.entity"

export class CreateTaskDto {
    
        title: string
        description: string
        dueDate: Date
        status: TaskStatus
        projectId: number
      
}
