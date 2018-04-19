import React, { Component } from 'react';
import './Components.css'
import { Redirect } from 'react-router-dom'
import authFetch from '../utils/authFetch';

class LoginPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            issues: null
        };

        this.submit = this.submit.bind(this);
    }

    async submit(e) {
        e.preventDefault();

        const resp = await authFetch.bind(this)('/api/sessions/login', {
            email: this.state.email,
            password: this.state.password
        });

        if(resp.ok) {
            this.props.getUserInfo();
        } else {
            this.setState({
                issues: `login failed with status ${resp.status}`
            });
        }
    }

    render() {
        if(this.props.loggedIn) {
            const redirectTo = (this.props.location &&
                                this.props.location.state &&
                                this.props.location.state.from) || '/';
            return (
                <Redirect push to={redirectTo} />
            );
        }
        //Bootstrap Login Window
        return (
            <div className="Authentication">
                <h1>Login</h1>
                {
                    this.state.issues &&
                    <p style={{color: 'red'}}>
                        {this.state.issues}
                    </p>
                }
                <form onSubmit={this.submit}>
                    <input type="text" placeholder="Email" autoFocus="" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
                    <input type="password" placeholder="Password" required="" value={this.state.password} onChange={e => this.setState({password: e.target.value}) } />
                    <br/>
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default LoginPanel;
