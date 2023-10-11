import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskEntity } from '../../task/entity/task.entity';

@Entity({ name: 'subtasks' })
export class SubTaskEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => TaskEntity, (taskid) => taskid.subtask)
    task: TaskEntity;

    @Column({ name: 'taskId' })
    taskId: string;

    @Column({ name: 'description' })
    description: string;

}