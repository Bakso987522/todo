import {defineStore} from "pinia";

export const useUiStore = defineStore('ui', {
    state: () => ({
        currentTodoView: 'todolist',
        currentList: null
    }),
    actions: {
        setTodoView() {
            this.currentTodoView = 'todolist'
        },
        setNewTodoView() {
            this.currentTodoView = 'newtodolist'
            this.currentList = null
        }
    }
})