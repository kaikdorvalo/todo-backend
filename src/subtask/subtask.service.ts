import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubTaskEntity } from "./entity/subtask.entity";
import { Repository } from "typeorm";
import { SubTaskDto } from "./dto/subtask.dto";
import { FullSubTaskDto } from "./dto/fullSubTaskDto";


@Injectable({})
export class SubTaskService {
    constructor(
        @InjectRepository(SubTaskEntity) private readonly repository: Repository<SubTaskEntity>
    ) {}

    async create(subTaskDto: SubTaskDto): Promise<SubTaskEntity> {
        try {
            return await this.repository.save(this.repository.create(subTaskDto));
        } catch (error) {
            console.log("Erro ao criar subtask");
        }
    }

    async find(taskid: string): Promise<FullSubTaskDto[]> {
        return await this.repository.createQueryBuilder("subtasks").
        where("subtasks.taskId= :task", { task: taskid }).
        getMany();
    }
    
    async delete(subtaskId: string) {
            try {
                await this.repository.delete(subtaskId);
            } catch(error) {
                console.log("Erro ao deletar substask.");
            }
    }

    async addSubTasks(subTask: SubTaskDto[]): Promise<SubTaskEntity[]> {
        let subTasks = new Array<SubTaskEntity>;
        try {
            for (var sub of subTask) {
                let newSubTask = await this.repository.save(this.repository.create(sub));
                subTasks.push(newSubTask);
            }
        } catch(error) {
            console.log("Erro ao adicionar subTasks");
        }

        return subTasks;
    }

    async deleteSubTasksByTaskId(taskId: string) {
        return await this.repository.createQueryBuilder().delete().from(SubTaskEntity).where("taskId = :id", { id: taskId }).execute();
    }
}