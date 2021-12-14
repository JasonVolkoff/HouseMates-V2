import { ERROR } from "../actions/types";

const initialState = [];
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ERROR:
            return {
                ...state,
                loading: false,
                errors: payload.errors,
            };
        default:
            return state;
    }
}
