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
            household: null
        };

        this.fetchHousehold = this.fetchHousehold.bind(this);
    }

    componentDidMount() {
        this.fetchHousehold();
    }

    async fetchHousehold() {
        const householdResp = await authFetch.bind(this)('/api/households');
        if(householdResp.ok)  {
            this.setState({
                household: await householdResp.json()
            });
        }
    }

    render() {
        let household = "not in a household";
        if(this.state.household) {
            household = this.state.household.name;
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
                </header>
            </div>

        );
    }
}



export default Profile;
