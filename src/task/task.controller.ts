import { Body, Controller, Get, Post } from "@nestjs/common";
import { TaskService } from "./task.service";
import { SubTaskDto } from "src/subtask/dto/subtask.dto";
import { FullTaskDto } from "./dto/fullTaskDto";
import { TaskSendApiDto } from "./dto/TaskSendApiDto";
import { UpdateTitleDto } from "./dto/UpdateTitleDto";
import { UuidDto } from "./dto/UuidDto";

@Controller('task')
export class taskController{
    constructor(
        private readonly taskService: TaskService
    ) {}

    @Post('create')
    async create(@Body() task: TaskSendApiDto): Promise<FullTaskDto> {
        let res = await this.taskService.create(task);
        return res;
    }

    @Get('findall')
    async findAll() {
        return this.taskService.findAll();
    }

    @Post('removesubtasks')
    async removeSubTasks(@Body() subtasksId: string[]) {
        if (subtasksId.length > 0) {
            return this.taskService.removeSubTasks(subtasksId);
        }
    }

    @Post('addsubtask')
    async addSubTask(@Body() subTask: SubTaskDto[]) {
        return this.taskService.addSubTasks(subTask);
    }

    @Post('updatetitle')
    async updateTitle(@Body() task: UpdateTitleDto): Promise<boolean> {
        return await this.taskService.updateTitle(task.id, task.title);
    }

    @Post('deletetask')
    async deleteTask(@Body() taskId: UuidDto ): Promise<boolean> {
        return this.taskService.deleteTask(taskId.uuid);
    }
}