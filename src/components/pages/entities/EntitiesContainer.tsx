import './Entities.less';

import { Divider, Form } from 'antd';
import { PaginationConfig } from 'antd/lib/table';
import _ from 'lodash';
import React from 'react';
import { Translate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { cleanEntities, listEntities, setListEntitiesParams } from '../../../redux/actions/EntityActions';
import Content from '../../shared/Content';
import EntitiesFilterForm from './EntitiesFilterForm';
import EntitiesList from './EntitiesList';

interface MatchParams {}
interface Props extends RouteComponentProps<MatchParams> {
  form: any;
  cleanEntities: Function;
  listEntities: Function;
  setListEntitiesParams: Function;
  entities?: any;
}
interface State {}

class EntitiesContainer extends React.Component<Props, State> {
  state = {
    loading: false
  };

  componentDidMount() {
    this.handleOnResetFilter();
  }

  handleOnSubmitFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      paginateEntitiesParams: { page, pageSize, sort, order, ...rest }
    } = this.props.entities;

    const params = { ...rest, ...this.props.form.getFieldsValue() };
    this.props.listEntities(params);
    this.props.setListEntitiesParams(params);
  };

  handleOnResetFilter = () => {
    this.props.cleanEntities();
    this.props.listEntities();
  };

  handleOnTableChange = (pagination: PaginationConfig, filters: any, sorter: any) => {
    const { paginateEntitiesParams: params } = this.props.entities;

    params.page = pagination.current;
    params.pageSize = pagination.pageSize;

    if (!_.isEmpty(sorter)) {
      params.sort = sorter.field;
      params.order = sorter.order;
    }
    this.props.listEntities(params);
    this.props.setListEntitiesParams(params);
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
                    <EntitiesFilterForm form={form} onSubmit={this.handleOnSubmitFilter} onReset={this.handleOnResetFilter} />
                    <EntitiesList
                      propsTable={{
                        data: docs,
                        pagination,
                        loading: this.state.loading,
                        handleOnChange: this.handleOnTableChange
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
    { cleanEntities, listEntities, setListEntitiesParams }
  )(WrappedEntitiesContainer)
);
