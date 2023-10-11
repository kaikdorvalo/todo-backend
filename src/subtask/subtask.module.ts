import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubTaskEntity } from "./entity/subtask.entity";
import { SubTaskService } from "./subtask.service";


@Module({
    imports: [TypeOrmModule.forFeature([SubTaskEntity])],
    providers: [SubTaskService],
    exports: [SubTaskService], // se não exportar, ao importar o modulo vai dar erro
})
export class SubTaskModule{}