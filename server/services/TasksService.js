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
    async findOne(taskId) {
        let task = await dbContext.Tasks.findById(taskId)
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
    async findByBoardId(boardId) {
        let tasks = await dbContext.Tasks.find({ boardId: boardId })
        if (!boardId) {
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
    async updateTask(task) {
        let updatedTask = await this.findOne(task);
        // @ts-ignore
        updatedTask.listId = task.listId;
        // @ts-ignore
        let taskWithNewId = await dbContext.Tasks.findByIdAndUpdate(task.id, updatedTask, { new: true });
        return taskWithNewId
    }

    async delete(_id) {
        let task = await dbContext.Tasks.findByIdAndDelete(_id);
        if (!_id) {
            throw new BadRequest("Invalid ID")
        } return task._id
    }
}
export const tasksService = new TasksService();