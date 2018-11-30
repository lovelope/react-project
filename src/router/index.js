import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ '@/pages/Home'),
  loading: Loading,
});

const About = Loadable({
  loader: () => import(/* webpackChunkName: "About" */ '@/pages/About'),
  loading: Loading,
});

const Edit = Loadable({
  loader: () => import(/* webpackChunkName: "Edit" */ '@/pages/Edit'),
  loading: Loading,
});

const GoodsList = Loadable({
  loader: () => import(/* webpackChunkName: "List" */ '@/pages/List/goodsList'),
  loading: Loading,
});

const Demo = Loadable({
  loader: () => import(/* webpackChunkName: "Demo" */ '@/pages/Demo'),
  loading: Loading,
});
const Count = Loadable({
  loader: () => import(/* webpackChunkName: "Demo" */ '@/pages/count'),
  loading: Loading,
});

export default [
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
    path: '/count',
    name: 'Count',
    component: Count,
  },
];
