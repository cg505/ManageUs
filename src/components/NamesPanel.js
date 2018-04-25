import React, { Component } from 'react';
import './Components.css';
import Modal from 'react-modal';
import HouseImage from '../img/house.png'

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


//TODO: Change info to pull from database
class NamesPanel extends Component {

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
            <h1><img src={HouseImage} alt="HouseImage" /> Our House</h1>
            <table className="table table-hover">
            <tr>
                <th>Name</th>
            </tr>
            <tr>
                <td>Devin Sova</td>
            </tr>
            <tr>
                <td>Christopher Cooper</td>
            </tr>
            <tr>
                <td>Yufei Xu</td>
            </tr>
            <tr>
                <td>Person 4</td>
            </tr>
            </table>
        </Modal>
        <div className="flex-item" id="Chores" onClick={this.openModal}>
      	<div className="flex-item-header">
      	<img src={HouseImage} alt="HouseImage" />
      	<h4>Our House</h4>
      	</div>
        <span className="label label-default">4 People</span>
        <h5>
      	Devin S.<br/><br/>
        Christopher C.<br/><br/>
      	Yufei X.<br/><br/>
      	Person 4<br/><br/>
      	</h5>
      </div>
      </div>
      );
}
}
export default NamesPanel;

