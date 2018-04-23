import React, { Component } from 'react';
import './Components.css';
import NoteImage from '../img/note.png'

class NotePanel extends Component {
    render() {
        return (
            <a href="/Notes" className="flex-item" id="Note">
                <div className = "flex-item-header">
                    <img src={NoteImage} />
                    <h4>Note</h4>
                </div>
                <span className="badge badge-primary badge-pill">1 day ago</span>
                <h5 className="mb-1">Timed Sticky Notes</h5>
                <p className="mb-1">add some thing here</p>
                <small>by XXX</small>
            </a>
        );
    }
}
export default NotePanel;
