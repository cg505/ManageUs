import React, { Component } from 'react';
// import { Link } from 'react-router';
import './App.css';
import Base from './components/base.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={'https://www.gravatar.com/avatar/' + this.props.user.emailHash} className="App-logo" alt="logo" />
          <h1 className="App-title">{`Hi ${this.props.user.firstName}! Welcome to ManageUs.`}</h1>
        </header>
        <Base />
      </div>
    );
  }
}

export default App;
