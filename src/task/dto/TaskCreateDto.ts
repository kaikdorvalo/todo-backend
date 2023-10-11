export class TaskCreateDto {
    title: string;
    completed: boolean;
    editing: boolean;

    constructor(title: string, completed: boolean, editing: boolean) {
        this.title = title;
        this.completed = completed;
        this.editing = editing;
    }
}