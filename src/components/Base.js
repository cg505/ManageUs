import React, { Component } from 'react';
import Grocery from './GroceryPanel'
import Chores from './ChoresPanel'
import Note from './NotePanel'
import Rules from './RulesPanel'
import Poll from './PollPanel'
import Name from './NamesPanel'

class Base extends Component {
    render() {
        return (
            <div className="list-group" id="list-tab">
                <div className="flex-container">
                    <Name />
                    <Chores />
                    <Grocery />
                    <Note />
                    <Rules />
                    <Poll />
                </div>
            </div>
        );
    }
}

export default Base;
