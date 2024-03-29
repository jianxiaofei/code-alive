import React from 'react';
import { useRoutes } from 'react-router-dom';
import NoMatch from '../pages/Exception/404';
import Home from '../pages/Home';
import About from '../pages/About';
import Table from '../pages/Example/Table';
import TodoList from '../pages/Example/TodoLlist';
import Cart from '../pages/Example/Cart';
import BasicRequest from '../pages/Example/BasicRequest';
import Tabs from '../pages/Example/Tabs';
import WebGame from '../pages/Example/WebGame';
import Hurdle from '../pages/Example/WebGame/Hurdle';
import GarbageClassification from '../pages/Example/WebGame/GarbageClassification';

export default function AppRoute() {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: 'home', element: <Home /> },
    { path: 'about', element: <About /> },
    { path: 'tabs', element: <Tabs /> },
    { path: 'table', element: <Table /> },
    { path: 'todo-list', element: <TodoList /> },
    { path: 'cart', element: <Cart /> },
    { path: 'basic-request', element: <BasicRequest /> },
    { path: 'web-game', element: <WebGame />, children: [
      { path: 'hurdle', element: <Hurdle /> },
      { path: 'garbageClassification', element: <GarbageClassification /> },
    ] },
    { path: '*', element: <NoMatch /> },
  ]);
}
