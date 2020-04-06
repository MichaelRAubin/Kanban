import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService"

export class CommentsController extends BaseController {
    constructor() {
        //TODO Check this route
        super("api/comments");
        this.router
            .use(auth0Provider.getAuthorizedUserInfo)
            .get("", this.getComments)
            .get("/:commentId", this.getComment)
            //TODO add in route to get comments tied to a task?
            .post("", this.create)
            .delete("/:commentId", this.delete);
    }

    async getComments(req, res, next) {
        try {
            let comments = await commentsService.find({ creatorEmail: req.userInfo.email });
            return res.send(comments);
        } catch (error) {
            next(error);
        }
    }

    async getComment(req, res, next) {
        try {
            let comment = await commentsService.findOne({ _id: req.params.boardId, creatorEmail: req.userInfo.email });
            res.send(comment);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creatorEmail = req.userInfo.email;
            let comment = await commentsService.create(req.body);
            res.send(comment);
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            let comment = await commentsService.delete(req.params.boardId);
            res.send("Comment Deleted", comment)
        } catch (error) {
            next(error)
        }
    }
}