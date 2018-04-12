import React, { Component } from 'react';
import './Components.css'
import {
    NavLink
} from "react-router-dom"
class Login extends Component {
    render() {
        //Bootstrap Login Window
        return (
            <div className="Authentication">
                <h1>Login</h1>
                <input type="text" placeholder="Username" required="" autoFocus="" />
                <input type="password" placeholder="Password" required=""/>
                <br/>
                <NavLink to="/APP"><input type="submit"/></NavLink>
            </div>
        )
    }


    handleLoginClick() {
        console.log("Hello World!")
    }
}

export default Login;
