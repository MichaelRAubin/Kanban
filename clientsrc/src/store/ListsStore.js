import { List } from "../models/List";
import { $resource } from "./resource";

export default {
    state: {
        lists: [],
        board: new List()
    },
    mutations: {
        setLists(state, lists = []) {
            state.lists = lists;
        },
        setList(state, list = new List()) {
            state.list = list;
        },
        addList(state, list) {
            state.lists.push(new List(list));
        },
        deleteList(state, list) {
            let i = state.lists.findIndex(l => l.id == list.id)
            if (i != -1) {
                state.lists.splice(i, 1)
            }
        },
    },
    actions: {
        async getLists({ commit }) {
            let lists = await $resource.get("api/boardId/lists");
            commit("setLists", lists);
        },
        async getList({ commit }, id) {
            let lists = await $resource.get("api/lists/" + id);
            commit("setList", lists);
        },
        async createList({ commit }, listData) {
            let list = await $resource.post("api/lists/", listData);
            // REVIEW when creating a board this sets it as the active board
            commit("setList", list);
            commit("addList", list);
        },
        async deleteBoard({ commit }, list) {
            await $resource.delete("api/lists/" + list.id)
            commit("deleteList", list);
        }
    }
};