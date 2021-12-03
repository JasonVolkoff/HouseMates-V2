import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Alert from "./Alert";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <Fragment>
            <a className="navbar__top__auth__link" onClick={logout} href="/">
                Logout
            </a>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <Link className="navbar__top__auth__link" to="/login">
                Login
            </Link>
            <Link className="navbar__top__auth__link" to="/signup">
                Sign Up
            </Link>
        </Fragment>
    );

    return (
        <div>
            <nav className="navbar">
                <div className="navbar__top">
                    <div className="navbar__top__auth">
                        {!loading && (
                            <Fragment>
                                {isAuthenticated ? authLinks : guestLinks}
                            </Fragment>
                        )}
                    </div>
                </div>
                <div className="navbar__bottom">
                    <li className="navbar__bottom__item">
                        <NavLink className="navbar__bottom__item__link" to="/">
                            Home Page
                        </NavLink>
                    </li>
                    <li className="navbar__bottom__item">
                        <NavLink
                            className="navbar__bottom__item__link"
                            to="/my-house"
                        >
                            My House
                        </NavLink>
                    </li>
                </div>
            </nav>
            <Alert />
        </div>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
