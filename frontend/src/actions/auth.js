import { setAlert } from "./alert";
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOADING,
    GET_USER,
} from "./types";
import axiosInstance from "../services/AxiosInstance";

export const login = (email, password) => async (dispatch) => {
    const body = JSON.stringify({ email, password });
    dispatch({ type: LOADING });
    try {
        const tokenResponse = await axiosInstance.post(`/token/`, body);
        // TODO: add success validation
        dispatch({
            type: LOGIN_SUCCESS,
            payload: tokenResponse.data,
        });
        localStorage.setItem("access_token", tokenResponse.data.access);
        localStorage.setItem("refresh_token", tokenResponse.data.refresh);
        const userResponse = await axiosInstance.get(`/login/`, body);
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
            const res = await axiosInstance.post(`/register/`, body);

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data,
            });

            dispatch(login(email, password));
        } catch (err) {
            dispatch({
                type: SIGNUP_FAIL,
            });

            dispatch(setAlert("Error Authenticating", "error"));
        }
    };

export const logout = () => (dispatch) => {
    dispatch(setAlert("logout successful.", "success"));
    dispatch({ type: LOGOUT });
};
