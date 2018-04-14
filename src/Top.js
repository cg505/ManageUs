import React, { Component } from "react";
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import LoginPanel from "./components/LoginPanel"
import RegisterPanel from "./components/RegisterPanel"
import App from "./App"
import Bottom from "./Bottom"
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
