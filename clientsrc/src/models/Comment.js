export class Comment {
    constructor({
        id = "",
        title = "",
        creator = {},
        creatorEmail = "",
        taskId = "",
        listId = "",
        boardId = ""
    } = {}) {
        this.id = id;
        this.title = title;
        this.creatorEmail = creatorEmail;
        this.creator = creator;
        this.taskId = taskId;
        this.listId = listId;
        this.boardId = boardId
    }
}