import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Login from '../pages/login/LoginContainer';
import NoAuthRouter from './NoAuthRouters';

interface Props {}

const Routers: React.FunctionComponent<Props> = props => {
  return (
    <Router>
      <Switch>
        <NoAuthRouter exact path="/login" component={Login} />
        <NoAuthRouter exact path="/login/:id" component={Login} />

        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </Router>
  );
};

export default Routers;
