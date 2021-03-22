import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App';

const render = process.env.NODE_ENV === 'development' ? ReactDOM.render : ReactDOM.hydrate;

render(<App />, document.getElementById('app'));
