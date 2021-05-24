import types from "./types";

import AuthService from "../service/AuthService"

export const register = (email, password) => (dispatch) => {
    return AuthService.register(email, password).then(
        (response) => {
            dispatch({
                type: types.REGISTER_SUCCESS,
            });

            dispatch({
                type: types.SET_MESSAGE,
                payload: response.data,
            });

            return Promise.resolve();
        },
        (error) => {

            dispatch({
                type: types.REGISTER_FAIL,
            });

            dispatch({
                type: types.SET_MESSAGE,
                payload: error.response.data
            });

            return Promise.reject();
        }
    );
};

export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
        (data) => {
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: { user: data },
            });

            return Promise.resolve();
        },
        (error) => {
            console.log(error.response.data)
            dispatch({
                type: types.LOGIN_FAIL,
            });

            dispatch({
                type: types.SET_MESSAGE,
                payload: error.response.data
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: types.LOGOUT,
    });
};