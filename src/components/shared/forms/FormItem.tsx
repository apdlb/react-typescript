import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { memo } from 'react';

import { formItemHelp, formItemValidateStatus } from '../../../utils/helpers';
import InputValidator from './InputValidator';

interface Props {
  form: WrappedFormUtils;
  className?: string;
  field: string;
  label: string | number | React.ReactNode;
  initialValue?: any;
  validations?: string[];
  formItemProps?: any;
  children: React.ReactNode;
}

const FormItem: React.FunctionComponent<Props> = props => {
  const { form, className, field, label, initialValue, validations, formItemProps, children } = props;

  return (
    <>
      <Form.Item
        className={className}
        label={label}
        validateStatus={formItemValidateStatus(form, field)}
        help={formItemHelp(form, field)}
        {...formItemProps}
      >
        <InputValidator form={form} field={field} label={label} initialValue={initialValue} validations={validations}>
          {children}
        </InputValidator>
      </Form.Item>
    </>
  );
};

export default memo(FormItem);
