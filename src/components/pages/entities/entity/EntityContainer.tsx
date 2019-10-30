import './Entity.less';

import { Form, PageHeader } from 'antd';
import _ from 'lodash';
import React from 'react';
import { Translate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { createEntity, getEntity, updateEntity } from '../../../../redux/actions/EntityActions';
import PATHS from '../../../../utils/paths';
import Content from '../../../shared/Content';
import EntityForm from './EntityForm';

interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {
  form: any;
  getEntity: Function;
  createEntity: Function;
  updateEntity: Function;
  entities?: any;
}
interface State {}

class EntityContainer extends React.Component<Props, State> {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getEntity(this.props.match.params.id).then(() => {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
      });
    } else {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
    }
  }

  handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const { id } = this.props.match.params;

        let call;
        if (id) {
          call = this.props.updateEntity(id, values);
        } else {
          call = this.props.createEntity(values);
        }

        call.then(() => {
          this.props.history.goBack();
        });
      }
    });
  };

  render(): React.ReactNode {
    const { form, entities } = this.props;
    const { entity } = entities;

    return (
      <Translate>
        {({ translate }) => {
          return (
            <>
              <Content
                body={
                  <>
                    <PageHeader
                      title={_.isEmpty(entity) ? translate('entities.labels.newEntity') : translate('entities.labels.updateEntity')}
                      onBack={() => this.props.history.push(PATHS.ENTITIES)}
                    >
                      <EntityForm form={form} onSubmit={this.handleOnSubmit} initialValues={entity} />
                    </PageHeader>
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

const WrappedEntityContainer = Form.create<Props>({ name: 'entity' })(EntityContainer);

const mapStateToProps = (state: any) => ({
  entities: state.entities
});

export default withRouter(
  connect(
    mapStateToProps,
    { getEntity, createEntity, updateEntity }
  )(WrappedEntityContainer)
);
