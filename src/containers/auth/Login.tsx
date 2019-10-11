import React, { Component, ReactNode } from 'react';
import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux';

import { login } from '../../actions/AuthActions';
import LoginForm from '../../components/auth/LoginForm';
import Content from '../../components/globals/Content';

interface Props {
  translate: object;
  auth: object;
  form: any;
  login(form: any): any;
  id?: string | number;
}
interface State {}

class Login extends Component<Props, State> {
  onSubmit = (e: any) => {
    e.preventDefault();

    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  render(): ReactNode {
    console.log(this.props);
    return (
      <>
        <Content body={<LoginForm onSubmit={this.onSubmit} />}></Content>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  translate: getTranslate(state.localize),
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
