import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
class Root extends Component {
  render() {
    return (
      <div>
        <h1>Li-stable.app</h1>
        <App/>
      </div>
    );
  }
}

render(<Root />, document.getElementById('root'));
registerServiceWorker();