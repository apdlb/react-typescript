import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Login from '../pages/login/LoginContainer';

interface Props {}

const Routers: React.FunctionComponent<Props> = props => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />

        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </Router>
  );
};

export default Routers;
