import React, { Component } from 'react';

class GroceryPanel extends Component {
    render() {
        return (
            <a href="/Grocery" className="flex-item list-group-item" id="Grocery">
                <span className="badge badge-primary badge-pill">1 day ago</span>
                <h5 className="mb-1">Collaborated Grocery List</h5>
                <p className="mb-1">add some thing here</p>
                <small>by XXX</small>
            </a>
        );
    }
}
export default GroceryPanel;
