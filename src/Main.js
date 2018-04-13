import React, { Component } from "react";
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import authFetch from './utils/authFetch';
import AuthRoute from './AuthRoute';
import LoginPanel from "./components/LoginPanel";
import RegisterPanel from "./components/RegisterPanel";
import App from "./App";
import Intro from "./Bottom";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // do we know if we're logged in or not?
            knowLoggedIn: false,
            // are we logged in or not?
            loggedIn: false,
            user: {}
        };

        // makes authfetch work when logout isn't in props
        this.authFetch = authFetch.bind({
            props: {
                logout: () => this.setState({
                    knowLoggedIn: true,
                    loggedIn: false
                })
            }
        });
        this.getUserInfo = this.getUserInfo.bind(this);
        this.logout = this.logout.bind(this);

        // start getting user info as soon as
        // the app starts to load
        this.getUserInfo();
    }

    async getUserInfo() {
        const resp = await this.authFetch('/api/users');
        if(resp.ok) {
            const user = await resp.json();
            this.setState({
                knowLoggedIn: true,
                loggedIn: true,
                user
            });
        }
        // if we got a 401, authFetch will call logout() for us
        // ignore other errors (load forever)
    }

    async logout(e) {
        e && e.preventDefault();
        const respPromise = this.authFetch('/api/sessions/logout', false, {method: 'POST'});
        this.setState({
            knowLoggedIn: false,
            loggedIn: false,
            user: {}
        });
        // we don't actually care about the response
        await respPromise;
        // should fail and set knowLoggedIn correctly
        // and also will "log us back in" if logout failed
        this.getUserInfo();
    }

    render() {
        return (
        <BrowserRouter>
            <div>
                <h1>Manage Us</h1>
                <ul className="header">
                    {
                        this.state.knowLoggedIn && this.state.loggedIn ? (
                            <li><a href="/" onClick={this.logout}>Logout</a></li>
                        ) : (
                            <li><NavLink to="/Login">Login</NavLink></li>
                        )
                    }
                    <li><NavLink to="/Register">Register</NavLink></li>
                </ul>
                <div className="content">
                    <Route path="/Login" render={(props) => (
                        <LoginPanel
                            getUserInfo={this.getUserInfo}
                            loggedIn={this.state.knowLoggedIn && this.state.loggedIn}
                            {...props} />
                    )} />
                    <Route path="/Register" component={RegisterPanel}/>
                    <AuthRoute path="/App" component={App} {...this.state} props={{user: this.state.user}} />
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
