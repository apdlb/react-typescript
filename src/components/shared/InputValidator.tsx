import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';

import useValidators from '../../hooks/validators';

interface Props {
  form: WrappedFormUtils;
  field: string;
  label: string | number | React.ReactNode;
  validations?: string[];
  children: React.ReactNode;
}

const InputValidator: React.FunctionComponent<Props> = props => {
  const { form, field, label, validations, children } = props;
  const validators = useValidators();
  const { getFieldDecorator } = form;

  return (
    <>
      {getFieldDecorator(field, {
        rules: [
          {
            validator(rule: any, value: string, callback: Function) {
              if (validations) {
                for (const validation of validations) {
                  (validators as any)[validation](callback, value, label);
                }
              }
              callback();
            }
          }
        ]
      })(children)}
    </>
  );
};

export default InputValidator;
