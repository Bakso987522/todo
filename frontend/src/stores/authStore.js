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
                console.log(e)
            }finally {
                this.loading = false
            }


        },
        async fetchUser() {
            if(this.user) return
            try {
                this.error = null
                this.user = await AuthService.checkAuthStatus()
            }catch {
                this.user = null
            }
        },
        async register(name, email, password) {
            this.loading = true
            try {
                this.error = null
                this.user = await AuthService.registerUser(name, email, password)
                await this.fetchUser()
            }catch(e) {
                console.log(e)
            }finally {
                this.loading = false
            }
        },
        async logout() {
            try {
                this.error = null
                await AuthService.logoutUser()
            }catch(e) {
                console.log(e)
            }finally {
                this.$reset()
                useTodoStore().$reset()
                useUiStore().$reset()

            }
        },
        _parseError(e) {
            if(!e.response) return "Brak połączenia z internetem. Sprawdź swoej łacze i spróbuj ponownie"
            switch (e.response.status) {
                case 422:
                    return "Nieprawidłowy login lub hasło"
                default:
                    return "Cos poszło nie tak (" + e.response.data.message + ")"
            }

        }
    }
})