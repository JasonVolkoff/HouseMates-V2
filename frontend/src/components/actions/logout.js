import React, { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

export default function Logout() {
    let navigate = useNavigate();

    function logoutUser() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        axiosInstance.defaults.headers["Authorization"] = null;
        navigate("/");
    }
    return <p onClick={logoutUser}>Logout</p>;
}
