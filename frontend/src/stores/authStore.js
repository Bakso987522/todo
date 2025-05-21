import {defineStore} from "pinia";
import AuthService from "@/services/authService.js";
import {useTodoStore} from "@/stores/todoStore.js";
import {useUiStore} from "@/stores/uiStore.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loading: null,
        error: null
    }),

    getters: {
        isLogged: (state) => !!state.user
    },

    actions: {
        async login(email, password) {
            this.loading = true
            try {
                this.error = null
                this.user = await AuthService.loginUser(email, password)
                await this.fetchUser()
            }catch(e) {
                this._parseError(e)
            }finally {
                this.loading = false
                if(!useUiStore().colors) await useUiStore().getColors()
            }


        },
        async fetchUser() {
            if(this.user) return
            try {
                this.error = null
                this.user = await AuthService.checkAuthStatus()
            }catch(e) {
                this.user = null
                this._parseError(e)
            }
        },
        async register(name, email, password) {
            this.loading = true
            try {
                this.error = null
                this.user = await AuthService.registerUser(name, email, password)
                await this.fetchUser()
            }catch(e) {
                this._parseError(e)
            }finally {
                this.loading = false
                if(!useUiStore().colors) await useUiStore().getColors()
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
            useUiStore().showConfirmationNotification(e.response.data.message)
        }
    }
})