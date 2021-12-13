import { v4 as uuid } from "uuid";
import { alerts } from "./types";

export const setAlert =
    (msg, alertType, timeout = 5000) =>
    (dispatch) => {
        dispatch({ type: alerts.REMOVE_ALL_ALERTS });

        const id = uuid();
        dispatch({
            type: alerts.SET_ALERT,
            payload: { msg, alertType, id },
        });

        setTimeout(
            () => dispatch({ type: alerts.REMOVE_ALERT, payload: id }),
            timeout
        );
    };
