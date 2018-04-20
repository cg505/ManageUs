import React, { Component } from 'react';
import './Components.css';

class ChoresPanel extends Component {
    render() {
        return (
            <a href="/Chores" className="flex-item" id="Chores">
                <span className="badge badge-primary badge-pill">1 day ago</span>
                <h5 className="mb-1">Chores List</h5>
                <p className="mb-1">add some thing here</p>
                <small>by XXX</small>
            </a>
        );
    }
}
export default ChoresPanel;
