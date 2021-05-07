import types from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export default function auth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case types.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case types.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case types.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}