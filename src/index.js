import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify'
import config from './aws-config'

Amplify.configure(config)

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
