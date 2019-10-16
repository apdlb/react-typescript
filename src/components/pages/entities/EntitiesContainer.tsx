import _ from 'lodash';
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
    data: [],
    pagination: {},
    loading: false
  };

  componentDidMount() {
    this.fetch();
    this.props.cleanEntities();
    this.props.listEntities();
  }

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const pager = { ...this.state.pagination } as any;
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...filters
    };
    if (!_.isEmpty(sorter)) {
      params.sort = sorter.field;
      params.order = sorter.order;
    }
    this.fetch(params);
    this.props.listEntities(params);
  };

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    const data = require('./data.json');
    const pagination = { ...this.state.pagination } as any;
    // Read total count from server
    pagination.total = data.results.lenght;
    this.setState({
      loading: false,
      data: data.results,
      pagination
    });
  };

  render(): React.ReactNode {
    const { paginateEntities } = this.props.entities;

    return (
      <>
        <Content
          body={
            <EntitiesList
              entities={{ data: this.state.data, pagination: this.state.pagination }}
              loadingTable={this.state.loading}
              handleTableChange={this.handleTableChange}
            />
          }
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
