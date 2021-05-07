import types from "./types";
import MovieService from "../service/MovieService";

export const setMovie = (movie) => (dispatch) => {
    return MovieService.getMovie(movie).then(
        (response) => {
            dispatch({
                type: types.SET_MOVIE,
                payload: response.data
            });
            localStorage.setItem("movie", JSON.stringify(response.data));
            return Promise.resolve();
        },
        (error) => {

            dispatch({
                type: types.SET_MESSAGE,
                payload: error.response.data
            });

            return Promise.reject();
        }
    );
};

export const clearMovie = () => ({
    type: types.CLEAR_MOVIE,
});