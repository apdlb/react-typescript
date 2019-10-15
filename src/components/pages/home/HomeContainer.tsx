import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import Content from '../../shared/Content';
import Home from './Home';

interface MatchParams {}
interface Props extends RouteComponentProps<MatchParams> {}
interface State {}

class HomeContainer extends React.Component<Props, State> {
  render(): React.ReactNode {
    return (
      <>
        <Content body={<Home />}></Content>
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
