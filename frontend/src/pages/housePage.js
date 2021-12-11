import React from "react";
import { useSelector } from "react-redux";

const HousePage = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    return <div>This is My House Page</div>;
};
export default HousePage;
