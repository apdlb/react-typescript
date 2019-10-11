import { Button, Form, Icon, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import { Translate } from 'react-localize-redux';

import { formHasErrors, formItemHelp, formItemValidateStatus } from '../../helpers';

interface Props {
  form: WrappedFormUtils;
  onSubmit(e: any): any;
}

const LoginForm: React.FunctionComponent<Props> = props => {
  const { form, onSubmit } = props;
  const { getFieldDecorator, getFieldsError } = form;

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
                  rules: [
                    {
                      validator(rule, value, callback) {
                        if (!value) {
                          callback(translate('validations.required', { input: translate('auth.labels.email') }));
                        }
                        callback();
                      }
                    }
                  ]
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={`${translate('auth.labels.email')}`} />)}
              </Form.Item>
              <Form.Item
                label={translate('auth.labels.password')}
                validateStatus={formItemValidateStatus(form, 'password')}
                help={formItemHelp(form, 'password')}
              >
                {getFieldDecorator('password', {
                  rules: [
                    {
                      validator(rule, value, callback) {
                        if (!value) {
                          callback(translate('validations.required', { input: translate('auth.labels.password') }));
                        }
                        callback();
                      }
                    }
                  ]
                })(
                  <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder={`${translate('auth.labels.password')}`}
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary" disabled={formHasErrors(getFieldsError())}>
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

export default LoginForm;
