import { Comment } from "../models/Comment";
import { $resource } from "./resource";

export default {
    state: {
        comments: [],

    },
    mutations: {
        setComments(state, comments = []) {
            state.comments = comments;
        },
        setComment(state, comment = new Comment()) {
            state.comment = comment;
        },
        addComment(state, comment) {
            state.comments.push(new Comment(comment));
        },
        deleteComment(state, comment) {
            let i = state.comments.findIndex(c => c.id == comment.id)
            if (i != -1) {
                state.comments.splice(i, 1)
            }
        },
    },
    actions: {
        async getComments({ commit }, boardId) {
            let comments = await $resource.get("api/boards/" + boardId + "/comments");
            commit("setComments", comments);
        },
        async getComment({ commit }, id) {
            let comments = await $resource.get("api/comments/" + id);
            commit("setComment", comments);
        },
        async createComment({ commit }, commentData) {
            let comment = await $resource.post("api/comments/", commentData);
            // REVIEW when creating a board this sets it as the active board
            //commit("setComment", comment);
            commit("addComment", comment);
        },
        async deleteComment({ commit }, comment) {
            await $resource.delete("api/comments/" + comment.id)
            commit("deleteComment", comment);
        }
    },
    getters: {
        renderComments(state) {
            let mappedComments = {};
            state.comments.forEach(comment => {
                if (!mappedComments[comment.taskId]) {
                    mappedComments[comment.taskId] = []
                }
                mappedComments[comment.taskId].push(comment)
            }
            );
            return mappedComments;
        }
    }
};