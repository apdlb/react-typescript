import { Form } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { login, logout } from '../../../redux/actions/AuthActions';
import Content from '../../shared/Content';
import LoginForm from './LoginForm';

interface MatchParams {}
interface Props extends RouteComponentProps<MatchParams> {
  form: any;
  logout: Function;
  login: Function;
}
interface State {}

class LoginContainer extends React.Component<Props, State> {
  componentDidMount() {
    // If login is rendered, logout and clean local storage
    this.props.logout();

    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

const mapStateToProps = (state: any) => ({});

const WrappedLoginContainer = Form.create<Props>({ name: 'login' })(LoginContainer);

export default withRouter(
  connect(
    mapStateToProps,
    { logout, login }
  )(WrappedLoginContainer)
);
