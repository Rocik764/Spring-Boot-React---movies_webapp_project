import axios from 'axios';
import authHeader from '../AuthHeader';

const API_URL = 'http://localhost:8080/api/admin/users/';

class AdminService {

    getUsersList() {
        return axios.get(API_URL + 'list', { headers: authHeader() });
    }

    setNewEmail(id, email) {
        return axios.patch(API_URL + 'editMail/' + id, null,{
            params: {
                email: email
            },
            headers: authHeader()
        })
    }

    setAdmin(id) {
        return axios.patch(API_URL + 'setAdmin/' + id, null,{ headers: authHeader() })
    }

    unsetAdmin(id) {
        return axios.patch(API_URL + 'unsetAdmin/' + id, null, { headers: authHeader() })
    }
}

export default new AdminService();