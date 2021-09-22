import React from 'react';
import { useSelector } from 'react-redux';

import { useRoutes } from './hooks/routes';

export function App() {
  const { isAuthenticated } = useSelector(({ auth }) => auth);

  const routes = useRoutes(isAuthenticated);
  return <div className="container">{routes}</div>;
}
