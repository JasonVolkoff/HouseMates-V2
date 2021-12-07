import jwt_decode from "jwt-decode";
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOADING,
    GET_USER,
} from "../actions/types";

const initialName = localStorage.getItem("name")
    ? JSON.parse(localStorage.getItem("name"))
    : null;

const initialState = {
    name: initialName,
    isAuthenticated: null,
    loading: false,
    errors: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOADING:
            return {
                ...state,
                loading: true,
                errors: null,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("access_token", payload.access);
            localStorage.setItem("refresh_token", payload.refresh);
            return {
                ...state,
            };
        case GET_USER:
            console.log(payload);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                errors: payload.errors,
                loading: false,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: true,
                erros: null,
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                errors: payload.errors,
                loading: false,
            };

        case LOGOUT:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                errors: null,
            };
        default:
            return state;
    }
}
