import { setAlert } from "./alert";
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOADING,
    GET_USER,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
} from "./types";
import { axiosAuth } from "../services/AxiosInstance";
import { useDispatch } from "react-redux";

export const login = (email, password) => async (dispatch) => {
    console.log("attempt login");
    const body = JSON.stringify({ email, password });
    dispatch({ type: LOADING });
    try {
        const tokenResponse = await axiosAuth.post(`/token/`, body);
        // TODO: add success validation
        dispatch({
            type: LOGIN_SUCCESS,
            payload: tokenResponse.data,
        });
        localStorage.setItem("access_token", tokenResponse.data.access);
        localStorage.setItem("refresh_token", tokenResponse.data.refresh);
        const userResponse = await axiosAuth.get(`/login/`, body);
        dispatch({
            type: GET_USER,
            payload: userResponse.data,
        });

        dispatch(setAlert("Authenticated successfully", "success"));
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err,
        });

        dispatch(setAlert("Error Authenticating", "error"));
    }
};

export const signup =
    ({ first_name, last_name, email, password, username }) =>
    async (dispatch) => {
        const body = JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            username,
        });

        try {
            const res = await axiosAuth.post(`/register/`, body);

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data,
            });

            dispatch(login(email, password));
        } catch (err) {
            dispatch({
                type: SIGNUP_FAIL,
                payload: err,
            });

            dispatch(setAlert("Error Authenticating", "error"));
        }
    };

export const logout = () => (dispatch) => {
    dispatch(setAlert("logout successful.", "success"));
    dispatch({ type: LOGOUT });
};

export const refresh = () => async (dispatch) => {
    const refreshToken = localStorage.getItem("refresh_token");
    console.log("refresh outer");
    if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log("REFRESH token parts: ", tokenParts.exp);

        if (tokenParts.exp > now) {
            try {
                dispatch({ type: LOADING });
                const res = await axiosAuth.post("/token/refresh/", {
                    refresh: refreshToken,
                });
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data,
                });
                console.log("In Refresh");
            } catch (err) {
                dispatch({
                    type: REFRESH_FAIL,
                    payload: err,
                });
                dispatch(setAlert("Error Authenticating", "error"));
            }
        } else {
            dispatch({
                type: REFRESH_FAIL,
                payload: err,
            });
            dispatch(setAlert("Error Authenticating", "error"));
        }
    }
};
