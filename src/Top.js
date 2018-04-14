import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import './index.css'

class Top extends Component {
    render() {
        return (
        <ul className="header">
        	<li><NavLink to="/Login">Login</NavLink></li>
            <li><NavLink to="/Register">Register</NavLink></li>
        </ul>
        );
    }
}

export default Top;
