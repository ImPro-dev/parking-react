import React, { Component } from 'react';
import Parking from './components/Parking'

import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h2>Parking</h2>
          <Parking />
      </div>
    );
  }
}

export default App;
