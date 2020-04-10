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
            .get("/:boardId", this.getTask)
            .get("/:taskId/comments", this.getCommentsByTaskId)
            //TODO add in route to get comments tied to a task?
            .post("", this.create)
            .delete("/:boardId", this.delete);
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
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creatorEmail = req.userInfo.email;
            let task = await tasksService.create(req.body);
            res.send(task);
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            let task = await tasksService.delete(req.params.boardId);
            res.send("Task Deleted", task)
        } catch (error) {
            next(error)
        }
    }
}