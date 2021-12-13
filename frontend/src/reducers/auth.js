import { authentication, user, LOADING } from "../actions/types";

const initialState = {
    first_name: null,
    last_name: null,
    username: null,
    is_active: null,
    is_staff: null,
    is_superuser: null,
    email: null,
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
        case authentication.LOGIN_SUCCESS:
            localStorage.setItem("access_token", payload.access);
            localStorage.setItem("refresh_token", payload.refresh);
            return {
                ...state,
            };
        case user.GET_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                email: payload.email,
                first_name: payload.first_name,
                last_name: payload.last_name,
                username: payload.username,
                is_active: payload.is_active,
                is_staff: payload.is_staff,
                is_superuser: payload.is_superuser,
            };
        case authentication.LOGIN_FAIL:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return {
                ...state,
                errors: payload.errors,
                loading: false,
            };
        case authentication.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: true,
                erros: null,
            };
        case authentication.SIGNUP_FAIL:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return {
                ...state,
                errors: payload.errors,
                loading: false,
            };
        case authentication.REFRESH_SUCCESS:
            localStorage.setItem("access_token", payload.access);
            localStorage.setItem("refresh_token", payload.refresh);
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
            };
        case authentication.REFRESH_FAIL:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                errors: payload.errors,
            };
        case authentication.LOGOUT:
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
