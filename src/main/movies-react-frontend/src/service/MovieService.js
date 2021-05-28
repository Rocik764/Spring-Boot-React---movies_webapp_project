import axios from "axios";
import authHeader from './AuthHeader';

const API_URL = 'http://localhost:8080/api/movie/'
const USER_API_URL = 'http://localhost:8080/api/user/movie/'

class MovieService {

    listMovies() {
        return axios.get(API_URL + 'list')
    }

    listMostCommented() {
        return axios.get(API_URL + 'mostCommented')
    }

    listTopRated() {
        return axios.get(API_URL + 'topRated')
    }

    listMoviesByCategory(category) {
        return axios.get(API_URL + 'list/' + category)
    }

    getMovie(id) {
        return axios.get(API_URL + 'get/' + id)
    }

    postComment(id, formData) {
        return axios.post(USER_API_URL + 'comment/' + id, formData,{headers: authHeader()})
    }

    rateMovie(id, userId, rate) {
        return axios.patch(USER_API_URL + 'rate/' + id, null,{
            params: {
                userId: userId,
                rate: rate
            },
            headers: authHeader()
        })
    }
}

export default new MovieService()