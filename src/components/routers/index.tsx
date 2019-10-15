import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Login from '../pages/login/LoginContainer';
import AuthRouters from './AuthRouters';
import NoAuthRouters from './NoAuthRouters';

interface Props {}

const Routers: React.FunctionComponent<Props> = () => {
  return (
    <Router>
      <Switch>
        <NoAuthRouters exact path="/login" children={<Login />} />
        <AuthRouters exact path="/home" children={<Login />} />

        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </Router>
  );
};

export default Routers;
