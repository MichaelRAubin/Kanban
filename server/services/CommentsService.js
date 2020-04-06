import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors";

class CommentsService {
    async find(creatorEmail) {
        let comments = await dbContext.Comments.find(creatorEmail)
        if (!creatorEmail) {
            throw new BadRequest("Invalid email");
        }
        return comments;
    }
    async findOne(_id, creatorEmail) {
        let comment = await dbContext.Comments.findById(_id, creatorEmail)
        if (!comment) {
            throw new BadRequest("Invalid Id")
        }
        return comment;
    }
    async create(commentData) {
        let comment = await dbContext.Comments.create(commentData)
        if (!comment) {
            throw new BadRequest("Invalid email")
        }
        return comment;
    }

    async delete(_id) {
        let comment = await dbContext.Comments.findByIdAndDelete(_id);
        if (!_id) {
            throw new BadRequest("Invalid ID")
        } return comment._id
    }
}
export const commentsService = new CommentsService();