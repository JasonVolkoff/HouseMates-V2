import React, { useEffect, useSelector, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Layout from "./hocs/Layout";
import PrivateRoute from "./components/privateRoute";
import HomePage from "./pages/HomePage";
import HousePage from "./pages/HousePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useDispatch } from "react-redux";

import { refresh } from "./actions/auth";

const App = () => {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        dispatch(refresh());
    }, []);

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/my-house"
                        element={
                            <PrivateRoute>
                                <HousePage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Router>
    );
};
export default App;
