import React from 'react';

import { useRoutes } from './hooks/routes';
import { useAuth } from './hooks/auth';

export function App() {
  // const { login, logout, token, userId } = useAuth();
  const isAuthenticated = false;

  const routes = useRoutes(isAuthenticated);

  return <div className="container">{routes}</div>;
}
