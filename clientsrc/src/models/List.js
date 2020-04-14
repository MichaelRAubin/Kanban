export class List {
    constructor({
        id = "",
        title = "",
        creator = {},
        creatorEmail = "",
        boardId = ""
    } = {}) {
        this.id = id;
        this.title = title;
        this.creatorEmail = creatorEmail;
        this.creator = creator;
        this.boardId = boardId;
    }
}