import './LoginForm.less';

import { Button, Form, Icon, Input, Layout } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import { Translate } from 'react-localize-redux';

import { formHasErrors, formItemHelp, formItemValidateStatus } from '../../../utils/helpers';

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
            <Form className="grid-login-form" onSubmit={onSubmit} layout="vertical">
              <Layout className="grid-login-form-inputs">
                <Form.Item
                  className="grid-login-form-input-name"
                  label={translate('auth.labels.name')}
                  validateStatus={formItemValidateStatus(form, 'name')}
                  help={formItemHelp(form, 'name')}
                >
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        validator(rule, value, callback) {
                          if (!value) {
                            callback(translate('validations.required', { input: translate('auth.labels.name') }));
                          }
                          callback();
                        }
                      }
                    ]
                  })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={`${translate('auth.labels.name')}`} />)}
                </Form.Item>
                <Form.Item
                  className="grid-login-form-input-surname"
                  label={translate('auth.labels.surname')}
                  validateStatus={formItemValidateStatus(form, 'surname')}
                  help={formItemHelp(form, 'surname')}
                >
                  {getFieldDecorator('surname', {
                    rules: [
                      {
                        validator(rule, value, callback) {
                          if (!value) {
                            callback(translate('validations.required', { input: translate('auth.labels.surname') }));
                          }
                          callback();
                        }
                      }
                    ]
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={`${translate('auth.labels.surname')}`} />
                  )}
                </Form.Item>
                <Form.Item
                  className="grid-login-form-input-email"
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
                  className="grid-login-form-input-address"
                  label={translate('auth.labels.address')}
                  validateStatus={formItemValidateStatus(form, 'address')}
                  help={formItemHelp(form, 'address')}
                >
                  {getFieldDecorator('address', {
                    rules: [
                      {
                        validator(rule, value, callback) {
                          if (!value) {
                            callback(translate('validations.required', { input: translate('auth.labels.address') }));
                          }
                          callback();
                        }
                      }
                    ]
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={`${translate('auth.labels.address')}`} />
                  )}
                </Form.Item>
                <Form.Item
                  className="grid-login-form-input-gender"
                  label={translate('auth.labels.gender')}
                  validateStatus={formItemValidateStatus(form, 'gender')}
                  help={formItemHelp(form, 'gender')}
                >
                  {getFieldDecorator('gender', {
                    rules: [
                      {
                        validator(rule, value, callback) {
                          if (!value) {
                            callback(translate('validations.required', { input: translate('auth.labels.gender') }));
                          }
                          callback();
                        }
                      }
                    ]
                  })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={`${translate('auth.labels.gender')}`} />)}
                </Form.Item>
                <Form.Item
                  className="grid-login-form-input-dateBirth"
                  label={translate('auth.labels.dateBirth')}
                  validateStatus={formItemValidateStatus(form, 'dateBirth')}
                  help={formItemHelp(form, 'dateBirth')}
                >
                  {getFieldDecorator('dateBirth', {
                    rules: [
                      {
                        validator(rule, value, callback) {
                          if (!value) {
                            callback(translate('validations.required', { input: translate('auth.labels.dateBirth') }));
                          }
                          callback();
                        }
                      }
                    ]
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={`${translate('auth.labels.dateBirth')}`} />
                  )}
                </Form.Item>
                <Form.Item
                  className="grid-login-form-input-mobile"
                  label={translate('auth.labels.mobile')}
                  validateStatus={formItemValidateStatus(form, 'mobile')}
                  help={formItemHelp(form, 'mobile')}
                >
                  {getFieldDecorator('mobile', {
                    rules: [
                      {
                        validator(rule, value, callback) {
                          if (!value) {
                            callback(translate('validations.required', { input: translate('auth.labels.mobile') }));
                          }
                          callback();
                        }
                      }
                    ]
                  })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={`${translate('auth.labels.mobile')}`} />)}
                </Form.Item>
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
                <Form.Item
                  className="grid-login-form-input-confirmPassword"
                  label={translate('auth.labels.confirmPassword')}
                  validateStatus={formItemValidateStatus(form, 'confirmPassword')}
                  help={formItemHelp(form, 'confirmPassword')}
                >
                  {getFieldDecorator('confirmPassword', {
                    rules: [
                      {
                        validator(rule, value, callback) {
                          if (!value) {
                            callback(translate('validations.required', { input: translate('auth.labels.confirmPassword') }));
                          }
                          callback();
                        }
                      }
                    ]
                  })(
                    <Input.Password
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder={`${translate('auth.labels.confirmPassword')}`}
                    />
                  )}
                </Form.Item>
              </Layout>
              <Layout className="gird-login-form-buttons">
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
