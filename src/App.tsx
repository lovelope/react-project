import React, { Component, Suspense } from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import routes from '@/router';
import '@/App.less';

import Loading from '@/components/Loading/index';

const historyInstance = createBrowserHistory();

export default class App extends Component {
  public render(): React.ReactNode {
    return (
      <Router history={historyInstance}>
        <Suspense fallback={<Loading />}>
          <Switch>
            {routes.map(({ path, component: ComponentItem }) => (
              <Route
                exact
                key={path}
                path={path}
                render={() => <ComponentItem />}
              />
            ))}
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
