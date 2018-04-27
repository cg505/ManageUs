import React, { Component } from 'react';
import './Components.css';
import Modal from 'react-modal';
import NoteImage from '../img/note.png';
import NoteApp from './NoteApp';
import authFetch from "../utils/authFetch";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    height                : 'auto',
    width                 : 'auto',
    maxWidth              : '800px',
    transform             : 'translate(-50%, -50%)'
}
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class NotePanel extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      notes: [],
  };

  this.openModal = this.openModal.bind(this);
  this.afterOpenModal = this.afterOpenModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
}

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
        this.fetchNote();
    }

    componentDidMount() {
        this.fetchNote();
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
        return (
            <div>
            <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                <h1><img src={NoteImage} alt="NoteImage" /> Notes</h1>
                <NoteApp />
            </Modal>
            <div className="flex-item" id="Note" onClick={this.openModal}>
            <div className = "flex-item-header">
            <img src={NoteImage} alt="NoteImage"/>
            <h4>Note</h4>
            </div>
            <span className="label label-success">{this.state.notes.length} Notes</span>
            <h5 className="mb-1">Timed Sticky Notes</h5>
            <p className="mb-1">add some thing here</p>
            <small>by XXX</small>
            </div>
            </div>
        );
    }
}
export default NotePanel;
