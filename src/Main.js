import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import LoginPanel from "./components/LoginPanel"
import RegisterPanel from "./components/RegisterPanel"
import App from "./App"
import Bottom from "./Bottom"
import Top from "./Top"

class Main extends Component {
    render() {
        return (
        <BrowserRouter>
            <div>
                <h1>Manage Us</h1>
                <div className="header">
                    <Route path="/" component={Top}/>
                </div>
                <div className="content">
                    <Route path="/Login" component={LoginPanel}/>
                    <Route path="/Register" component={RegisterPanel}/>
                    <Route path="/App" component={App}/>
                </div>
                <div className="contact">
                    <Route path="/" component={Bottom}/>
                </div>
            </div>
        </BrowserRouter>
        )
    }
}

export default Main;
