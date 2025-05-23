import axios from '@/axios';

export default class AuthService {
    static async registerUser(name, email, password) {
        try {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/register', {
                name,
                email,
                password,
                password_confirmation: password
            });
        } catch (error) {
            throw error;
        }
    }

    static async loginUser(email, password) {
        try {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/login', { email, password });
        } catch (error) {
            throw error;
        }
    }

    static async logoutUser() {
        try {
            await axios.post('/logout');
        } catch (error) {
            throw error;
        }
    }

    static async checkAuthStatus() {
        try {
            const { data: user } = await axios.get('/api/user');
            return user;
        } catch (error) {
            throw error;
        }
    }
}
