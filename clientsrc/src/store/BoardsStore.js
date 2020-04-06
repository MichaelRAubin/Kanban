import { Board } from "../models/Board";
import { $resource } from "./resource";

export default {
    state: {
        boards: [],
        board: new Board()
    },
    mutations: {
        deleteBoard(state, board) {
            let i = state.boards.findIndex(b => b._id == board.id)
            if (i != -1) {
                state.boards.splice(i, 1)
            }
        },
        setBoards(state, boards = []) {
            state.boards = boards;
        },
        setBoard(state, board = new Board()) {
            state.board = board;
        },
        addBoard(state, board) {
            state.boards.push(new Board(board));
        },
    },
    actions: {
        async deleteBoard({ commit }, board) {
            await $resource.delete("api/boards/" + board.id)
            commit("deleteBoard", board);
        },
        async getBoards({ commit }, id) {
            let boards = await $resource.get("api/boards");
            commit("setBoards", boards);
        },
        async getBoard({ commit }, id) {
            let boards = await $resource.get("api/boards/" + id);
            commit("setBoard", boards);
        },
        async createBoard({ commit }, boardData) {
            let board = await $resource.post("api/boards/", boardData);
            // REVIEW When creating a board this sets it as the active board
            commit("setBoard", board);
            commit("addBoard", board);
        },
    },
}