import React, {Component} from 'react';
import "./index.css";
import {Button} from 'react-bootstrap';
class Profile extends Component {
    constructor() {
        super();

        const today = new Date(),
            date = `today is ${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        var md5 = require('md5');

        this.state = {
            date: date,
            md5: md5,
        };
    }

    render() {
        return (
            <div className="content">
                <header className="Profile-header">
                    <div className="image">
                        <img src={"https://www.gravatar.com/avatar/" + this.state.md5(this.props.user.email)} alt="logo"/>
                    </div>
                    <div className="button">
                        <Button bsSize="xsmall" onClick={() => window.open("https://en.gravatar.com/connect/", "gravatar", "noopener")}>Change image</Button>
                    </div>
                    <h1 className="user-name">{`Hi ${this.props.user.firstName}!`}</h1>
                    <h1 className="time">{`${this.state.date}`}</h1>
                    <h1 className="info">email: {`${this.props.user.email}`}</h1>
                </header>
            </div>

        );
    }
}



export default Profile;
