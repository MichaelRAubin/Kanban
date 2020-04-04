import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors";

class BoardsService {
    async find(creatorEmail) {
        let boards = await dbContext.Boards.find(creatorEmail)
        if (!creatorEmail) {
            throw new BadRequest("Invalid email");
        }
        return boards;
    }
    async findOne(_id, creatorEmail) {
        let board = await dbContext.Boards.findById(_id, creatorEmail)
        if (!board) {
            throw new BadRequest("Invalid Id")
        }
        return board;
    }
    async create(boardData) {
        let board = await dbContext.Boards.create(boardData)
        if (!board) {
            throw new BadRequest("Invalid email")
        }
        return board;
    }

    async delete(_id) {
        return await dbContext.Boards.findByIdAndDelete(_id);
    }
}
export const boardsService = new BoardsService();