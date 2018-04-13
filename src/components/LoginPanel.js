import React, { Component } from 'react';
import './Components.css'
import { Redirect } from 'react-router-dom'
import authFetch from '../utils/authFetch';
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            issues: null,
            redirectTo: null
        };

        this.submit = this.submit.bind(this);
    }

    async submit() {
        const resp = await authFetch('/api/sessions/login', {
            email: this.state.email,
            password: this.state.password
        });

        if(resp.ok) {
            this.setState({
                redirectTo: this.props.from || '/app'
            });
        } else {
            this.setState({
                issues: `login failed with status ${resp.status}`
            });
        }
    }

    render() {
        //Bootstrap Login Window
        return (
            <div className="Authentication">
                {
                    this.state.redirectTo &&
                    <Redirect to={this.state.redirectTo} />
                }
                <h1>Login</h1>
                {
                    this.state.issues &&
                    <p style={{color: 'red'}}>
                        {this.state.issues}
                    </p>
                }
                <form onSubmit={this.submit}>
                    <input type="text" placeholder="Username" autoFocus="" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
                    <input type="password" placeholder="Password" required="" value={this.state.password} onChange={e => this.setState({password: e.target.value}) } />
                    <br/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Login;
