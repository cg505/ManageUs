import React, { Component } from 'react';
import './Components.css';
import authFetch from "../utils/authFetch";

class NoteApp extends Component {
    constructor(){
        super();
        this.state = {
            notes: [],
            houseHoldInfo: null,
        };

        this.fetchNote = this.fetchNote.bind(this);
        this.createNotes = this.createNotes.bind(this);
        this.addNote = this.addNote.bind(this);
    }

    componentDidMount() {
        this.fetchNote();
    }

    async addNote(note){
        this.setState({items: [...this.state.notes, note]});
        await authFetch('/api/households/notes', {
            text: note});
        console.log(note);
        console.log(this.state.notes);
    }

    createNotes(e){
        e.preventDefault();
        const note = this.refs.noteName.value;
        if(typeof note === 'string' && note.length > 0) {
            this.addNote(note);
            this.refs.noteForm.reset();
        }
    }

    async fetchNote() {
        const resp = await authFetch('/api/households/notes');
        if(resp.ok) {
            this.setState({
                notes: await resp.json()
            });

            // if(this.state.houseHoldInfo) {
            //     let temp = this.state.houseHoldInfo.Users;
            //     this.setState({
            //         notes: temp
            //     });
            // }
        }
    }


    render() {
        return(
            <div>
            <table className="table table-hover">
                <tr>
                    <th>Author</th>
                    <th>Message</th>
                </tr>
                {
                    this.state.notes.map(function(key){
                        console.log(key)
                        return <tr>
                            <td>{key.text}</td>
                            <td>{key.creator.firstName} {key.creator.lastName}</td>
                        </tr>
                    })
                }
                </table>
                <div className="component-wrapper">
                    <form className="form-inline" ref="noteForm" onSubmit={this.createNotes}>
                        <div className="form-group">
                            <label htmlFor="Note">
                                Note Text
                                <input type="text" id="Item" placeholder="add note" ref="noteName"
                                       className="form-control"/>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default NoteApp;
