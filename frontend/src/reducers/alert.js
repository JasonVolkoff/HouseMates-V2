import { alerts } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case alerts.SET_ALERT:
            return [...state, payload];
        case alerts.REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload);
        case alerts.REMOVE_ALL_ALERTS:
            return state.filter((alert) => !alert.id);
        default:
            return state;
    }
}
