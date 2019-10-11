import { Button, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { Translate } from 'react-localize-redux';

import { formItemHelp, formItemValidateStatus } from '../../helpers';

interface Props extends FormComponentProps {
  onSubmit(e: any): any;
}

const LoginForm: React.FunctionComponent<Props> = props => {
  const { form, onSubmit } = props;
  const { getFieldDecorator } = form;

  return (
    <Translate>
      {({ translate }) => {
        return (
          <>
            <Form onSubmit={onSubmit} layout="vertical">
              <Form.Item
                label={translate('auth.labels.email')}
                validateStatus={formItemValidateStatus(form, 'email')}
                help={formItemHelp(form, 'email')}
              >
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email!' }]
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
              </Form.Item>
              <Form.Item
                label={translate('auth.labels.password')}
                validateStatus={formItemValidateStatus(form, 'password')}
                help={formItemHelp(form, 'password')}
              >
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }]
                })(<Input.Password name="password" />)}
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  {translate('auth.labels.login')}
                </Button>
              </Form.Item>
            </Form>
          </>
        );
      }}
    </Translate>
  );
};

const WrappedLoginForm = Form.create<Props>({ name: 'loginForm' })(LoginForm);

export default WrappedLoginForm;
