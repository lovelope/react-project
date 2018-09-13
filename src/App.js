import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import routes from '@/router';
import '@/App.less';

const his = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={his}>
        <Switch>
          {routes.map(({ path, component }) => (
            <Route exact key={path} path={path} component={component} />
          ))}
        </Switch>
      </Router>
    );
  }
}
