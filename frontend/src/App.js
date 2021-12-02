import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Layout from "./hocs/Layout";
import PrivateRoute from "./components/privateRoute";
import HomePage from "./pages/HomePage";
import HousePage from "./pages/HousePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <PrivateRoute path="/" element={HomePage} />
                    <PrivateRoute path="/my-house" element={HousePage} />
                    <Route path="/login" element={LoginPage} />
                    <Route path="/signup" element={SignUpPage} />
                    <Route element={NotFound} />
                </Routes>
            </Layout>
        </Router>
    </Provider>
);

export default App;
