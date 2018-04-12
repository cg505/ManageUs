import React, { Component } from "react";
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import LoginPanel from "./components/LoginPanel"
import RegisterPanel from "./components/RegisterPanel"
import App from "./App"
import Intro from "./Bottom"

class Main extends Component {
    render() {
        return (
        <BrowserRouter>
            <div>
                <h1>Manage Us</h1>
                <ul className="header">
                    <li><NavLink to="/Login">Login</NavLink></li>
                    <li><NavLink to="/Register">Register</NavLink></li>
                </ul>
                <div className="content">
                    <Route path="/Login" component={LoginPanel}/>
                    <Route path="/Register" component={RegisterPanel}/>
                    <Route path="/App" component={App}/>
                </div>
                <div className="contract" id="bottom">
                    <Route path="/" component={Intro}/>
                </div>
            </div>
        </BrowserRouter>
        )
    }
}

export default Main;
