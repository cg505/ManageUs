import React, { Component } from 'react';
import './Components.css';
import Modal from 'react-modal';
import ChoresImage from '../img/chores.png'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
}
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class ChoresPanel extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
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
}

render() {
    return (
      <div>
      <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
      </Modal>

      <div className="flex-item" id="Chores" onClick={this.openModal}>
      <div className="flex-item-header">
      <img src={ChoresImage} />
      <h4>Chores</h4>
      </div>
      <span className="badge badge-primary badge-pill">1 day ago</span>
      <h5 className="mb-1">Chores List</h5>
      <p className="mb-1">add some thing here</p>
      <small>by XXX</small>
      </div>
      </div>
      );
}
}
export default ChoresPanel;
