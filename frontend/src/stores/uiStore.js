import {defineStore} from "pinia";
import {notify} from "notiwind";
import UiService from "@/services/uiService.js";
import {useTodoStore} from "@/stores/todoStore.js";
import router from "@/router/index.js";
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
            router.currentRoute.value.path !== '/todos' ? router.push('/todos') : null
        },
        setNewTodoView() {
            this.currentTodoView = 'newtodolist'
            useTodoStore().todoList = null
            this.editMode = false
            this.currentList = null
            useTodoStore().resetTempTodoList()
            router.currentRoute.value.path !== '/todos' ? router.push('/todos') : null
            this.tempList()
        },
        setAdminPanelView() {
            this.currentTodoView = 'adminpanel'
            this.editMode = false
            useTodoStore().todoList = null
            this.currentList = null
            router.currentRoute.value.path !== '/adminpanel' ? router.push('/adminpanel') : null
        },
        showConfirmationNotification(message) {
            notify({
                group: 'confirmation',
                type: 'confirmation',
                title: 'Sukces!',
                text: message,
            }, 2500)
        },
        showErrorNotification(message) {
            notify({
                group: 'error',
                type: 'error',
                title: 'Błąd!',
                text: message,
            }, 3500)
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
        },
        _parseError(e) {
            const ui = useUiStore()
            const auth = useAuthStore()

            if (e.response) {
                const status = e.response.status

                if (status === 401) {
                    this.error = 'Sesja wygasła. Zaloguj się ponownie.'
                    auth.$reset()
                    ui.showErrorNotification(this.error)

                    import('@/router').then(module => {
                        module.default.push({ name: 'login' })
                    })

                    return
                }

                this.error = e.response.data.message || 'Wystąpił błąd.'
            } else if (e.request) {
                this.error = 'Brak odpowiedzi z serwera'
            } else {
                this.error = "Nieznany błąd: " + e.message
            }

            ui.showErrorNotification(this.error)
        }


    }
})