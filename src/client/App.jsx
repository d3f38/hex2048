import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../pages/main';

import './App.scss';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/(:params)?" exact component={Main} />
    </Switch>
  </BrowserRouter>
);

export default App;
