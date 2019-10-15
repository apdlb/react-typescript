import React, { memo } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import HomeContainer from '../pages/home/HomeContainer';
import LoginContainer from '../pages/login/LoginContainer';
import AuthRouters from './AuthRouters';
import NoAuthRouters from './NoAuthRouters';

interface Props {}

const Routers: React.FunctionComponent<Props> = () => {
  return (
    <Router>
      <Switch>
        <NoAuthRouters exact path="/login" children={<LoginContainer />} />
        <AuthRouters exact path="/home" children={<HomeContainer />} />

        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </Router>
  );
};

export default memo(Routers);
