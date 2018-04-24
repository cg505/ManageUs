import React, { Component } from 'react';
import './Components.css';
import Modal from 'react-modal';
import HouseImage from '../img/house.png'

//TODO: Change info to static

class NamesPanel extends Component {
render() {
    return (
      <div className="flex-item" id="Chores" onClick={this.openModal}>
      	<div className="flex-item-header">
      		<img src={HouseImage} alt="HouseImage" />
      		<h4>"Household Name"</h4>
      	</div>
        <span className="label label-default">4 People</span>
        <h5>
      	Devin S.<br/><br/>
      	Yufei X.<br/><br/>
      	Christopher C.<br/><br/>
      	Person 4<br/><br/>
      	</h5>
      </div>
      );
}
}
export default NamesPanel;

