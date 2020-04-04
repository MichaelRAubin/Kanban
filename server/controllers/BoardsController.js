import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";

export class BoardsController extends BaseController {
    constructor() {
        super("api/boards");
        this.router
            .use(auth0Provider.getAuthorizedUserInfo)
            .get("", this.getBoards)
            .get("/:boardId", this.getBoard)
            .post("", this.create);
    }
    //FIXME all methods MUST be abstrated to a Service
    async getBoards(req, res, next) {
        try {
            let boards = await dbContext.Boards.find({ creatorEmail: req.userInfo.email });
            return res.send(boards);
        } catch (error) {
            next(error);
        }
    }

    async getBoard(req, res, next) {
        try {
            let board = await dbContext.Boards.findOne({ _id: req.params.boardId, creatorEmail: req.userInfo.email });
            res.send(board);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creatorEmail = req.userInfo.email;
            let board = await dbContext.Boards.create(req.body);
            res.send(board);
        } catch (error) {
            next(error);
        }
    }
}