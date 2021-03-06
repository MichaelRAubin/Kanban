import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { boardsService } from "../services/BoardsService"
import { listsService } from "../services/ListsService"
import { tasksService } from "../services/TasksService"
import { commentsService } from "../services/CommentsService"

export class BoardsController extends BaseController {
    constructor() {
        super("api/boards");
        this.router
            .use(auth0Provider.getAuthorizedUserInfo)
            .get("", this.getBoards)
            .get("/:boardId", this.getBoard)
            .get("/:boardId/lists", this.getListsByBoardId)
            .get("/:boardId/tasks", this.getTasksByBoardId)
            .get("/:boardId/comments", this.getCommentsByBoardId)
            //TODO add in route to get lists tied to board
            .post("", this.create)
            .delete("/:boardId", this.delete);
    }

    async getBoards(req, res, next) {
        try {
            let boards = await boardsService.find({ creatorEmail: req.userInfo.email });
            return res.send(boards);
        } catch (error) {
            next(error);
        }
    }

    async getBoard(req, res, next) {
        try {
            let board = await boardsService.findOne({ _id: req.params.boardId, creatorEmail: req.userInfo.email });
            res.send(board);
        } catch (error) {
            next(error);
        }
    }
    async getListsByBoardId(req, res, next) {
        try {
            // FIXME verify the user has access to this content
            let lists = await listsService.findByBoardId(req.params.boardId)
            res.send(lists)
        } catch (error) {
            next(error);
        }
    }
    async getTasksByBoardId(req, res, next) {
        try {
            // FIXME verify the user has access to this content
            let tasks = await tasksService.findByBoardId(req.params.boardId)
            res.send(tasks)
        } catch (error) {
            next(error);
        }
    }
    async getCommentsByBoardId(req, res, next) {
        try {
            let comments = await commentsService.findByBoardId(req.params.boardId)
            res.send(comments)
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creatorEmail = req.userInfo.email;
            let board = await boardsService.create(req.body);
            res.send(board);
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            // FIXME restrict to the creator
            let board = await boardsService.delete(req.params.boardId);
            res.send("Board Deleted")
        } catch (error) {
            next(error)
        }
    }
}