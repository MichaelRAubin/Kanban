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
    async create(boardData, creatorEmail) {
        let board = await dbContext.Boards.create(boardData)
        if (!boardData.creatorEmail) {
            throw new BadRequest("Invalid email")
        }
        return board;
    }

    async delete(_id, creatorEmail) {
        let board = await dbContext.Boards.findByIdAndDelete(_id, creatorEmail)
        if (creatorEmail != board.id.creatorEmail) {
            throw new BadRequest("Invalid email")
        }
        return board;
    }
}
export const boardsService = new BoardsService();