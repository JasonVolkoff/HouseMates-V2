import React, { Component } from "react";
import axiosInstance from "../../services/axiosInstance";
import { Navigate } from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            firstName: "",
            lastName: "",
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
            const response = await axiosInstance.post("/register/", {
                email: this.state.email,
                username: this.state.username,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                password: this.state.password,
            });
            if (response.status === 201) {
                this.handleTokens();
            } else {
                // TODO: Add error in state to display to user.
                console.log("Error creating User.");
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
    async handleTokens() {
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
                Register
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
                        Username:
                        <input
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        First Name:
                        <input
                            name="firstName"
                            type="text"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            name="lastName"
                            type="text"
                            value={this.state.lastName}
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
