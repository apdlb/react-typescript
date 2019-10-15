import { Form } from 'antd';
import React from 'react';
import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { login } from '../../../redux/actions/AuthActions';
import Content from '../../shared/Content';
import LoginForm from './LoginForm';

interface MatchParams {
  id?: string;
}
interface Props extends RouteComponentProps<MatchParams> {
  translate: object;
  auth: object;
  form: any;
  login: Function;
}
interface State {}

class LoginContainer extends React.Component<Props, State> {
  componentDidMount() {
    // To disabled submit button at the beginning.
    console.log(this.props.match.params);
    this.props.form.validateFields();
  }

  onSubmit = (e: any) => {
    e.preventDefault();

    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  render(): React.ReactNode {
    const { form } = this.props;

    return (
      <>
        <Content body={<LoginForm form={form} onSubmit={this.onSubmit} />}></Content>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  translate: getTranslate(state.localize),
  auth: state.auth
});

const WrappedLoginContainer = Form.create<Props>({ name: 'login' })(LoginContainer);

export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(WrappedLoginContainer)
);
