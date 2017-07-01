import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import ParkingSystem from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ParkingSystem />, document.getElementById('root'));
registerServiceWorker();
