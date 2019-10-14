import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux';

import { login } from '../../../redux/actions/AuthActions';
import Content from '../../shared/Content';
import LoginForm from './LoginForm';

interface Props extends FormComponentProps {
  translate: object;
  auth: object;
  form: any;
  login: Function;
  id?: string | number;
}
interface State {}

class LoginContainer extends React.Component<Props, State> {
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

export default connect(
  mapStateToProps,
  { login }
)(WrappedLoginContainer);
