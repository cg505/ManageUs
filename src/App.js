import React, { Component } from 'react';
// import { Link } from 'react-router';
import './App.css';

class App extends Component {
    constructor() {
        super();
        var md5 = require('md5');

        this.state = {
            md5: md5
        };
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={'https://www.gravatar.com/avatar/' + this.state.md5(this.props.user.email)} className="App-logo" alt="logo" />
          <h1 className="App-title">{`Hi ${this.props.user.firstName}! Welcome to ManageUs.`}</h1>
        </header>
      </div>
    );
  }
}

export default App;
