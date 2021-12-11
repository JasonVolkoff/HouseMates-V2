import React from "react";
import { useSelector } from "react-redux";
const HomePage = () => {
    const { first_name } = useSelector((state) => state.auth);
    return <div>This is {first_name}</div>;
};
export default HomePage;
