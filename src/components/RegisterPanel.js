import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Components.css'
import authFetch from '../utils/authFetch';

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConf: '',
            errors: null,
            redirect: false
        }

        this.submit = this.submit.bind(this);
    }

    async submit(e) {
        e.preventDefault();
        if(this.state.password !== this.state.passwordConf) {
            this.setState({
                errors: 'Passwords do not match'
            });
            return;
        }

        const resp = await authFetch('/api/users', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        });

        if(resp.ok) {
            this.setState({
                redirect: '/Login'
            });
        } else {
            if(resp.status === 500) {
                this.setState({
                    errors: 'hmmm, looks like we messed up. sorry :('
                })
            } else {
                this.setState({
                    errors: 'I think you messed something up'
                })
            }
        }
    }

    render() {
        if(this.state.redirect) {
            return (
                <Redirect to={this.state.redirect} />
            );
        }
        // HOF
        const updateField = (name) => (event) => this.setState({
            [name]: event.target.value
        });
        //Bootstrap Login Window
        return (
            <div className="Authentication">
                <h1>Register</h1>
                {
                    this.state.errors &&
                    <p style={{color: 'red'}}>
                        {this.state.errors}
                    </p>
                }
                <form onSubmit={this.submit}>
                    <input type="text" placeholder="First Name" onChange={updateField('firstName')} />
                    <input type="text" placeholder="Last Name" onChange={updateField('lastName')} />
                    <input type="text" placeholder="Email" onChange={updateField('email')} />
                    <input type="password" placeholder="Password" onChange={updateField('password')} />
                    <input type="password" placeholder="Confirm Password" onChange={updateField('passwordConf')} />
                    <br/>
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default Register;
