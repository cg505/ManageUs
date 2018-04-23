import React, { Component } from 'react';
import './Components.css';
import RulesImage from '../img/rules.png'

class RulesPanel extends Component {
    render() {
        return (
            <a href="/Rules" className="flex-item" id="Rules">
                <div className = "flex-item-header">
                    <img src={RulesImage} />
                    <h4>Rules</h4>
                </div>
                <span className="badge badge-primary badge-pill">1 day ago</span>
                <h5 className="mb-1">Rules List</h5>
                <p className="mb-1">add some thing here</p>
                <small>by XXX</small>
            </a>
        );
    }
}
export default RulesPanel;
