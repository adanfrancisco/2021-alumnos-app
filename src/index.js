import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import {Provider} from 'react-redux'
import { store } from './redux/store';
import {Routes} from './routers/Routes';

ReactDOM.render(
  <Provider store = {store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);


