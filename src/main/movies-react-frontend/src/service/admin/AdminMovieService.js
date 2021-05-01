import axios from "axios";
import authHeader from '../AuthHeader';

const API_URL = 'http://localhost:8080/api/admin/'

class AdminMovieService {

    addMovie(formData) {
        return axios.post(API_URL + 'add', formData, {headers: authHeader()})
    }

    deleteMovie(id) {
        return axios.delete(API_URL + 'delete/' + id, {headers: authHeader()})
    }

    editMovie(formData) {
        return axios.patch(API_URL + 'editMovie', formData, {headers: authHeader()})
    }
}

export default new AdminMovieService()