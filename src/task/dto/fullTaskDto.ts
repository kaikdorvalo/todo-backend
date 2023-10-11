import { FullSubTaskDto } from "src/subtask/dto/fullSubTaskDto";
// import { SubTaskDto } from "src/subtask/dto/subtask.dto";

export class FullTaskDto {
    id: string;
    title: string;
    completed: boolean;
    editing: boolean;
    subtasks: Array<FullSubTaskDto>

    constructor(id: string, title: string, completed: boolean, editing: boolean, subtasks: Array<FullSubTaskDto>) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.editing = editing;
        this.subtasks = subtasks;
    }
}