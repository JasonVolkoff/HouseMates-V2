import React, { Component } from "react";
import axiosInstance from "../../services/axiosInstance";
import { Navigate } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post("/token/", {
                email: this.state.email,
                password: this.state.password,
            });
            axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            this.setState({ redirect: true });

            return response;
        } catch (error) {
            throw error;
        }
    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Navigate to="/profile" />;
        }
        return (
            <div>
                Login
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input
                            name="email"
                            type="text"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
