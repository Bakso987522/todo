import axios from '@/axios';

export default class AdminService {
    static async fetchUsers({ page = 1, filters = {}, perPage = 10 }) {
        try {
            const { data } = await axios.post(`/api/admin/users?page=${page}`, {
                ...filters,
                per_page: perPage,
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id, payload) {
        try {
            const { data } = await axios.put(`/api/admin/users/${id}`, payload);
            return data;
        } catch (error) {
            throw error;
        }
    }

}
