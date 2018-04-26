import React, { Component } from "react";
import {
    Route,
    BrowserRouter,
    Redirect
} from "react-router-dom";
import md5 from 'md5';
import authFetch from './utils/authFetch';
import AuthRoute from './AuthRoute';
import LoginPanel from "./components/LoginPanel";
import RegisterPanel from "./components/RegisterPanel";
import MainBase from "./components/Base";

import App from "./App";
import Bottom from "./Bottom";
import Top from "./Top";
import Profile from "./Profile";

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
            user.emailHash = md5(user.email);
            user.Householdname = this.state.name;
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
                    <div className="header">
                        <Top knowLoggedIn={this.state.knowLoggedIn} loggedIn={this.state.loggedIn} logout={this.logout} />
                    </div>
                    <div className="content" data-spy="scroll">
                        <Route exact path="/Login" render={(props) => (
                            <LoginPanel
                                getUserInfo={this.getUserInfo}
                                            loggedIn={this.state.knowLoggedIn && this.state.loggedIn}
                                            {...props} />
                        )} />
                        <Route exact path="/Register" component={RegisterPanel}/>
                        <AuthRoute exact path="/Profile" component={Profile} {...this.state} props={{user: this.state.user}} />
                        <Route exact path="/Main" component={MainBase} />

                        <AuthRoute exact path="/App" component={App} {...this.state} props={{user: this.state.user, logout: this.logout}} />
                        <Route exact path="/" render={() => (
                            <Redirect to="/App" />
                        )} />
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
