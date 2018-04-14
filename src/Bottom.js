import React, { Component } from 'react';
import './Main.css'

class Bottom extends Component {
    render() {
        return (
		<footer className="Footer">
			<a href="https://github.com/cg505/ManageUs" className="GithubLogo"><i className="fa fa-github fa-4x" /></a>
			<br/><br/>
			<p>© 2018 Copyright: CS252 ManageUs Team</p>
		</footer>
        );
    }
}

export default Bottom;
