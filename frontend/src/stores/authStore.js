import {defineStore} from "pinia";
import {loginUser, checkAuthStatus, registerUser, logoutUser} from "@/services/authService.js";

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
                this.user = await loginUser(email, password)
                await this.fetchUser()
            }catch(e) {
                this.error = this._parseError(e)
            }finally {
                this.loading = false
            }


        },
        async fetchUser() {
            if(this.user) return
            try {
                this.error = null
                this.user = await checkAuthStatus()
            }catch {
                this.user = null
            }
        },
        async register(name, email, password) {
            this.loading = true
            try {
                this.error = null
                this.user = await registerUser(name, email, password)
                await this.fetchUser()
            }catch(e) {
                this.error = this._parseError(e)
            }finally {
                this.loading = false
            }
        },
        async logout() {
            try {
                this.error = null
                await logoutUser()
            }catch(e) {
                this.error = this._parseError(e)
            }finally {
                this.user = null
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