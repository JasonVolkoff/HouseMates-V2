import React, { Fragment } from "react";
import Navbar from "../components/Navbar";

const Layout = (props) => {
    return (
        <Fragment>
            <div>
                <Navbar />
                {props.children}
            </div>
        </Fragment>
    );
};
export default Layout;
