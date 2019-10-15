import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';

import PATHS from '../../utils/paths';

interface Props extends RouteProps {
  auth: any;
}

const AuthRouters: React.FunctionComponent<Props> = props => {
  const { auth, children, ...rest } = props;

  return <Route {...rest} render={() => (auth.token ? children : <Redirect to={PATHS.LOGIN} />)} />;
};

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(memo(AuthRouters));
