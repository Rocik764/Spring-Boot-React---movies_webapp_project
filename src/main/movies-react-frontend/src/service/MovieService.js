import axios from "axios";
import authHeader from './AuthHeader';

const API_URL = 'http://localhost:8080/api/movie/'

class MovieService {

    listMovies() {
        return axios.get(API_URL + 'list', {headers: authHeader()})
    }

    listMoviesByCategory(category) {
        return axios.get(API_URL + 'list/' + category, {headers: authHeader()})
    }

    getMovie(id) {
        return axios.get(API_URL + 'get/' + id, {headers: authHeader()}).then()
    }
}

export default new MovieService()