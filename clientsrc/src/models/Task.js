export class Task {
    constructor({
        id = "",
        title = "",
        creator = {},
        creatorEmail = "",
        listId = "",
        boardId = ""
    } = {}) {
        this.id = id;
        this.title = title;
        this.creatorEmail = creatorEmail;
        this.creator = creator;
        this.listId = listId;
        this.boardId = boardId
    }
}