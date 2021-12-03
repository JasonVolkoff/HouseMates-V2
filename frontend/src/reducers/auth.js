import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/types";

const initialState = {
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
    isAuthenticated: null,
    loading: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("access_token", payload.access);
            localStorage.setItem("refresh_token", payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                access_token: payload.access,
                refresh_token: payload.refresh,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            };
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return {
                ...state,
                refresh_token: null,
                access_token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
}
