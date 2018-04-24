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
                    <div className="user-name"><h1>{`Hi ${this.props.user.firstName}!`}</h1></div>
                    <div className="image">
                        <img src={"https://www.gravatar.com/avatar/" + this.state.md5(this.props.user.email)} alt="logo"/>
                    </div>
                    <div className="button">
                        <Button bsSize="xsmall" onClick={() => window.open("https://en.gravatar.com/connect/","_blank")}>Change image</Button>
                    </div>
                    <h1 className="time">{`${this.state.date}`}</h1>
                    <form className="form-inline">
                        <div className="form-group">
                            <label className="info">User Name: { `${this.props.user.firstName}  ${this.props.user.lastName}`}</label>
                        </div>
                    </form>
                    <form className="form-inline">
                        <div className="form-group">
                            <label className="info">email:</label>
                            <input className="form-control mx-sm-3" id="disabledInput" type="text"
                                   placeholder= {`${this.props.user.email}`} disabled/>
                        </div>
                    </form>
                    <form className="form-inline">
                        <div className="form-group">
                            <label className="info">House Hold: </label>
                            <input className="form-control mx-sm-3" id="disabledInput" type="text"
                                   placeholder= "place house hold here" disabled/>
                        </div>
                    </form>
                </header>
            </div>

        );
    }
}



export default Profile;