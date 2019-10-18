import React, { memo } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import PATHS from '../../utils/paths';
import EntitiesContainer from '../pages/entities/EntitiesContainer';
import EntityContainer from '../pages/entities/entity/EntityContainer';
import HomeContainer from '../pages/home/HomeContainer';
import LoginContainer from '../pages/login/LoginContainer';
import AuthRouters from './AuthRouters';
import NoAuthRouters from './NoAuthRouters';

interface Props {}

const Routers: React.FunctionComponent<Props> = () => {
  return (
    <Router>
      <Switch>
        <NoAuthRouters exact path={PATHS.LOGIN} children={<LoginContainer />} />
        <AuthRouters exact path={PATHS.HOME} children={<HomeContainer />} />
        <AuthRouters exact path={PATHS.ENTITIES} children={<EntitiesContainer />} />
        <AuthRouters exact path={PATHS.ENTITIES_NEW} children={<EntityContainer />} />
        <AuthRouters path={PATHS.ENTITIES_ID} children={<EntityContainer />} />

        <Route path="/" render={() => <Redirect to={PATHS.LOGIN} />} />
      </Switch>
    </Router>
  );
};

export default memo(Routers);
