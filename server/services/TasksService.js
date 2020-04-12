import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors";

class TasksService {
    async find(creatorEmail) {
        let tasks = await dbContext.Tasks.find(creatorEmail)
        if (!creatorEmail) {
            throw new BadRequest("Invalid email");
        }
        return tasks;
    }
    async findOne(_id, creatorEmail) {
        let task = await dbContext.Tasks.findById(_id, creatorEmail)
        if (!task) {
            throw new BadRequest("Invalid Id")
        }
        return task;
    }
    async findByListId(listId) {
        let tasks = await dbContext.Tasks.find({ listId: listId })
        if (!listId) {
            throw new BadRequest("Invalid ID")
        } return tasks
    }
    async create(taskData) {
        let task = await dbContext.Tasks.create(taskData)
        if (!task) {
            throw new BadRequest("Invalid email")
        }
        return task;
    }

    async delete(_id) {
        let task = await dbContext.Tasks.findByIdAndDelete(_id);
        if (!_id) {
            throw new BadRequest("Invalid ID")
        } return task._id
    }
}
export const tasksService = new TasksService();