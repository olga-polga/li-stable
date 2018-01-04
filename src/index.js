import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';
import Listable from './App';

import registerServiceWorker from './registerServiceWorker';
class Root extends Component {
  render() {
    return (
      <div>
        <h1>Li-stable.app</h1>
        <Listable/>
      </div>
    );
  }
}

render(<Root />, document.getElementById('root'));
registerServiceWorker();