export class UpdateTitleDto {
    id: string
    title: string;

    constructor(title: string, id: string) {
        this.title = title;
        this.id = id;
    }
}