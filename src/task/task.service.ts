import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from "./entity/task.entity";
import { SubTaskDto } from "../subtask/dto/subtask.dto";
import { SubTaskService } from "src/subtask/subtask.service";
import { FullTaskDto } from "./dto/fullTaskDto";
import { TaskSendApiDto } from "./dto/TaskSendApiDto";
import { TaskCreateDto } from "./dto/TaskCreateDto";
import { SubTaskSaveDto } from "src/subtask/dto/SubTaskSaveDto";
import { FullSubTaskDto } from "src/subtask/dto/fullSubTaskDto";
import { SubTaskEntity } from "src/subtask/entity/subtask.entity";


@Injectable({})
export class TaskService{
    constructor(
        @InjectRepository(TaskEntity) private readonly repository: Repository<TaskEntity>,
        private readonly subTaskService: SubTaskService,
    ){}

    async create(task: TaskSendApiDto): Promise<FullTaskDto> {
        try {
            let subtasks = new Array<FullSubTaskDto>;
            const taskSave = new TaskCreateDto(task.title, task.completed, task.editing);
            const newTask = await this.repository.save(this.repository.create(taskSave));

            for(const sub of task.subtasks) {
                const newSub = new SubTaskSaveDto(newTask.id, sub.description);
                let createdSubTask = await this.subTaskService.create(newSub);
                subtasks.push(createdSubTask);
            }

            let createdFullTask = new FullTaskDto(newTask.id, newTask.title, newTask.completed, newTask.editing, subtasks);
            return createdFullTask;
        } catch(error) {
            console.log("Erro ao criar uma tarefa completa." + error);
        }
    }

    async findAll(): Promise<Array<FullTaskDto>>{
        let tasks = await this.repository.findBy({ completed: false });
        let fullTasks = new Array<FullTaskDto>();

        for(const task of tasks) {
            let subTasks = await this.subTaskService.find(task.id);
            let fullTaskDto = new FullTaskDto(task.id, task.title, task.completed, task.editing, subTasks);
            
            fullTasks.push(fullTaskDto);
        }

        return fullTasks;
    }

    async removeSubTasks(subtasksId: string[]): Promise<boolean> {
        try {
            for (var sub of subtasksId) {
                await this.subTaskService.delete(sub);
            }

            return true;
        } catch(error) {
            console.log("Erro ao remover subtasks.");
            return false;
        }
    }

    async addSubTasks(subTask: SubTaskDto[]): Promise<SubTaskEntity[]> {
        try {
            let subTasks =  await this.subTaskService.addSubTasks(subTask);
            return subTasks;
        } catch(error) {
            console.log("Erro ao adicionar subtasks.");
        }
    }

    async updateTitle(id: string, title: string): Promise<boolean> {
        try {
            await this.repository.update(id, { title: title });
            return true;
        } catch(error) {
            console.log("Erro ao atualizar o titulo");
            return false;
        }
    }

    async deleteTask(taskId: string): Promise<boolean> {
       try {
            await this.subTaskService.deleteSubTasksByTaskId(taskId);
            await this.repository.delete(taskId);

            return true;
       } catch(error) {
            console.log("Erro ao concluir task.");
            return false;
       }
    }
    

}
