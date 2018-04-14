import React, { Component } from 'react';
import './index.css'

class Bottom extends Component {
    render() {
        return (
		<footer class="Footer">
			<a href="https://github.com/cg505/ManageUs" className="GithubLogo"><i class="fa fa-github fa-4x" /></a>
			<br/><br/>
			<p>© 2018 Copyright: CS252 ManageUs Team</p>
		</footer>
        );
    }
}

export default Bottom;
