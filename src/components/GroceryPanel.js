import React, { Component } from 'react';
import './Components.css';
import GroceryImage from '../img/groceries.png'

class GroceryPanel extends Component {
    render() {
        return (
            <a href="/Grocery" className="flex-item" id="Grocery">
                <div className = "flex-item-header">
                    <img src={GroceryImage} alt="logo"/>
                    <h4>Grocery</h4>
                </div>
                <span className="badge badge-primary badge-pill">1 day ago</span>
                <h5 className="mb-1">Collaborated Grocery List</h5>
                <p className="mb-1">add some thing here</p>
                <small>by XXX</small>
            </a>
        );
    }
}
export default GroceryPanel;
