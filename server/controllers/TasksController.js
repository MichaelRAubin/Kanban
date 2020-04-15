import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksService"
import { commentsService } from "../services/CommentsService"

export class TasksController extends BaseController {
    constructor() {
        //TODO Check this route
        super("api/tasks");
        this.router
            .use(auth0Provider.getAuthorizedUserInfo)
            .get("", this.getTasks)
            .get("/:taskId", this.getTask)
            .get("/:taskId/comments", this.getCommentsByTaskId)
            //TODO add in route to get comments tied to a task?
            .post("", this.create)
            .put("/:taskId", this.updateTask)
            .delete("/:taskId", this.delete);
    }

    async getTasks(req, res, next) {
        try {
            let tasks = await tasksService.find({ creatorEmail: req.userInfo.email });
            return res.send(tasks);
        } catch (error) {
            next(error);
        }
    }

    async getTask(req, res, next) {
        try {
            let task = await tasksService.findOne({ _id: req.params.boardId, creatorEmail: req.userInfo.email });
            res.send(task);
        } catch (error) {
            next(error);
        }
    }
    async getCommentsByTaskId(req, res, next) {
        try {
            let comments = await commentsService.findByTaskId(req.params.taskId)
            res.send(comments)
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email;
            let task = await tasksService.create(req.body);
            res.send(task);
        } catch (error) {
            next(error);
        }
    }
    async updateTask(req, res, next) {
        try {
            let task = await tasksService.updateTask(req.body)
            res.send(task)
        } catch (error) {
            next(error)
        }
    }
    async delete(req, res, next) {
        try {
            let task = await tasksService.delete({ _id: req.params.taskId });
            res.send("Task Deleted")
        } catch (error) {
            next(error)
        }
    }
}