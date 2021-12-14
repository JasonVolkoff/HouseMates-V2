import axios from "axios";
import { REFRESH_FAIL, REFRESH_SUCCESS } from "../actions/types";
import { useDispatch } from "react-redux";

const baseURL = "/api";

export const axiosAuth = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: "BEARER " + localStorage.getItem("access_token"),
        "Content-type": "application/json",
        accept: "application/json",
    },
});

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: "BEARER " + localStorage.getItem("access_token"),
        "Content-type": "application/json",
        accept: "application/json",
    },
});
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        console.log("Original request: ", originalRequest);
        // Prevent infinite loops early
        if (
            error.response.status === 401 &&
            originalRequest.url === "token/refresh/"
        ) {
            console.log("Prevent infinite loops");
            //window.location.href = "/login";
            return Promise.reject(error);
        }

        if (
            error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized"
        ) {
            console.log("In interceptor");
            const refreshToken = localStorage.getItem("refresh_token");

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log("Intercepter token: ", tokenParts.exp);
                const dispatch = useDispatch();
                if (tokenParts.exp > now) {
                    dispatch({ type: LOADING });
                    console.log("Unexpired token found; refreshing");
                    return axiosInstance
                        .post("/token/refresh/", { refresh: refreshToken })
                        .then((response) => {
                            dispatch({
                                type: REFRESH_SUCCESS,
                                payload: response.data,
                            });
                            axiosInstance.defaults.headers["Authorization"] =
                                "BEARER " + response.data.access;
                            originalRequest.headers["Authorization"] =
                                "BEARER " + response.data.access;

                            return axiosInstance(originalRequest);
                        })
                        .catch((err) => {
                            console.log("Error refreshing; failed");
                            dispatch({
                                type: REFRESH_FAIL,
                                payload: err,
                            });

                            dispatch(setAlert("Error Authenticating", "error"));
                        });
                } else {
                    console.log(
                        "Refresh token is expired",
                        tokenParts.exp,
                        now
                    );
                    window.location.href = "/login";
                }
            } else {
                console.log("Refresh token not available.");
                window.location.href = "/login";
            }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);
export default axiosInstance;
