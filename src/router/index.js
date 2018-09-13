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
  loader: () => import(/* webpackChunkName: "About" */ '@/pages/Edit'),
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
];
