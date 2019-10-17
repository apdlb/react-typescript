import './Entities.less';

import { Divider, Form } from 'antd';
import { PaginationConfig } from 'antd/lib/table';
import _ from 'lodash';
import React from 'react';
import { Translate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { cleanEntities, listEntities } from '../../../redux/actions/EntityActions';
import Content from '../../shared/Content';
import EntitiesFilterForm from './EntitiesFilterForm';
import EntitiesList from './EntitiesList';

interface MatchParams {}
interface Props extends RouteComponentProps<MatchParams> {
  form: any;
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

  handleOnSubmitFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = this.props.form.getFieldsValue();
    this.props.listEntities(params);
  };

  handleTableChange = (pagination: PaginationConfig, filters: any, sorter: any) => {
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...filters
    };
    if (!_.isEmpty(sorter)) {
      params.sort = sorter.field;
      params.order = sorter.order;
    }
    this.props.listEntities(params);
  };

  render(): React.ReactNode {
    const { form, entities } = this.props;
    const {
      paginateEntities: { docs, page, limit, totalDocs }
    } = entities;
    const pagination = {
      current: page,
      pageSize: limit,
      total: totalDocs
    };
    return (
      <Translate>
        {({ translate }) => {
          return (
            <>
              <Content
                body={
                  <>
                    <Divider orientation="left">{translate('nav.entities')}</Divider>
                    <EntitiesFilterForm form={form} onSubmit={this.handleOnSubmitFilter} />
                    <EntitiesList
                      propsTable={{
                        data: docs,
                        pagination,
                        loading: this.state.loading,
                        handleChange: this.handleTableChange
                      }}
                    />
                  </>
                }
              ></Content>
            </>
          );
        }}
      </Translate>
    );
  }
}

const WrappedEntitiesContainer = Form.create<Props>({ name: 'entitiesFilter' })(EntitiesContainer);

const mapStateToProps = (state: any) => ({
  entities: state.entities
});

export default withRouter(
  connect(
    mapStateToProps,
    { cleanEntities, listEntities }
  )(WrappedEntitiesContainer)
);
