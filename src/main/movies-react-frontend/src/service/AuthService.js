import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

    login(email, password) {
        return axios
            .post(API_URL + "login", {
                email,
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

    register(email, password) {
        return axios.post(API_URL + "register",{
                email: email,
                password: password
            }
        )
    }

    resend(link) {
        return axios.get(link)
    }
}

export default new AuthService();

