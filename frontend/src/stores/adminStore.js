import { defineStore } from 'pinia';
import AdminService from '@/services/AdminService';
import {useUiStore} from "@/stores/uiStore.js";

export const useAdminStore = defineStore('admin', {
    state: () => ({
        loading: false,
        error: null,
        users: { data: [] },
        filters: { email: '', role: '' },
        page: 1,
        perPage: 5,
        roles: [
            { id: 1, name: 'user' },
            { id: 2, name: 'admin' }
        ],
        listLimits: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
        taskLimits: Array.from({ length: 11 }, (_, i) => i * 10),
    }),

    actions: {
        async fetchUsers() {
            try{
                this.error = null;
                const data = await AdminService.fetchUsers({
                    page: this.page,
                    filters: this.filters,
                    perPage: this.perPage,
                });
                this.users = data;
            }catch (e) {
                this._parseError(e);
            } finally {
                this.loading = false;
            }
        },

        async updateUser(id, payload) {
            try {
                this.error = null;
                this.loading = true;
                await AdminService.updateUser(id, payload);
            }catch (e) {
                this._parseError(e);
            }finally {
                if(!this.error){
                    useUiStore().showConfirmationNotification('Zaktualizowano użytkownika')
                }
                await this.fetchUsers();
                this.loading = false;
            }

        },

        async setPerPage(value) {
            this.perPage = value;
            this.page = 1;
            await this.fetchUsers();
        },

       async setPage(value) {
            this.loading = true;
            this.page = value;
            await this.fetchUsers();
        },
        _parseError(e) {
            useUiStore()._parseError(e)
        }
    },



    });
