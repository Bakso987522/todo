import axios from '@/axios';

export default class AuthService {
    static async registerUser(name, email, password) {
        await axios.get('/sanctum/csrf-cookie');
        await axios.post('/register', {
            name,
            email,
            password,
            password_confirmation: password
        });
    }

    static async loginUser(email, password) {
        await axios.get('/sanctum/csrf-cookie');
        await axios.post('/login', { email, password });
    }

    static async logoutUser() {
        await axios.post('/logout');
    }

    static async checkAuthStatus() {
        const { data: user } = await axios.get('/api/user');
        return user;
    }
}