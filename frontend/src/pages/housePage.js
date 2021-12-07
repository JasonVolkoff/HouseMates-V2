import React from "react";

const HousePage = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    return <div>This is My House Page</div>;
};
export default HousePage;
