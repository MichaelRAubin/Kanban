export class Task {
    constructor({
        id = "",
        title = "",
        creator = {},
        creatorEmail = ""
    } = {}) {
        this.id = id;
        this.title = title;
        this.creatorEmail = creatorEmail;
        this.creator = creator;
    }
}