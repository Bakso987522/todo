import {defineStore} from "pinia";
import TodoService from "../services/todoService.js";
import {useUiStore} from "@/stores/uiStore.js";
import router from "@/router/index.js";
export const useTodoStore = defineStore('todo', {
    state: () => ({
        todoLists: null,
        todoList: null,
        tempTodoList: {
            name: null,
            color_id: 1,
            description: null
        },
        loading: false,
        adding: false,
        error: null,
    }),
    actions: {
        async fetchTodoLists() {
            if(!this.todoLists) {
                this.loading = true
            }
            try {
                this.error = null
                this.todoLists = await TodoService.getTodoLists()
            } catch (e) {
                this._parseError(e)
            } finally {
                this.loading = false

            }
        },
        async fetchTodoList(id) {
            const uiStore = useUiStore()
            if(this.todoList?.id !== id) {
                this.loading = true
            }
            try {
                this.error = null
                this.todoList = await TodoService.getTodoList(id)
                uiStore.currentTodoObject = this.todoList
            } catch (e) {
                this._parseError(e)
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
                this._parseError(e)
            } finally {
                this.loading = false
            }
        },
        async updateTodoList() {
            try {
                this.error = null
                this.adding = true
                await TodoService.updateTodoList(this.todoList.id, this.tempTodoList)
                await this.fetchTodoList(this.todoList.id)
                const idx = this.todoLists.findIndex((el) => el.id === this.todoList.id)
                this.todoLists[idx].color_id = this.todoList.color_id
                this.todoLists[idx].name = this.todoList.name
            } catch (e) {
                this._parseError(e)
            } finally {
                this.loading = false
                this.adding = false
                if (!this.error) {
                    useUiStore().editMode = false
                    useUiStore().showConfirmationNotification("Edycja pomyślna")
                }
            }
        },
        async removeTodoList(id) {
            try {
                this.error = null
                await TodoService.removeTodoList(id)
                await this.fetchTodoLists()
            } catch (e) {
                this._parseError(e)
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
                this._parseError(e)
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
                this._parseError(e)
            } finally {
                this.loading = false
            }
        },
        async removeTodoItem(id) {
            try {
                this.error = null
                await TodoService.removeTodoItem(id)
                await this.fetchTodoList(this.todoList.id)
            } catch (e) {
                this._parseError(e)
            } finally {
                this.loading = false
            }
        },
        async initializeTodoLists() {
            const uiStore = useUiStore()
            await this.fetchTodoLists()
            if (!this.todoList) {
                if (this.todoLists?.length > 0 && uiStore.currentTodoView === 'todolist' && router.currentRoute.value.path === '/todos') {
                    await this.fetchTodoList(this.todoLists[0].id)
                    uiStore.currentList = this.todoLists[0].id
                } else {
                    if (router.currentRoute.value.path === '/todos'){
                        uiStore.setNewTodoView()

                    }

                }
            }
        },

            resetTempTodoList() {
                this.tempTodoList = {
                    name: null,
                    color_id: 1,
                    description: null
                }
            },
        sortTodoItems(field = 'created_at', direction = 'desc') {
            if (!this.todoList?.todo_items) return

            this.todoList.todo_items.sort((a, b) => {
                if (a.is_done !== b.is_done) {
                    return a.is_done - b.is_done
                }

                let aVal, bVal

                if (field === 'tag.name') {
                    const aHasTag = !!a.tag?.name
                    const bHasTag = !!b.tag?.name

                    if (!aHasTag && bHasTag) return 1
                    if (aHasTag && !bHasTag) return -1
                    if (!aHasTag && !bHasTag) return 0

                    aVal = a.tag.name
                    bVal = b.tag.name
                }

                else if (field === 'deadline') {
                    const aHasDate = !!a.deadline
                    const bHasDate = !!b.deadline

                    if (!aHasDate && bHasDate) return 1
                    if (aHasDate && !bHasDate) return -1
                    if (!aHasDate && !bHasDate) return 0

                    aVal = new Date(a.deadline)
                    bVal = new Date(b.deadline)
                }

                else if (field === 'created_at') {
                    const aHasDate = !!a.created_at
                    const bHasDate = !!b.created_at

                    if (!aHasDate && bHasDate) return 1
                    if (aHasDate && !bHasDate) return -1
                    if (!aHasDate && !bHasDate) return 0

                    aVal = new Date(a.created_at)
                    bVal = new Date(b.created_at)
                }

                else {
                    aVal = a[field] || ''
                    bVal = b[field] || ''
                }

                if (direction === 'asc') {
                    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
                } else {
                    return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
                }
            })
        },
        _parseError(e) {
            useUiStore()._parseError(e)
        }





    }
})