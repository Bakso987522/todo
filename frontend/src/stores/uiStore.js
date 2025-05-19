import {defineStore} from "pinia";
import {notify} from "notiwind";
import UiService from "@/services/uiService.js";
export const useUiStore = defineStore('ui', {
    state: () => ({
        currentTodoView: 'todolist',
        currentList: null,
        currentTodoObject: null,
        colors: null,
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
        },
        setNewTodoView() {
            this.currentTodoView = 'newtodolist'
            this.currentList = null
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