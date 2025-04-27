import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

// 🔥 dodaj ten nagłówek:
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.request.use(config => {
    const token = Cookies.get('XSRF-TOKEN');
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;
});

export default axios;
