import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { cleanEntities, listEntities } from '../../../redux/actions/EntityActions';
import Content from '../../shared/Content';
import EntitiesList from './EntitiesList';

interface MatchParams {}
interface Props extends RouteComponentProps<MatchParams> {
  cleanEntities: Function;
  listEntities: Function;
  entities?: any;
}
interface State {}

class EntitiesContainer extends React.Component<Props, State> {
  state = {
    loading: false
  };

  componentDidMount() {
    this.props.cleanEntities();
    this.props.listEntities();
  }

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { entities } = this.props;
    const { paginateEntities } = entities;
  };

  render(): React.ReactNode {
    const { paginateEntities } = this.props.entities;

    return (
      <>
        <Content
          body={<EntitiesList entities={paginateEntities || {}} loadingTable={this.state.loading} handleTableChange={this.handleTableChange} />}
        ></Content>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  entities: state.entities
});

export default withRouter(
  connect(
    mapStateToProps,
    { cleanEntities, listEntities }
  )(EntitiesContainer)
);
