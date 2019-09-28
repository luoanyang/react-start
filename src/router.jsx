import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '@pages/home/home.jsx';
import Login from '@pages/login/login.jsx';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Switch>
  </HashRouter>
)