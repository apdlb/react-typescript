import './LoginForm.less';

import { Button, Form, Icon, Input, Layout } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import { Translate } from 'react-localize-redux';

import { formHasErrors, formItemHelp, formItemValidateStatus } from '../../../utils/helpers';
import FormItem from '../../shared/FormItem';

interface Props {
  form: WrappedFormUtils;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

const LoginForm: React.FunctionComponent<Props> = props => {
  const { form, onSubmit } = props;
  const { getFieldDecorator, getFieldsError } = form;

  return (
    <Translate>
      {({ translate }) => {
        return (
          <>
            <Form className="grid-login-form" onSubmit={onSubmit} layout="vertical">
              <Layout className="grid-login-form-inputs">
                <FormItem
                  form={form}
                  className="grid-login-form-input-email"
                  field="email"
                  label={translate('auth.labels.email')}
                  validations={['required']}
                >
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={`${translate('auth.labels.email')}`} />
                </FormItem>

                <Form.Item
                  className="grid-login-form-input-password"
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
              </Layout>
              <Layout className="grid-login-form-buttons">
                <Form.Item>
                  <Button htmlType="submit" type="primary" disabled={formHasErrors(getFieldsError())}>
                    {translate('auth.labels.login')}
                  </Button>
                </Form.Item>
              </Layout>
            </Form>
          </>
        );
      }}
    </Translate>
  );
};

export default LoginForm;
