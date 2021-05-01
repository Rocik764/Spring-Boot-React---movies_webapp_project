import axios from 'axios';
import authHeader from '../AuthHeader';

const API_URL = 'http://localhost:8080/api/';

class AdminService {

    getUserProfile(id) {
        return axios.get(API_URL + 'profile', {
            params: { id: id },
            headers: authHeader()
        });
    }

    getUsersList() {
        return axios.get(API_URL + 'users', { headers: authHeader() });
    }
}

export default new AdminService();