import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from '../components/MyComponent';
import './application';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MyComponent />,
    document.body.appendChild(document.createElement('div'))
  );
});
