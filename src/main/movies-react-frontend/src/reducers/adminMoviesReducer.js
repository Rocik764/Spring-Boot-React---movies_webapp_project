import types from "../actions/types";

const movie = JSON.parse(localStorage.getItem("movie"));

const initialState = movie
    ? { movie }
    : { movie: null };

export default function movieGet(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.SET_MOVIE:
            return {
                ...state,
                movie: payload
            };

        default:
            return state;
    }
}