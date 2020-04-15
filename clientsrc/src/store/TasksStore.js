import { Task } from "../models/Task";
import { $resource } from "./resource";
import Vue from "vue"
import Vuex from "vuex"


export default {
    state: {
        tasks: [],
    },
    mutations: {
        setTasks(state, tasks) {
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
        updateTask(state, task) {
            let index = state.tasks.findIndex(i => i.id == task.id)
            state.tasks.splice(index, 1, task)
        }
    },
    actions: {
        async getTasks({ commit }, boardId) {
            let tasks = await $resource.get("api/boards/" + boardId + "/tasks");
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
            //commit("setTask", task);
        },
        async deleteTask({ commit }, task) {
            await $resource.delete("api/tasks/" + task.id)
            commit("deleteTask", task);
        },
        async moveTask({ commit }, { task, to }) {
            task.listId = to
            let taskToMove = await $resource.put("api/tasks/", task)
            commit("updateTask", taskToMove)
        }
    },
    getters: {
        renderTasks(state) {
            let mappedTasks = {};
            state.tasks.forEach(task => {
                if (!mappedTasks[task.listId]) {
                    mappedTasks[task.listId] = []
                }
                mappedTasks[task.listId].push(task)
            }
            );
            return mappedTasks;
        }
    }
};