import React, { Component } from 'react';
import { render } from 'react-dom';
import Listings from './components/Listings';
import './css/main.scss';
class Root extends Component {
  render() {
    return (
      <div>
        <h1>Li-stable.app</h1>
        <Listings/>
      </div>
    );
  }
}

render(<Root />, document.getElementById('root'));
