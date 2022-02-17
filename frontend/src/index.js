import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/Store';
import { Provider } from 'react-redux';

ReactDOM.render(
  /**
   * We make the store available for our components by 
   * wrapping our App with Provider.
   */
  <React.StrictMode>
    <Provider store = { store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);