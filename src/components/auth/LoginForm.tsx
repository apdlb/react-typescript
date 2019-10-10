import { Button, Form, Input } from 'antd';
import React from 'react';
import { Translate } from 'react-localize-redux';

interface Props {
  onSubmit(e: any): any;
}

const LoginForm: React.FunctionComponent<Props> = ({ onSubmit }) => {
  return (
    <Translate>
      {({ translate }) => {
        return (
          <>
            <Form onSubmit={onSubmit} layout="vertical">
              <Form.Item label={translate('auth.labels.email')}>
                <Input name="email" />
              </Form.Item>
              <Form.Item label={translate('auth.labels.password')}>
                <Input.Password name="password" />
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

const WrappedLoginForm = Form.create({ name: 'loginForm' })(LoginForm);

export default WrappedLoginForm;
