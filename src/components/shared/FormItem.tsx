import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';

import { formItemHelp, formItemValidateStatus } from '../../utils/helpers';
import InputValidator from './InputValidator';

interface Props {
  form: WrappedFormUtils;
  className?: string;
  field: string;
  label: string | number | React.ReactNode;
  formItemProps?: any;
  validations?: string[];
  children: React.ReactNode;
}

const FormItem: React.FunctionComponent<Props> = props => {
  const { form, className, field, label, validations, formItemProps, children } = props;

  return (
    <>
      <Form.Item
        className={className}
        label={label}
        validateStatus={formItemValidateStatus(form, field)}
        help={formItemHelp(form, field)}
        {...formItemProps}
      >
        <InputValidator form={form} field={field} label={label} validations={validations}>
          {children}
        </InputValidator>
      </Form.Item>
    </>
  );
};

export default FormItem;
