export class Comment {
    constructor({
        id = "",
        name = "",
        creator = {},
        creatorEmail = "",
        taskId = ""
    } = {}) {
        this.id = id;
        this.name = name;
        this.creatorEmail = creatorEmail;
        this.creator = creator;
        this.taskId = taskId;
    }
}