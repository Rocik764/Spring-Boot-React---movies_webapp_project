import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import adminMoviesReducer from "./adminMoviesReducer";

export default combineReducers({
    auth,
    message,
    adminMoviesReducer
});