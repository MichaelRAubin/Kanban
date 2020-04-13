import BaseController from "../utils/BaseController";
import { listsService } from "../services/ListsService";
import auth0Provider from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksService"

export class ListsController extends BaseController {
    constructor() {
        //TODO Check this route
        super("api/lists");
        this.router
            .use(auth0Provider.getAuthorizedUserInfo)
            .get("", this.getLists)
            .get(":listId", this.getList)
            .get("/:listId/tasks", this.getTasksByListId)
            //TODO - may need to add route to get tasks from a list
            .post("", this.create)
            .delete("/:listId", this.delete);
    }
    async getLists(req, res, next) {
        try {
            let lists = await listsService.find({ creatorEmail: req.userInfo.email })
            res.send(lists)
        } catch (error) {
            next(error);
        }
    }
    async getList(req, res, next) {
        try {
            let list = await listsService.findOne({ _id: req.params.listId, creatorEmail: req.userInfo.email });
            res.send(list);
        } catch (error) {
            next(error);
        }
    }
    async getTasksByListId(req, res, next) {
        try {
            let tasks = await tasksService.findByListId(req.params.listId)
            res.send(tasks)
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email;
            let list = await listsService.create(req.body)
            res.send(list);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            let list = await listsService.delete({ _id: req.params.listId });
            res.send("List Deleted")
        } catch (error) {
            next(error);
        }
    }
}