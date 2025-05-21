import {defineStore} from "pinia";
import {notify} from "notiwind";
import UiService from "@/services/uiService.js";
import {useTodoStore} from "@/stores/todoStore.js";
export const useUiStore = defineStore('ui', {
    state: () => ({
        currentTodoView: 'todolist',
        currentList: null,
        currentTodoObject: null,
        colors: null,
        editMode: false
    }),
    getters: {
        activeColor: (state) => {
            const id = state.currentTodoObject?.color_id
            return state.colors?.find(color => color.id === id)?.name || 'blue'
        }
    },
    actions: {
        setTodoView() {
            this.currentTodoView = 'todolist'
            this.editMode = false
            useTodoStore().loading = true
        },
        setNewTodoView() {
            this.currentTodoView = 'newtodolist'
            this.editMode = false
            this.currentList = null
            useTodoStore().resetTempTodoList()
            this.tempList()
        },
        showConfirmationNotification(message) {
            notify({
                group: 'confirmation',
                type: 'confirmation',
                title: 'Sukces!',
                text: message,
            }, 3000)
        },
        showUndoNotification(message, {onUndo}, title = '') {
            notify({
                group: 'undo',
                type: 'undo',
                title: title,
                text: message,
                data: {onUndo},
            }, 5000)
        },
        tempList() {
            this.currentTodoObject = useTodoStore().tempTodoList

        },
        mainList(id) {
            this.currentTodoObject = useTodoStore().todoList
        },
        editList(){
            this.editMode = true
            this.tempList()
            useTodoStore().tempTodoList.color_id = useTodoStore().todoList?.color_id
            useTodoStore().tempTodoList.name = useTodoStore().todoList?.name
            useTodoStore().tempTodoList.description = useTodoStore().todoList?.description

        },
        async getColors() {
            try {
                const response = await UiService.getColors()
                this.colors = response.data
            } catch (e) {
                console.log(e)
            }
        }

    }
})