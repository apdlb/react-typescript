import './Entities.less';

import { Divider, Form, Modal } from 'antd';
import { PaginationConfig } from 'antd/lib/table';
import _ from 'lodash';
import React from 'react';
import { getTranslate, Translate, TranslateFunction } from 'react-localize-redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { cleanEntities, deleteEntity, listEntities, setListEntitiesParams } from '../../../redux/actions/EntityActions';
import Content from '../../shared/Content';
import EntitiesFilterForm from './EntitiesFilterForm';
import EntitiesList from './EntitiesList';

interface MatchParams {}
interface Props extends RouteComponentProps<MatchParams> {
  form: any;
  translate: TranslateFunction;
  cleanEntities: Function;
  listEntities: Function;
  setListEntitiesParams: Function;
  deleteEntity: Function;
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

  loadEntities(params?: any) {
    this.props.listEntities(params);
  }

  handleOnSubmitFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      paginateEntitiesParams: { page, pageSize, sort, order, ...rest }
    } = this.props.entities;

    const params = { ...rest, ...this.props.form.getFieldsValue() };
    this.loadEntities(params);
    this.props.setListEntitiesParams(params);
  };

  handleOnResetFilter = () => {
    this.props.cleanEntities();
    this.props.form.resetFields();
    this.loadEntities();
  };

  handleOnTableChange = (pagination: PaginationConfig, filters: any, sorter: any) => {
    const { paginateEntitiesParams: params } = this.props.entities;

    params.page = pagination.current;
    params.pageSize = pagination.pageSize;

    if (!_.isEmpty(sorter)) {
      params.sort = sorter.field;
      params.order = sorter.order;
    }
    this.loadEntities(params);
    this.props.setListEntitiesParams(params);
  };

  deleteRecord = (id: string) => {
    const { paginateEntitiesParams: params } = this.props.entities;

    this.props.deleteEntity(id).then(() => {
      this.loadEntities(params);
    });
  };

  handleOnClickDelete = (id: string) => {
    Modal.confirm({
      title: this.props.translate('generic.labels.delete'),
      content: this.props.translate('entities.modals.delete'),
      okText: this.props.translate('generic.labels.yes'),
      cancelText: this.props.translate('generic.labels.no'),
      onOk: () => {
        return this.deleteRecord(id);
      },
      onCancel: () => {}
    });
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
                      onClickDelete={this.handleOnClickDelete}
                    />
                  </>
                }
              />
            </>
          );
        }}
      </Translate>
    );
  }
}

const WrappedEntitiesContainer = Form.create<Props>({ name: 'entitiesFilter' })(EntitiesContainer);

const mapStateToProps = (state: any) => ({
  translate: getTranslate(state.localize),
  entities: state.entities
});

export default withRouter(
  connect(
    mapStateToProps,
    { cleanEntities, listEntities, setListEntitiesParams, deleteEntity }
  )(WrappedEntitiesContainer)
);
