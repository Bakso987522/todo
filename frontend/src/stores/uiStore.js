import {defineStore} from "pinia";
import {notify} from "notiwind";

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
        },
        showError(){
            notify({
                group: 'error',
                type: 'error',
                title: 'Błąd',
                text: 'Coś poszło nie tak, spróbuj ponownie'
            })
        }

    }
})