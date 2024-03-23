import axios from 'axios';

const API_URL = '/api/login';

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL, { email, password })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
