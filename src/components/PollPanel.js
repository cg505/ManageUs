import React, { Component } from 'react';
import './Components.css';
import PollImage from '../img/poll.png'

class PollPanel extends Component {
    render() {
        return (
            <a href="/Polls" className="flex-item" id="Polls">
                <div className = "flex-item-header">
                    <img src={PollImage} alt="PollImage" />
                    <h4>Poll</h4>
                </div>
                <span className="label label-warning">2 Current Polls</span>
                <h5 className="mb-1">Polls</h5>
                <p className="mb-1">add some thing here</p>
                <small>by XXX</small>
            </a>
        );
    }
}
export default PollPanel;
