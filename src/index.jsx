import React from 'react';
import ReactDOM from 'react-dom';
import HelloMessage  from '@pages/app.jsx';
import './index.css';


ReactDOM.render(
  <HelloMessage name="React hello" />,
  document.getElementById('app')
);