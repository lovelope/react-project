import { lazy } from 'react';

interface RouteItem {
  path: string;
  name: string;
  component: React.ComponentType;
}

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '@/pages/Home'));

const About = lazy(() =>
  import(/* webpackChunkName: "About" */ '@/pages/About')
);

const Edit = lazy(() => import(/* webpackChunkName: "Edit" */ '@/pages/Edit'));

const GoodsList = lazy(() =>
  import(/* webpackChunkName: "List" */ '@/pages/List/goodsList')
);

const Demo = lazy(() => import(/* webpackChunkName: "Demo" */ '@/pages/Demo'));

const Hooks = lazy(() =>
  import(/* webpackChunkName: "Hooks" */ '@/pages/Hooks')
);

const Counter = lazy(() =>
  import(/* webpackChunkName: "Counter" */ '@/pages/Hooks/count')
);

const routes: RouteItem[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
  },
  {
    path: '/list',
    name: 'List',
    component: GoodsList,
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo,
  },
  {
    path: '/hooks',
    name: 'Hooks',
    component: Hooks,
  },
  {
    path: '/counter',
    name: 'Counter',
    component: Counter,
  },
];

export default routes;
