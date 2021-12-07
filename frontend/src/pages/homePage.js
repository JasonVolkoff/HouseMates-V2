import React from "react";
import { useSelector } from "react-redux";
const HomePage = () => {
    const { name } = useSelector((state) => state.auth);
    return <div>This is {name}</div>;
};
export default HomePage;
