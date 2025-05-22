import {defineStore} from "pinia";
import AuthService from "@/services/authService.js";
import {useTodoStore} from "@/stores/todoStore.js";
import {useUiStore} from "@/stores/uiStore.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loading: null,
        error: null,
        initialized: false
    }),

    getters: {
        isLogged: (state) => !!state.user,
        isAdmin: (state) => state.user?.role === 'admin',
    },

    actions: {
        async login(email, password) {
            this.loading = true
            try {
                this.error = null
                await AuthService.loginUser(email, password)
                await this.fetchUser()
            } catch (e) {
                this._parseError(e)
            } finally {
                this.loading = false
                if (!useUiStore().colors) await useUiStore().getColors()
            }
        },


        async fetchUser() {
            if(this.initialized) return
            try {
                this.error = null
                this.user = await AuthService.checkAuthStatus()
            }catch(e) {
                this.user = null
                this.initialized = true
                if (e.response?.status === 401) {
                    this.user = null;
                } else {
                    this._parseError(e);
                }
            }
        },
        async register(name, email, password) {
            this.loading = true
            try {
                this.error = null
                await AuthService.registerUser(name, email, password)
                await this.fetchUser()
            } catch (e) {
                this._parseError(e)
            } finally {
                this.loading = false
                if (!useUiStore().colors) await useUiStore().getColors()
            }
        },

        async logout() {
            try {
                this.error = null
                await AuthService.logoutUser()
            }catch(e) {
                this._parseError(e)
            }finally {
                this.$reset()
                useTodoStore().$reset()
                useUiStore().$reset()

            }
        },
        _parseError(e) {
            const ui = useUiStore()
            const auth = useAuthStore()

            if (e.response) {
                const status = e.response.status

                if (status === 401) {
                    this.error = 'Nieprawidłowy email lub hasło.'
                    auth.$reset()
                    ui.showErrorNotification(this.error)
                    import('@/router').then(r => r.default.push({ name: 'login' }))
                    return
                }

                if (status === 422 && e.response.data.errors) {
                    // Laravel validation error
                    const firstField = Object.keys(e.response.data.errors)[0]
                    this.error = e.response.data.errors[firstField][0]
                } else if (e.response.data.message) {
                    this.error = e.response.data.message
                } else {
                    this.error = 'Wystąpił błąd. Spróbuj ponownie.'
                }
            } else if (e.request) {
                this.error = 'Brak odpowiedzi z serwera.'
            } else {
                this.error = "Nieznany błąd: " + e.message
            }

            ui.showErrorNotification(this.error)
        }

    }
})