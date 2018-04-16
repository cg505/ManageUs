import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import './index.css'

class Top extends Component {
    render() {
        return (
            <ul className="header">
            <img className="Logo" src="/img/logo.png" alt="logo"/>
                {
                    this.props.knowLoggedIn && this.props.loggedIn ? (
                        <li><a href="/" onClick={this.props.logout}>Logout</a></li>
                    ) : (
                        <li><NavLink to="/Login">Login</NavLink></li>
                    )
                }
                <li><NavLink to="/Register">Register</NavLink></li>
                <li><NavLink to="/App">App</NavLink></li>
            </ul>
        );
    }
}

export default Top;
