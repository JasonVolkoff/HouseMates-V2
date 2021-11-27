import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/profilePage";
import Navbar from "./components/navbar";
import HomePage from "./pages/homePage";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Navbar />
                <Routes>
                    <Route element={<ProfilePage />} path="/profile" />
                    <Route element={<HomePage />} path="/" exact />
                </Routes>
            </>
        );
    }
}
