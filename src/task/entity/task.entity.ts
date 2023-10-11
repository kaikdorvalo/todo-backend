import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubTaskEntity } from '../../subtask/entity/subtask.entity';

@Entity({name: 'tasks'})
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'title', nullable: false })
    title: string;

    @Column({ name: 'completed', nullable: false })
    completed: boolean;

    @Column({ name: 'editing', nullable: false })
    editing: boolean;

    @OneToMany(() => SubTaskEntity, (subtaskid) => { subtaskid.task })
    subtask: SubTaskEntity[];
}