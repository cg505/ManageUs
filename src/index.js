import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
registerServiceWorker();
