import React, { Component } from 'react';
import './Components.css';
import Modal from 'react-modal';
import PollImage from '../img/poll.png';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    height                : '400px',
    width                 : '800px',
    transform             : 'translate(-50%, -50%)'
}
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class PollPanel extends Component {
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
            <img src={PollImage} alt="PollImage" /><h1>Polls</h1>
            <table className="table table-hover">
            <tr>
                <th>Item</th>
            </tr>
            <tr>
                <td>Milk</td>
            </tr>
            <tr>
                <td>Eggs</td>
            </tr>
            </table>
        </Modal>
        <div className="flex-item" id="Polls" onClick={this.openModal}>
        <div className = "flex-item-header">
        <img src={PollImage} alt="PollImage" />
        <h4>Poll</h4>
        </div>
        <span className="label label-warning">2 Current Polls</span>
        <h5 className="mb-1">Polls</h5>
        <p className="mb-1">add some thing here</p>
        <small>by XXX</small>
        </div>
        </div>
    );
}
}
export default PollPanel;
