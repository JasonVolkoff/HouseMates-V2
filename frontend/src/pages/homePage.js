import React, { Component } from "react";
import Login from "../components/forms/login";
import Register from "../components/forms/register";
export default class HomePage extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                This is my homepage
                <Login />
                <Register />
            </div>
        );
    }
}
