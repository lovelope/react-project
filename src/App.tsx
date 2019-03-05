import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import routes from '@/router';
import '@/App.less';

const historyInstance = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={historyInstance}>
        <Switch>
          {routes.map(({ path, component }) => (
            <Route exact key={path} path={path} component={component} />
          ))}
        </Switch>
      </Router>
    );
  }
}
