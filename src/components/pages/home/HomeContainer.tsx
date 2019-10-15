import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import Content from '../../shared/Content';

interface MatchParams {}
interface Props extends RouteComponentProps<MatchParams> {}
interface State {}

class HomeContainer extends React.Component<Props, State> {
  render(): React.ReactNode {
    return (
      <>
        <Content body={'Hola'}></Content>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(HomeContainer)
);
