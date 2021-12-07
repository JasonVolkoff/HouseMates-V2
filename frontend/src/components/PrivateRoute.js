import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
