import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import utilities from "./utilities";

export default combineReducers({
    alert,
    auth,
    utilities,
});
