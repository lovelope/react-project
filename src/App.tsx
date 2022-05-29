import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import routes from '@/router';
import '@/App.less';

import Loading from '@/components/Loading';

export default function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map(
            ({ path, component: ComponentItem }): React.ReactNode => (
              <Route key={path} path={path} element={<ComponentItem />} />
            )
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
