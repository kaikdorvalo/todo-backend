import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { taskController } from "./task.controller";
import { TaskService } from "./task.service";
import { TaskEntity } from "./entity/task.entity";
import { SubTaskModule } from "src/subtask/subtask.module";

@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity]), SubTaskModule], // importar substaskentity também
    controllers: [taskController],
    providers: [TaskService],
})
export class taskModule{}