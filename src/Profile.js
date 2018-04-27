import React, {Component} from 'react';
import "./index.css";
import {Button} from 'react-bootstrap';
import authFetch from './utils/authFetch';

class Profile extends Component {
    constructor(props) {
        super(props);

        const today = new Date();
        this.date = `today is ${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        this.state = {
            household: null,
            householdKey: null
        };

        this.fetchHousehold = this.fetchHousehold.bind(this);
        this.fetchHouseholdKey = this.fetchHouseholdKey.bind(this);
        this.generateKey = this.generateKey.bind(this);
        this.leave = this.leave.bind(this);
    }

    componentDidMount() {
        this.fetchHousehold();
        this.fetchHouseholdKey();
    }

    async fetchHousehold() {
        const householdResp = await authFetch.bind(this)('/api/households');
        if(householdResp.ok)  {
            this.setState({
                household: await householdResp.json()
            });
        }

    }

    async fetchHouseholdKey() {
        const keyResp = await authFetch.bind(this)('/api/households/keys');
        if(keyResp.ok) {
            this.setState({
                householdKey: await keyResp.json()
            });
        }
    }

    async generateKey() {
        const resp = await authFetch('/api/households/generateKey', {});
        if(resp.ok) {
            this.setState({
                householdKey: await resp.json()
            });
        }
    }

    async leave() {
        const resp = await authFetch('/api/households/leave', {});
        if(resp.ok) {

        }
    }

    render() {
        let household = "not in a household";
        if(this.state.household) {
            household = this.state.household.name;
        }
        let key = "no key now";
        if(this.state.householdKey) {
            if(this.state.householdKey.key){
                key = this.state.householdKey.key;
            }
        }

        return (
            <div className="content">
                <header className="Profile-header">
                    <div className="user-name"><h1>{`Hi ${this.props.user.firstName}!`}</h1></div>
                    <div className="image">
                        <img src={"https://www.gravatar.com/avatar/" + this.props.user.emailHash} alt="logo"/>
                    </div>
                    <div className="button">
                        <Button bsSize="xsmall" onClick={() => window.open("https://en.gravatar.com/connect/", "gravatar", "noopener")}>Change image</Button>
                    </div>
                    <h1 className="time">{`${this.date}`}</h1>
                    <form className="form-inline">
                        <div className="form-group">
                            <label className="info">User Name: { `${this.props.user.firstName}  ${this.props.user.lastName}`}</label>
                        </div>
                    </form>
                    <form className="form-inline">
                        <div className="form-group">
                            <label className="info">email:</label>
                            <input className="form-control mx-sm-3" id="disabledInput" type="text"
                                   placeholder={this.props.user.email} disabled/>
                        </div>
                    </form>
                    <form className="form-inline">
                        <div className="form-group">
                            <label className="info">House Hold: </label>
                            <input className="form-control mx-sm-3" id="disabledInput" type="text"
                                   placeholder={household} disabled/>
                        </div>
                    </form>
                    <form className="form-inline">
                        <div className="form-group">
                            <label className="info">House Hold Key: </label>
                            <input className="form-control mx-sm-3" id="disabledInput" type="text"
                                   value={key}/>
                            <Button onClick={this.generateKey}>Generate Key</Button>
                            <Button onClick={this.leave}>Leave</Button>
                        </div>
                    </form>
                </header>
            </div>

        );
    }
}



export default Profile;
