export class AddSubTaskDto {
    taskId: string
    description: string;

    constructor(description: string, taskId: string) {
        this.description = description;
        this.taskId = taskId;
    }
}