import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage, CreatePage, DetailPage, LinksPage } from '../pages';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <>
        <Switch>
          <Route exact path="/create" component={CreatePage} />
          <Route path="/detail/:id" component={DetailPage} />
          <Route exact path="/links" component={LinksPage} />
          <Redirect to="/create" />
        </Switch>
      </>
    );
  }

  return (
    <Switch>
      <Route exact path="/login" component={AuthPage} />
      <Redirect to="/login" />
    </Switch>
  );
};
