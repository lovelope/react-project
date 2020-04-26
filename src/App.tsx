import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import routes from '@/router';
import '@/App.less';

import Loading from '@/components/Loading';

const historyInstance = createBrowserHistory();

export default function App(): React.ReactElement {
  return (
    <Router history={historyInstance}>
      <Suspense fallback={<Loading />}>
        <Switch>
          {routes.map(
            ({ path, component: ComponentItem }): React.ReactNode => (
              <Route
                exact
                key={path}
                path={path}
                render={(): React.ReactNode => <ComponentItem />}
              />
            )
          )}
        </Switch>
      </Suspense>
    </Router>
  );
}
