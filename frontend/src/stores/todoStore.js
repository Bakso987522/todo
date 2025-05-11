import {defineStore} from "pinia";
import TodoService from "../services/todoService.js";

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todoLists: null,
        todoList: null,
        loading: false,
        adding: false,
        error: null,
        colors: null
    }),
    actions: {
        async fetchTodoLists() {
            this.loading = true
            try {
                this.error = null
                this.todoLists = await TodoService.getTodoLists()
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false

            }
        },
        async fetchTodoList(id) {
            if(this.todoList){
                if(this.todoList.id !== id){
                    this.loading = true
                }
            }
            try {
                this.error = null
                this.todoList = await TodoService.getTodoList(id)
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false

            }
        },
        async addTodoList(data) {
            this.loading = true
            try {
                this.error = null
                await TodoService.addTodoList(data)
                await this.fetchTodoLists()
                await this.fetchTodoList(this.todoLists?.at(-1).id)
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async addTodoItem(name, deadline, tag_name) {
            try {
                this.adding = true
                this.error = null
                await TodoService.addTodoItem(name, deadline, tag_name, this.todoList.id)
                await this.fetchTodoList(this.todoList.id)
            } catch (e) {
                console.log(e)
            }finally {
                this.adding = false
            }
        },
        async updateTodoItem(id, data) {
            try {
                this.error = null
                await TodoService.updateTodoItem(id, data)
                await this.fetchTodoList(this.todoList.id)
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async getColors() {
            try {
                const response = await TodoService.getColors()
                this.colors = response.data
            } catch (e) {
                console.log(e)
            }
        }

    }
})