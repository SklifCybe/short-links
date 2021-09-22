import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from './components';

import { useRoutes } from './hooks/routes';

export function App() {
  const { isAuthenticated } = useSelector(({ auth }) => auth);

  const routes = useRoutes(isAuthenticated);
  return (
    <>
      {isAuthenticated && <Navbar />}
      <div className="container">{routes}</div>
    </>
  );
}
