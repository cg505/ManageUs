import React, { Component } from 'react';
import './Components.css';
import HouseImage from '../img/house.png'

//TODO: Change info to static

class NamesPanel extends Component {
render() {
    return (
      <div className="flex-item" id="Chores" onClick={this.openModal}>
      	<div className="flex-item-header">
      		<img src={HouseImage} alt="logo"/>
      		<h4>"Household Name"</h4>
      	</div>
      <h3>
      	Devin S.<br/><br/>
      	Yufei X.<br/><br/>
      	Christopher C.<br/><br/>
      	Person 4<br/><br/>
      	</h3>
      </div>
      );
}
}
export default NamesPanel;

