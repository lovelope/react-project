import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import routes from '@/router';
import '@/App.less';
import subject from './models';
/* eslint-disable react/no-deprecated */
const historyInstance = createBrowserHistory();

export default class App extends Component {
  componentDidMount() {
    subject.subscribe(appState => {
      console.info(appState);
      this.setState({ ...appState });
    });
  }

  render() {
    const that = this;
    console.info(this.state, 'sssssssssss');
    return (
      <Router history={historyInstance}>
        <Switch>
          {routes.map(({ path, component: Comp }) => {
            const Com = React.cloneElement(<Comp />, { ...that.state });
            return (
              <Route
                exact
                key={path}
                path={path}
                render={() => <div>{Com}</div>}
              />
            );
          })}
        </Switch>
      </Router>
    );
  }
}
