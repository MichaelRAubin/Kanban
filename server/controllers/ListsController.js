import BaseController from "../utils/BaseController";
import { listsService } from "../services/ListsService";
import auth0Provider from "@bcwdev/auth0provider";

export class ListsController extends BaseController {
    constructor() {
        super("api/lists");
        this.router
            .use(auth0Provider.getAuthorizedUserInfo)
            .get("", this.get)
            .post("", this.create)
            .delete("/:listId", this.delete);
    }
    async get(req, res, next) {
        try {
            req.query.creatorEmail = req.userInfo.email;
            let lists = await listsService.get(req.query)
            res.send(lists)
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            let list = await listsService.create(req.userInfo.email, req.body)
            res.send(list);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            let list = await listsService.delete(req.userInfo.email, req.params.listId);
            res.send(list)
        } catch (error) {
            next(error);
        }
    }
}