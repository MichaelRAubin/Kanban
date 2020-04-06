import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class ListsService {
    async get(query = {}) {
        return await dbContext.Lists.find(query);
    }

    async create(email, listData) {
        listData.creatorEmail = email;
        return await dbContext.Lists.create(listData)
    }

    async delete(email, id) {
        return await dbContext.Lists.findOneAndRemove({ creatorEmail: email, _id: id });
    }
}

export const listsService = new ListsService();