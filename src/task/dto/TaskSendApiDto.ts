import type { SubTaskSendApiDto } from "src/subtask/dto/SubTaskSendApiDto";

export class TaskSendApiDto {
    title: string;
    completed: boolean;
    editing: boolean;
    subtasks: Array<SubTaskSendApiDto>

    constructor(title: string, completed: boolean, editing: boolean, subtask: Array<SubTaskSendApiDto>) {
        this.title = title;
        this.completed = completed;
        this.editing = editing;
        this.subtasks = subtask;
    }
}