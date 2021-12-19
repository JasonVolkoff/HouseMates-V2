import { setAlert } from "./alert";
import { authentication, user, LOADING, TOAST_TYPE } from "./types";
import { axiosAuth } from "../services/AxiosInstance";

export const login = (email, password) => async (dispatch) => {
    console.log("attempt login");
    const body = JSON.stringify({ email, password });
    dispatch({ type: LOADING });
    try {
        const tokenResponse = await axiosAuth.post(`/token/`, body);
        // TODO: add success validation
        dispatch({
            type: authentication.LOGIN_SUCCESS,
            payload: tokenResponse.data,
        });
        localStorage.setItem("access_token", tokenResponse.data.access);
        localStorage.setItem("refresh_token", tokenResponse.data.refresh);
        const userResponse = await axiosAuth.get(`/get-user/`, body);
        dispatch({
            type: user.GET_USER,
            payload: userResponse.data,
        });

        dispatch(setAlert("Authenticated successfully", TOAST_TYPE.SUCCESS));
    } catch (err) {
        dispatch({
            type: authentication.LOGIN_FAIL,
            payload: err,
        });

        dispatch(setAlert("Error Authenticating", TOAST_TYPE.ERROR));
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
                type: authentication.SIGNUP_SUCCESS,
                payload: res.data,
            });

            dispatch(login(email, password));
        } catch (err) {
            dispatch({
                type: authentication.SIGNUP_FAIL,
                payload: err,
            });

            dispatch(setAlert("Error Authenticating", TOAST_TYPE.ERROR));
        }
    };

export const logout = () => (dispatch) => {
    dispatch(setAlert("Logout successful.", TOAST_TYPE.SUCCESS));
    dispatch({ type: authentication.LOGOUT });
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
                    type: authentication.REFRESH_SUCCESS,
                    payload: res.data,
                });
                console.log("In Refresh");
            } catch (err) {
                dispatch({
                    type: authentication.REFRESH_FAIL,
                    payload: err,
                });
                dispatch(setAlert("Error Authenticating", "error"));
            }
        } else {
            dispatch({
                type: authentication.REFRESH_FAIL,
                payload: err,
            });
            dispatch(setAlert("Error Authenticating", "error"));
        }
    }
};
