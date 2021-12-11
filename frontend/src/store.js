import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const refreshToken = localStorage.getItem("refresh_token");
let isAuthenticated = false;
if (refreshToken) {
    const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
    // exp date in token is expressed in seconds, while now() returns milliseconds:
    const now = Math.ceil(Date.now() / 1000);
    isAuthenticated = true ? tokenParts.exp > now : false;
}
const initialState = { auth: { isAuthenticated } };

const middleWare = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
