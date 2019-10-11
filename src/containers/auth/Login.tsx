import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { Component, ReactNode } from 'react';
import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux';

import { login } from '../../actions/AuthActions';
import LoginForm from '../../components/auth/LoginForm';
import Content from '../../components/globals/Content';

interface Props extends FormComponentProps {
  translate: object;
  auth: object;
  form: any;
  login(values: any): any;
  id?: string | number;
}
interface State {}

class Login extends Component<Props, State> {
  componentDidMount() {
    // To disabled submit button at the beginning.
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

  render(): ReactNode {
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

const WrappedLogin = Form.create<Props>({ name: 'login' })(Login);

export default connect(
  mapStateToProps,
  { login }
)(WrappedLogin);
