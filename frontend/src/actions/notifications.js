import { axiosInstance } from "../services/AxiosInstance";
import { setAlert } from "./alert";
import { LOADING, DONE_LOADING, ERROR, TOAST_TYPE } from "./types";

export const profileNotifications = () => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
        const res = await axiosInstance.get("/profile/notifications");
        dispatch({ type: DONE_LOADING });
        return res.data;
    } catch (err) {
        dispatch({ type: ERROR, payload: err });
        dispatch(
            setAlert("Error fetching profile notifications", TOAST_TYPE.ERROR)
        );
    }
};
