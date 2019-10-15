import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';

import useAuth from '../../hooks/useAuth';
import PATHS from '../../utils/paths';
import Footer from '../shared/Footer';
import Header from '../shared/Header';

interface Props extends RouteProps {
  auth: any;
}

const AuthRouters: React.FunctionComponent<Props> = props => {
  const { auth, children, ...rest } = props;
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? (
          <>
            <Header />
            {children}
            <Footer />
          </>
        ) : (
          <Redirect to={PATHS.LOGIN} />
        )
      }
    />
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(memo(AuthRouters));
