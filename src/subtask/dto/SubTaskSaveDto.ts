
export class SubTaskSaveDto {
    taskId: string;
    description: string;

    constructor(taskId: string, description: string) {
        this.taskId = taskId;
        this.description = description;
    }
}