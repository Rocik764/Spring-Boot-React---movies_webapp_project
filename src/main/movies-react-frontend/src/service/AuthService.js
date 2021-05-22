import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

    login(name, password) {
        return axios
            .post(API_URL + "login", {
                name,
                password
            })
            .then(response => {
                if (response.data.jwt) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("movie");
        localStorage.removeItem("movieId");
    }

    register(name, password) {
        return axios.post(API_URL + "register",{
                name: name,
                password: password
            }
        )
    }

    // getCurrentUser() {
    //     return JSON.parse(localStorage.getItem('user'));
    // }
}

export default new AuthService();

