import { Task } from "../models/Task";
import { $resource } from "./resource";
import Vue from 'vue';

export default {
    state: {
        tasks: [],
        task: new Task()
    },
    mutations: {
        setTasks(state, tasks = []) {
            state.tasks = tasks;
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
        async getTasks({ commit }, listId) {
            let tasks = await $resource.get("api/lists/" + listId + "/tasks");
            commit("setTasks", tasks);
        },
        async getTask({ commit }, id) {
            let task = await $resource.get("api/tasks/" + id);
            commit("setTask", task);
        },
        async createTask({ commit }, taskData) {
            let task = await $resource.post("api/tasks/", taskData);
            // REVIEW when creating a board this sets it as the active board
            commit("addTask", task);
            commit("setTask", task);
        },
        async deleteTask({ commit }, task) {
            await $resource.delete("api/tasks/" + task.id)
            commit("deleteTask", task);
        }
    },
    getters: {
        renderTasks(state) {
            let mappedTasks = {};
            state.tasks.forEach(ts => {
                mappedTasks[ts.listId] = ts;
            });
            return mappedTasks;
            debugger
        }
    }
};