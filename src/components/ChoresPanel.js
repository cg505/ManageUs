import React, { Component } from 'react';
import './Components.css';
import Modal from 'react-modal';
import ChoresImage from '../img/chores.png';
import ChoresApps from './ChoresApps';
import authFetch from '../utils/authFetch';

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

class ChoresPanel extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      items: []
  };

  this.openModal = this.openModal.bind(this);
  this.afterOpenModal = this.afterOpenModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.getItems = this.getItems.bind(this);
}

async getItems() {
        const resp = await authFetch('/api/households/chores');
        if(resp.ok) {
            const items = await resp.json();
            this.setState({items});
        }
    }

componentDidMount() {
    this.getItems();
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
    this.getItems();
}

//TODO: Create Function to populate table of Chores.
//TODO: Create Function to add Chore to Household
//When Done checkmark is clicked. Call backend (delete that chore) and refresh table

render() {
    console.log(this.state.items)
    return (
      <div>
      <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
        <h1><img src={ChoresImage} alt="ChoresImage" /> Chores</h1>
        <ChoresApps />
      </Modal>

      <div className="flex-item" id="Chores" onClick={this.openModal}>
      <div className="flex-item-header">

      <img src={ChoresImage} alt="ChoresImage" />
      <h4>Chores</h4>
      </div>
      <span className="label label-danger">{this.state.items.length} Items</span>
      <h5 className="mb-1">Chores List</h5>
      </div>
      </div>
      );
}
}
export default ChoresPanel;
