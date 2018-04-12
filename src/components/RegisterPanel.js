import React, { Component } from 'react';
import './Components.css'
import {
    NavLink
} from "react-router-dom"
class Register extends Component {
    render() {
        //Bootstrap Login Window
        return (
            <div className="Authentication">
                <h1>Register</h1>
                <input type="text" placeholder="First Name" required="" autoFocus=""/>
                <input type="text" placeholder="Last Name" required=""/>
                <input type="text" placeholder="Username" required=""/>
                <input type="password" placeholder="Password" required=""/>
                <input type="password" placeholder="Confirm Password" required=""/>
                <br/>
                <NavLink to="/Login"><input type="submit" /></NavLink>
            </div>
        )
    }
}

export default Register;
