import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';

interface Props extends RouteProps {
  auth: any;
}
interface State {}

class NoAuthRouter extends React.Component<Props, State> {
  render(): React.ReactNode {
    const { auth, component, ...rest } = this.props;
    console.log(auth);

    return (
      <Route
        {...rest}
        render={props => {
          if (!auth.token) {
            return <Redirect to="/"></Redirect>;
          }

          return component;
        }}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(NoAuthRouter);
