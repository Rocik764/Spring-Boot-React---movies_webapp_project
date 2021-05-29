import axios from "axios";
import authHeader from '../AuthHeader';

const API_URL = 'http://localhost:8080/api/admin/'

class AdminMovieService {

    addMovie(formData) {
        return fetch(API_URL + 'add', {
            method: 'post',
            body: formData,
            headers: authHeader()
        }).then(response => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
    }

    deleteMovie(id) {
        return axios.delete(API_URL + 'delete/' + id, {headers: authHeader()})
    }

    // editMovie(formData) {
    //     return axios.patch(API_URL + 'editMovie', formData, {headers: authHeader()})
    // }

    editMovie(formData) {
        return fetch(API_URL + 'editMovie', {
            method: 'PATCH',
            body: formData,
            headers: authHeader()
        }).then(response => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
    }
}

export default new AdminMovieService()