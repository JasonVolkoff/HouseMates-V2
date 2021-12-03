import React, { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";

function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    if (loading) {
        return <p>Loading</p>;
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default PrivateRoute;
