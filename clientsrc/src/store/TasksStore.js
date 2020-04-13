import { Task } from "../models/Task";
import { $resource } from "./resource";
import Vue from 'vue';

export default {
    state: {
        tasks: {},
    },
    mutations: {
        setTasks(state, payload) {
            Vue.set(state.tasks, payload.listId, payload.data);
        },
        setTask(state, task = new Task()) {
            state.task = task;
        },
        addTask(state, task) {
            state.tasks.push(new Task(task));
        },
        deleteTask(state, task) {
            let i = state.tasks.findIndex(t => t.id == task.id)
            if (i != -1) {
                state.tasks.splice(i, 1)
            }
        },
    },
    actions: {
        async getTasks({ commit, dispatch }, payload) {
            let res = await $resource.get("api/lists/" + payload + "/tasks");
            commit("setTasks", { listId: payload, data: res.data });

        },
        async getTask({ commit }, id) {
            let tasks = await $resource.get("api/tasks/" + id);
            commit("setTask", tasks);
        },
        async createTask({ commit }, taskData) {
            let task = await $resource.post("api/tasks/", taskData);
            // REVIEW when creating a board this sets it as the active board
            commit("setTask", task);
            commit("addTask", task);
        },
        async deleteTask({ commit }, task) {
            await $resource.delete("api/tasks/" + task.id)
            commit("deleteTask", task);
        }
    },
    // getters: {
    //     tasks(state) {
    //         let mappedTasks = {};
    //         state.tasks.forEach(ts => {
    //             mappedTasks[ts.listId] = ts;
    //         });
    //         return mappedTasks;
    //     }
    // }
};