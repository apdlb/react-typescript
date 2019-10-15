import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';

import PATHS from '../../utils/paths';

interface Props extends RouteProps {
  auth: any;
}
interface State {}

class AuthRouters extends React.Component<Props, State> {
  render(): React.ReactNode {
    const { auth, children, ...rest } = this.props;

    return <Route {...rest} render={() => (auth.token ? children : <Redirect to={PATHS.LOGIN} />)} />;
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(AuthRouters);
