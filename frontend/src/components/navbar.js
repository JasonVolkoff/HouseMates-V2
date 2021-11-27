import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "./actions/logout";

export default class Navbar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="navBar">
                <nav>
                    <Link className={"nav-link"} to={"/"}>
                        Home
                    </Link>

                    <Logout />
                </nav>
            </div>
        );
    }
}
