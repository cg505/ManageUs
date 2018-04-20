import React, { Component } from 'react';
import Grocery from './GroceryPanel'

class Base extends Component {
    render() {
        return (
            <div className="list-group" id="list-tab">
                <div className="flex-container">
                        <Grocery />
                        <a href="/Chores"
                           className="flex-item list-group-item list-group-item-action flex-column align-items-start" id="Chores">
                            <span className="badge badge-primary badge-pill">1 day ago</span>
                            <h5 className="mb-1">Chores List</h5>
                            <p className="mb-1">add some thing here</p>
                            <small>by XXX</small>
                        </a>
                        <a href="/Notes"
                           className="flex-item list-group-item list-group-item-action flex-column align-items-start" id="Notes">
                            <span className="badge badge-primary badge-pill">1 day ago</span>
                            <h5 className="mb-1">Timed Sticky Notes</h5>
                            <p className="mb-1">add some thing here</p>
                            <small>by XXX</small>
                        </a>
                        <a href="/Rules"
                           className="flex-item list-group-item list-group-item-action flex-column align-items-start" id="Rules">
                            <span className="badge badge-primary badge-pill">1 day ago</span>
                            <h5 className="mb-1">Rules List</h5>
                            <p className="mb-1">add some thing here</p>
                            <small>by XXX</small>
                        </a>
                        <a href="/Polls"
                           className="flex-item list-group-item list-group-item-action flex-column align-items-start" id="Polls">
                            <span className="badge badge-primary badge-pill">1 day ago</span>
                            <h5 className="mb-1">Polls</h5>
                            <p className="mb-1">add some thing here</p>
                            <small>by XXX</small>
                        </a>
                </div>
            </div>
        );
    }
}

export default Base;
