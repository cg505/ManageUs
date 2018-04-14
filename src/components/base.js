import React, { Component } from 'react';

class base extends Component {
    render() {
        return (
            <div className="list-group" id="list-tab">
                <div className="container">
                    <div className="row">
                        <a href="/Grocery"
                           className="list-group-item list-group-item-action flex-column align-items-start active" id="Grocery">
                            <span className="badge badge-primary badge-pill">1 day ago</span>
                            <h5 className="mb-1">Collaborated Grocery List</h5>
                            <p className="mb-1">add some thing here</p>
                            <small>by XXX</small>
                        </a>
                        <a href="/Chores"
                           className="list-group-item list-group-item-action flex-column align-items-start" id="Chores">
                            <span className="badge badge-primary badge-pill">1 day ago</span>
                            <h5 className="mb-1">Chores List</h5>
                            <p className="mb-1">add some thing here</p>
                            <small>by XXX</small>
                        </a>
                        <a href="/Notes"
                           className="list-group-item list-group-item-action flex-column align-items-start" id="Notes">
                            <span className="badge badge-primary badge-pill">1 day ago</span>
                            <h5 className="mb-1">Timed Sticky Notes</h5>
                            <p className="mb-1">add some thing here</p>
                            <small>by XXX</small>
                        </a>
                        <a href="/Rules"
                           className="list-group-item list-group-item-action flex-column align-items-start" id="Rules">
                            <span className="badge badge-primary badge-pill">1 day ago</span>
                            <h5 className="mb-1">Rules List</h5>
                            <p className="mb-1">add some thing here</p>
                            <small>by XXX</small>
                        </a>
                        <a href="/Polls"
                           className="list-group-item list-group-item-action flex-column align-items-start" id="Polls">
                            <span className="badge badge-primary badge-pill">1 day ago</span>
                            <h5 className="mb-1">Polls</h5>
                            <p className="mb-1">add some thing here</p>
                            <small>by XXX</small>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default base;