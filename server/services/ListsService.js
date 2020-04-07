import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors";

class ListsService {
    async find(creatorEmail) {
        let lists = await dbContext.Lists.find(creatorEmail)
        if (!creatorEmail) {
            throw new BadRequest("Invalid email");
        }
        return lists;
    }
    async findOne(_id, creatorEmail) {
        let list = await dbContext.Lists.findById(_id, creatorEmail)
        if (!list) {
            throw new BadRequest("Invalid Id")
        }
        return list;
    }
    findByBoardId(id) {

    }
    async create(listData) {
        let list = await dbContext.Lists.create(listData)
        if (!list) {
            throw new BadRequest("Invalid email")
        }
        return list;
    }

    async delete(_id) {
        let list = await dbContext.Lists.findByIdAndDelete(_id);
        if (!_id) {
            throw new BadRequest("Invalid ID")
        } return list._id
    }
}
export const listsService = new ListsService();