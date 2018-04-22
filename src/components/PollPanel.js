import React, { Component } from 'react';
import './Components.css';

class PollPanel extends Component {
    render() {
        return (
            <a href="/Polls" className="flex-item" id="Polls">
                <div className = "flex-item-header">
                    <h4>Poll</h4>
                </div>
                <span className="badge badge-primary badge-pill">1 day ago</span>
                <h5 className="mb-1">Polls</h5>
                <p className="mb-1">add some thing here</p>
                <small>by XXX</small>
            </a>
        );
    }
}
export default PollPanel;
